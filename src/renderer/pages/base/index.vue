<template>
  <Layout>
    <div slot="content">
      <el-breadcrumb separator="/" class="header">
        <el-breadcrumb-item :to="{ path: '/base' }">基础页面</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="form" label-width="140px">
            <el-row>
              <col-item :span="12" label="钢轨弹性模量E">
                <el-input type="number" size="small" v-model="form.railElasticModulusE">
                  <template slot="append">MPA</template>
                </el-input>
              </col-item>
              <col-item :span="12" label="钢轨线膨胀系数α">
                <el-input type="number" size="small" v-model="form.expansionCoefficientRailLine">
                  <template slot="append">℃^-1</template>
                </el-input>
              </col-item>

              <input-select :span="24" label="钢轨容许应力" v-model="form.railAllowableStress" unit="MPA"></input-select>
              <input-select :span="24" label="截面积" v-model="form.crossSectionArea" unit="cm^2"></input-select>
              <input-select :span="24" label="沿水平轴惯性矩Ix" v-model="form.ix" unit="cm^4"></input-select>
              <input-select :span="24" label="沿竖直轴惯性矩Iy" v-model="form.iy" unit="cm^4"></input-select>
              <input-select :span="24" label="中性轴位置" v-model="form.neutralAxisPosition" unit="cm"></input-select>
              <input-select :span="24" label="轨头宽度" v-model="form.railHeadWidth" unit="cm"></input-select>
              <input-select :span="24" label="轨底宽度" v-model="form.railBaseWidth" unit="cm"></input-select>
              <input-select :span="24" label="钢轨高度" v-model="form.railHeight" unit="cm"></input-select>
              <input-select
                :span="24"
                label="轨底断面系数w1"
                :disabled="true"
                v-model="form.w1"
                unit="cm^3"
              ></input-select>
              <input-select
                :span="24"
                :disabled="true"
                label="轨头断面系数w2"
                v-model="form.w2"
                unit="cm^3"
              ></input-select>
              <col-item :span="12" label="钢轨刚度D">
                <el-input type="number" size="small" v-model="form.d">
                  <template slot="append">N/mm</template>
                </el-input>
              </col-item>
              <col-item :span="12" label="轨枕间距a">
                <el-input type="number" size="small" v-model="form.a">
                  <template slot="append">mm</template>
                </el-input>
              </col-item>
              <col-item :span="12" label="钢轨基础弹性模量u">
                <el-input :disabled="true" type="number" size="small" v-model="form.u">
                  <template slot="append">MPA</template>
                </el-input>
              </col-item>
              <col-item :span="12" label="刚比系数k">
                <el-input :disabled="true" type="number" size="small" v-model="form.k">
                  <template slot="append">mm^-1</template>
                </el-input>
              </col-item>
              <col-item :span="12" label="设计轴重">
                <el-input type="number" size="small" v-model="form.designAxleLoad">
                  <template slot="append">N</template>
                </el-input>
              </col-item>
              <col-item :span="12" label="曲线半径">
                <el-input type="number" size="small" v-model="form.curveRadius">
                  <template slot="append">m</template>
                </el-input>
              </col-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-button-group class="center">
            <el-button @click="onClick">保存</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import InputSelect from "@/components/InputSelect";
import ColItem from "@/components/ColItem";
import { w1, w2, u, k } from "./el";
import _ from "lodash";
let oldForm = {};
export default {
  name: "my-project",
  components: {
    Layout,
    InputSelect,
    ColItem
  },
  data() {
    return {
      form: {
        railElasticModulusE: "",
        expansionCoefficientRailLine: "",
        railAllowableStress: "",
        crossSectionArea: "",
        ix: "",
        iy: "",
        neutralAxisPosition: "",
        railHeadWidth: "",
        railBaseWidth: "",
        railHeight: "",
        w1: "",
        w2: "",
        d: "",
        a: "",
        u: "",
        k: "",
        designAxleLoad: "",
        curveRadius: ""
      }
    };
  },
  computed: {},
  watch: {
    $route: {
      immediate: true,
      handler() {}
    },
    form: {
      deep: true,
      handler(newVal, oldVal) {
        this.counter();
      }
    }
  },
  created() {
    const baseData = JSON.parse(window.localStorage.getItem("baseData"));
    if (baseData) {
      this.form = baseData;
    }

    // oldForm = _.cloneDeep(this.form);
  },
  beforeRouteLeave(to, from, next) {
    window.localStorage.setItem("baseData", JSON.stringify(this.form));
    next();
  },
  methods: {
    onClick() {
      window.localStorage.setItem("baseData", JSON.stringify(this.form));
    },
    counter() {
      // console.log("counter");
      const { form } = this;
      oldForm = _.cloneDeep(form);
      this.form.w1 = w1(form);
      this.form.w2 = w2(form);
      this.form.u = u(form);
      this.form.k = k(form);
    }
  }
};
</script>

<style>
/* CSS */
.header {
  margin-bottom: 20px;
}
.center {
  display: block;
  width: 50px;
  margin: 0px auto;
}
</style>
