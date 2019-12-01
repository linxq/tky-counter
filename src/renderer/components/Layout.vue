<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        @select="handleSelect"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/base">基础数据</el-menu-item>
        <el-menu-item index="/wheel">不利轮位及动弯矩</el-menu-item>
        <el-menu-item index="/temperature">允许温降</el-menu-item>
        <el-menu-item index="/temperatureUp">允许温升</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <slot name="content"></slot>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "my-project",
  data() {
    return {
      activeIndex: "",
      form: {}
    };
  },
  methods: {
    handleSelect() {}
  }
};
</script>

<style>
/* CSS */
</style>
