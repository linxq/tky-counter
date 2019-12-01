<template>
  <Layout>
    <div slot="content">
      <el-breadcrumb separator="/" class="header"></el-breadcrumb>
      <el-form :model="form" label-width="140px">
        <div v-for="(item, index) in form.wheelsData" :key="index" style="margin-bottom: 10px;">
          <h4 style="float:left;">轮{{index+1}}</h4>
          <span style="margin:0px 10px;">ΣP0μ:{{item["ΣP0μ"]}}</span>
          <el-button class="display-button" type="text" @click="()=> onDisplay(item)">显隐</el-button>
          <el-table :data="item.data" v-if="item.display" style="width: 100%">
            <el-table-column label="名称" prop="key" width="80"></el-table-column>
            <table-column label="I轮位" prop="w1"></table-column>
            <table-column label="II轮位" prop="w2"></table-column>
            <table-column label="III轮位" prop="w3"></table-column>
            <table-column label="IV轮位" prop="w4"></table-column>
          </el-table>
        </div>

        <col-item :span="12" label="maxΣP0μ">
          <el-input :disabled="true" type="number" size="small" v-model="form.max">
            <template slot="append">N·mm</template>
          </el-input>
        </col-item>
        <h4>钢轨静弯矩：</h4>
        <col-item :span="12" label="M0">
          <el-input :disabled="true" type="number" size="small" v-model="form.m0">
            <template slot="append">N·mm</template>
          </el-input>
        </col-item>

        <h4>钢轨动弯矩：</h4>
        <col-item :span="12" label="速度系数α">
          <el-input type="number" v-model="form.speedFactor" size="small">
            <template slot="append">100km/h</template>
          </el-input>
        </col-item>

        <col-item :span="12" label="横向水平力系数f">
          <el-input type="number" v-model="form.f" size="small">
            <template slot="append">500mm</template>
          </el-input>
        </col-item>

        <col-item :span="12" label="偏载系数β">
          <el-input type="number" v-model="form.biasFactor" size="small">
            <template slot="append">90mm</template>
          </el-input>
        </col-item>
        <col-item :span="12" label="综合动载系数">
          <el-input :disabled="true" type="number" v-model="form.dynamicLoad" size="small">
            <template slot="append">（1+a+b）</template>
          </el-input>
        </col-item>

        <col-item :span="12" label="Md">
          <el-input :disabled="true" type="number" v-model="form.md" size="small">
            <template slot="append">N·mm</template>
          </el-input>
        </col-item>
        <h4>轨底动弯应力：</h4>
        <col-item :span="12" label="σ gd">
          <el-input :disabled="true" type="number" v-model="form.gd" size="small">
            <template slot="append">MPA</template>
          </el-input>
        </col-item>
      </el-form>
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
import FormItem from "@/components/FormItem";
import TableColumn from "@/components/TableColumn";
import { kx, u, p0u, sum, m0, dynamicLoad, md, gd } from "./el";
export default {
  components: {
    Layout,
    FormItem,
    TableColumn,
    ColItem
  },
  data() {
    return {
      baseData: null,
      form: {
        wheelsData: genWheelData(),
        max: "",
        m0: "",
        speedFactor: "",
        f: "",
        biasFactor: "",
        dynamicLoad: "",
        md: "",
        gd: ""
      }
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
    this.getBase();
    const wheelData = JSON.parse(window.localStorage.getItem("wheelData"));
    if (wheelData) {
      this.form = wheelData;
    }
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
      const { k, w1 } = this.baseData;
      const { wheelsData } = this.form;
      wheelsData.map(this.wheelsDataCounter);
      const max = this.max(wheelsData);
      const m0Value = m0(max, k);
      const dynamicLoadValue = dynamicLoad(this.form);
      this.form.max = max;
      this.form.m0 = m0Value;
      this.form.dynamicLoad = dynamicLoadValue;
      const mdValue = md(this.form);
      this.form.md = mdValue;
      const gdValue = gd(this.form, w1);
      this.form.gd = gdValue;
    },
    wheelsDataCounter(oneWheel) {
      const { data } = oneWheel;
      const one = data[0];
      const two = data[1];
      const three = data[2];
      const four = data[3];
      const five = data[4];
      this.p0(one);
      Object.entries(three).forEach(([key, value]) => {
        if (key === "key") return;
        const kxValue = kx(this.baseData.k, two[key]);
        const uValue = u(kxValue);
        three[key] = kxValue;
        four[key] = uValue;
        five[key] = p0u(one[key], uValue);
      });
      oneWheel["ΣP0μ"] = this.sum(five);
    },
    p0(one) {
      const { w1, w2, w3, w4 } = one;
      one.w1 = one.w2 = one.w3 = one.w4 = w1;
    },
    sum(five) {
      return sum(five);
    },
    onClick() {
      window.localStorage.setItem("wheelData", JSON.stringify(this.form));
    },
    max(wheelsData) {
      const sumP0u = wheelsData.map(item => {
        return item["ΣP0μ"] || 0;
      });
      return Math.max(...sumP0u);
    }
  }
};

function genWheelData() {
  const array = [1, 2, 3];
  return new Array(3).fill(1).map(item => {
    const obj = genItem();
    const one = {
      display: true,
      data: obj,
      ΣP0μ: 0
    };
    return one;
  });
}
function genItem() {
  const baseKey = ["PO/N", "x/mm", "kx", "μ", "P0μ"];
  const item = { w1: "", w2: "", w3: "", w4: "" };
  return baseKey.map(key => {
    return {
      key,
      ...item
    };
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
  width: 50px;
  margin: 0px auto;
}
</style>