<script setup lang="ts">
import { aside } from '@/stores/app';

const asideStore = aside();
const {isCollapse} = asideStore;
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opend :collapse="asideStore.isCollapse">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><IEpUploadFilled /></el-icon><span>上传视频</span>
          </template>
          <el-menu-item index="document">
            <el-icon><IEpFolderOpened /></el-icon><span>视频文件</span>
          </el-menu-item>
          <el-menu-item index="link">
            <el-icon><IEpLink /></el-icon><span>视频链接</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="play">
          <el-icon><IEpVideoCameraFilled /></el-icon>
          <span>视频播放</span>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.el-aside {
  background-color: #eee;
  height: 100vh;
  width: auto;
}
.el-menu {
  background-color: #eee;
  border-right: none;
  width: 200px;
}
.el-menu--collapse {
  width: 60px;
}
.el-menu--collapse h1 {
  display: none;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-decoration: none;
  color: blank;
}
.logo img {
  width: 32px;
  height: 32px;
}
</style>
