<template>
  <Layout>
    <div slot="content">
      <el-breadcrumb separator="/" class="header">
        <el-breadcrumb-item :to="{ path: '/base' }">基础页面</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="abc">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
export default {
  name: "my-project",
  components: {
    Layout
  },
  data() {
    return {
      form: {}
    };
  }
};
</script>

<style>
/* CSS */
.header {
  margin-bottom: 20px;
}
</style>
