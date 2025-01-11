<script setup lang="ts">
import HomeHeader from './HomeHeader.vue';
import HomeFooter from './HomeFooter.vue';
</script>

<template>
    <div>
        <el-container class="common-layout">
            <div class="header">
                <HomeHeader />
            </div>
        <el-main>
            <el-scrollbar>
            <router-view />
            </el-scrollbar>
        </el-main>
            <div class="footer">
                <HomeFooter />
            </div>
        </el-container>
    </div>
</template>
<style lang="scss" scoped>
  .common-layout {
    display: flex;
    flex-direction: column;

    el-container {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    home-header {
      flex-shrink: 0;
      width: 100%;
      background-color: #f5f5f5; // 示例背景色
    }

    home-footer {
      flex-shrink: 0;
      height: 40px; // 可根据需要调整
      width: 100%;
      background-color: #f5f5f5; // 示例背景色
    }

    el-main {
      flex: 1;
      overflow: hidden; // 避免 el-scrollbar 冲突
      display: flex;
      flex-direction: column;
      width: 100%;

        el-scrollbar {
        height: 100%;
        overflow-y: auto;
        width: 100%;
      }
    }
  }
</style>

