<template>
  <el-row>
    <el-col :span="12">
      <el-form-item :label="label">
        <el-input v-bind="$attrs" v-model="currentValue" type="number" size="small">
          <template slot="append" v-if="unit">{{unit}}</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12" class="selectClass">
      <el-select
        size="small"
        v-model="select"
        style="margin-left:15px;margin-top:7px"
        @change="onSelect"
      >
        <el-option v-for="obj in options" :label="obj.label" :key="obj.value" :value="obj.value"></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "input-select",
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: String,
      default: ""
    },
    options: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    unit: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      select: "",
      currentValue: ""
    };
  },
  watch: {
    currentValue(newVal) {
      this.updateVal(newVal);
    },
    value: {
      immediate: true,
      handler(val) {
        this.currentValue = val;
      }
    }
  },
  methods: {
    updateVal(val) {
      this.$emit("input", val);
    },
    onSelect(val) {
      this.currentValue = val;
    }
  }
};
</script>
<style lang="scss">
.selectClass {
}
</style>