<template>
  <el-col :span="span">
    <el-form-item :label="label">
      <slot name="default"></slot>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  name: "colItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    span: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
</style>