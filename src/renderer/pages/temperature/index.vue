<template>
  <Layout>
    <div slot="content">
      <el-breadcrumb separator="/" class="header">
        <el-breadcrumb-item :to="{ path: '/base' }">允许温降</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="form" label-width="140px">
            <input-select
              :span="24"
              :options="options.brakingStress"
              label="制动应力"
              v-model="form.brakingStress"
              unit="MPA"
            ></input-select>

            <el-row>
              <col-item :span="12" label="ΔTd">
                <el-input :disabled="true" type="number" size="small" v-model="form.td">
                  <template slot="append">℃</template>
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
import { td } from "./el";
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
        brakingStress: "",
        td: ""
      },
      baseData: null,
      wheelData: null,
      options: {
        brakingStress: [
          {
            label: "30T",
            value: 25
          },
          {
            label: "40T",
            value: 30
          }
        ]
      }
    };
  },
  computed: {},
  watch: {
    form: {
      deep: true,
      handler(newVal, oldVal) {
        this.counter();
      }
    }
  },
  created() {
    this.getBase();
  },

  methods: {
    onClick() {
      window.localStorage.setItem("temperatrueData", JSON.stringify(this.form));
    },
    getBase() {
      const baseData = JSON.parse(window.localStorage.getItem("baseData"));
      if (baseData) {
        this.baseData = baseData;
      } else {
        this.$message.error("请先填写基础数据");
      }

      const wheelData = JSON.parse(window.localStorage.getItem("wheelData"));
      if (wheelData) {
        this.wheelData = wheelData;
      } else {
        this.$message.error("请先填写不利轮位数据");
      }

      const temperatrueData = JSON.parse(
        window.localStorage.getItem("temperatrueData")
      );
      if (temperatrueData) {
        this.form = temperatrueData;
      }
    },
    counter() {
      const {
        railAllowableStress,
        railElasticModulusE,
        expansionCoefficientRailLine
      } = this.baseData;
      this.form.td = td(
        railAllowableStress,
        this.wheelData.gd,
        this.form.brakingStress,
        railElasticModulusE,
        expansionCoefficientRailLine
      );
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
