<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router="true"
        @select="handleSelect"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/base">处理中心</el-menu-item>
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
      form: {}
    };
  }
};
</script>

<style>
/* CSS */
</style>
