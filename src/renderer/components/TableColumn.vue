<template>
  <el-table-column :prop="prop" :label="label">
    <template slot-scope="scope">
      <el-input size="small" @change="onChange" v-model="scope.row[prop]" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "colItem",

  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String],
      default: ""
    },
    prop: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      val: this.value
    };
  },
  methods: {
    onChange(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style lang="scss"></style>
