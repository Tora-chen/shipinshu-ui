<script setup lang="ts"></script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>视频链接上传</span>
      </div>
    </template>
    <el-form label-width="120px">
      <el-form-item label="视频名称">
        <el-input style="width: 400px"></el-input>
      </el-form-item>

      <el-form-item label="视频链接">
        <el-input style="width: 400px"></el-input>
      </el-form-item>

      <el-form-item label="视频预览"></el-form-item>

      <el-form-item>
        <el-button type="primary">开始生成</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped></style>
