<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import {aside} from '@/stores/app'
const asideStore = aside();
const {isCollapse,updateIsCollapse} = asideStore;
</script>

<template>
  <el-header>
    <!-- 图标 -->
    <el-icon @click="asideStore.updateIsCollapse">
      <IEpExpand v-show="asideStore.isCollapse" />
      <IEpFold v-show="!asideStore.isCollapse" />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #eee;
  .el-icon {
    margin-right: 14px;
  }
}
</style>
