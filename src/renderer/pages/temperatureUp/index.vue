<template>
  <Layout>
    <div slot="content">
      <el-breadcrumb separator="/" class="header"></el-breadcrumb>
      <el-form :model="form" label-width="140px">
        <el-row>
          <h4>BZCKNG部分：</h4>
          <col-item :span="12" label="f">
            <el-input type="number" size="small" v-model="form.f">
              <template slot="append">cm</template>
            </el-input>
          </col-item>

          <col-item :span="12" label="Q0">
            <el-input type="number" size="small" v-model="form.q0"></el-input>
          </col-item>
          <col-item :span="12" label="B">
            <el-input type="number" size="small" v-model="form.b"></el-input>
          </col-item>
          <col-item :span="12" label="Z">
            <el-input type="number" size="small" v-model="form.z"></el-input>
          </col-item>
          <col-item :span="12" label="C">
            <el-input type="number" size="small" v-model="form.c"></el-input>
          </col-item>
          <col-item :span="12" label="K">
            <el-input type="number" size="small" v-model="form.k"></el-input>
          </col-item>
          <col-item :span="12" label="N">
            <el-input type="number" size="small" v-model="form.n"></el-input>
          </col-item>
          <col-item :span="12" label="G">
            <el-input type="number" size="small" v-model="form.g"></el-input>
          </col-item>
          <col-item :span="12" label="BZCKNG结果">
            <el-input
              type="number"
              size="small"
              :disabled="true"
              v-model="form.bzckng"
            ></el-input>
          </col-item>
          <h4>Pmin部分：</h4>

          <input-select
            :span="24"
            label="曲线半径R"
            v-model="form.cr"
            unit="M"
          ></input-select>

          <col-item :span="12" label="d">
            <el-input type="number" size="small" v-model="form.d"></el-input>
          </col-item>

          <col-item :span="12" label="i0">
            <el-input type="number" size="small" v-model="form.i0"></el-input>
          </col-item>

          <col-item :span="12" label="l0">
            <el-input type="number" size="small" v-model="form.l0">
              <template slot="append">cm</template>
            </el-input>
          </col-item>
          <input-select
            :span="24"
            label="fk"
            v-model="form.fk"
            unit="m"
          ></input-select>
          <input-select
            :span="24"
            label="等效阻力r"
            v-model="form.r"
            unit="N/cm"
          ></input-select>
          <input-select
            :span="24"
            label="ΔTmin"
            v-model="form.tmin"
            unit="℃"
          ></input-select>
          <input-select
            :span="24"
            label="纵向力分布"
            v-model="form.longitudinalForceDistribution"
            unit="℃"
          ></input-select>
          <input-select
            :span="24"
            label="运营折减"
            v-model="form.discount"
            unit="℃"
          ></input-select>
          <input-select
            :span="24"
            label="ΔTu"
            v-model="form.tu"
            unit="℃"
          ></input-select>
          <input-select
            :span="24"
            label="ΔTk"
            v-model="form.tk"
            unit="℃"
          ></input-select>
          <col-item :span="12" label="Pmin">
            <el-input type="number" size="small" v-model="form.pmin">
              <template slot="append">N</template>
            </el-input>
          </col-item>
          <col-item :span="12" label="PKmin">
            <el-input type="number" size="small" v-model="form.pkmin">
              <template slot="append">N</template>
            </el-input>
          </col-item>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-button-group class="center">
              <el-button @click="onClick">保存</el-button>
              <el-button @click="sendCounter">计算</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </el-form>
      <div id="charts" style="height:300px;"></div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="80%"
        center
      >
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout";
import InputSelect from "@/components/InputSelect";
import ColItem from "@/components/ColItem";
import FormItem from "@/components/FormItem";
import TableColumn from "@/components/TableColumn";
import { ipcRenderer } from "electron";
import echarts from "echarts";

import { bzckngEl, etaEl, phiEl, tiEl, tqEl, tmEl, t0El, pEl } from "./el";
export default {
  components: {
    Layout,
    FormItem,
    TableColumn,
    ColItem,
    InputSelect
  },
  data() {
    return {
      baseData: null,
      form: {
        f: 0.02,
        q0: "",
        b: "",
        z: "",
        c: "",
        k: "",
        n: "",
        g: "",
        bzckng: "",
        cr: "",
        d: "",
        i0: "",
        l0: "",
        fk: "",
        r: "",
        tmin: "",
        longitudinalForceDistribution: "",
        discount: "",
        tu: "",
        tk: "",
        pmin: "",
        pkmin: ""
      },
      eta: [],
      phi: [],
      ti: [],
      tq: [],
      tm: [],
      t0: [],
      p: [],
      l: [],
      lineSet: [],
      myChart: null,
      centerDialogVisible: false
    };
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.counter();
      }
    }
  },
  created() {
    ipcRenderer.on("render:temperatureUp", this.reciver);
    this.getBase();
    const up = JSON.parse(window.localStorage.getItem("up"));
    if (up) {
      this.form = up;
    }
    this.l = createLValue();
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("charts"));
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  methods: {
    onDisplay(one) {
      one.display = !one.display;
    },
    getBase() {
      const baseData = JSON.parse(window.localStorage.getItem("baseData"));
      if (baseData) {
        this.baseData = baseData;
      } else {
        this.$message.error("请先填写基础数据");
      }
    },
    counter() {
      setTimeout(item => {
        const { f, d, i0, l0, bzckng, cr } = this.form;
        this.form.pmin = this.oneTimeCounter(f, d, i0, l0, bzckng, cr);
      }, 20);
    },
    setInit() {
      this.eta = [];
      this.phi = [];
      this.ti = [];
      this.tq = [];
      this.tm = [];
      this.t0 = [];
      this.p = [];
    },
    oneTimeCounter(f, d, i0, l0, bzckng, cr) {
      const { l } = this;
      this.form.bzckng = bzckngEl(this.form);
      this.setInit();
      l.map(item => {
        const etaValue = etaEl(l0, item);
        const phiValue = phiEl(l0, item, etaValue);
        const tiValue = tiEl(this.baseData, f, d, i0, l0, phiValue, item);
        const tqValue = tqEl(bzckng, item);
        const tmValue = tmEl(item);
        const t0Value = t0El(f, i0, cr, etaValue, item);
        const pValue = pEl(tiValue, tqValue, tmValue, t0Value);
        this.eta.push(etaValue);
        this.phi.push(phiValue);
        this.ti.push(tiValue);
        this.tq.push(tqValue);
        this.tm.push(tmValue);
        this.t0.push(t0Value);
        this.p.push(pValue);
      });

      return Math.min(
        ...this.p.map(item => {
          return item ? item : 100000000;
        })
      ).toFixed(2);
    },
    counterFIncrease() {
      setTimeout(() => {
        console.time();
        const step = 0.01;
        const start = 0;
        const end = 3;
        this.lineSet = new Array((end - start) / step + 1)
          .fill(1)
          .map((item, index) => {
            const { d, i0, l0, bzckng, cr } = this.form;
            const f = start + index * step;
            return this.oneTimeCounter(f, d, i0, l0, bzckng, cr);
          });
        this.form.pkmin = Math.max(
          ...this.lineSet.map(item => (item ? item : 0))
        );
        console.timeEnd();
      }, 10);
    },
    onClick() {
      window.localStorage.setItem("up", JSON.stringify(this.form));
    },
    sendCounter() {
      const { eta, phi, ti, tq, tm, t0, p, l, form, baseData } = this;
      const param = {
        baseData,
        form,
        eta,
        phi,
        ti,
        tq,
        tm,
        t0,
        p,
        l,
        lineSet: null
      };
      ipcRenderer.send("main:temperatureUp", param);
    },
    reciver(event, result) {
      // const xSet = new Array(15).fill(1).map((v, index) => {
      //   return 0 + 0.2 * index;
      // });
      this.form.pkmin = result.form.pkmin;
      this.myChart.setOption({
        tooltip: {
          formatter: (params, ticket, callback) => {
            return result.xSet[params.dataIndex] + "：" + params.value;
          }
        },
        toolbox: {
          show: true,

          feature: {
            saveAsImage: {
              show: true,

              excludeComponents: ["toolbox"],

              pixelRatio: 2
            }
          }
        },

        xAxis: {
          type: "category",
          data: result.xSet,
          minInterval: 20,
          maxInterval: 20,
          interval: (index, value) => false,
          axisLabel: {
            interval: 19
            // length: 15
          }
        },
        yAxis: {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: function(val) {
              return `${val}(N)`;
            }
          }
        },
        // dataZoom: [
        //   {
        //     type: "inside",
        //     start: 0,
        //     end: 3
        //   },
        //   {
        //     start: 0,
        //     end: 3,
        //     handleSize: "0",
        //     handleStyle: {
        //       color: "#fff",
        //       shadowBlur: 3,
        //       shadowColor: "rgba(0, 0, 0, 0.6)",
        //       shadowOffsetX: 2,
        //       shadowOffsetY: 2
        //     }
        //   }
        // ],
        series: [
          {
            data: result.lineSet,
            type: "line",
            smooth: true,
            symbol: "none",
            markPoint: {
              data: [
                // {
                //   type: "max"
                // },
              ]
            },
            markLine: {
              silent: true,
              lineStyle: {
                color: "#3A5FCD",
                type: "solid"
              },
              data: [
                {
                  type: "max"
                },
                {
                  xAxis: 0,
                  yAxis: result.lineSet[2]
                }
              ]
            }
          }
        ]
      });
    }
  }
};

function createLValue() {
  const base = 300;
  const step = 10;
  const max = 720;
  return new Array((max - base) / step + 1).fill(1).map((time, index) => {
    return index * step + base;
  });
}
</script>
<style lang="scss">
.display-button {
  margin-top: -8px;
  margin-left: 10px;
}
.center {
  display: block;
  width: 150px;
  margin: 0px auto;
}
</style>
