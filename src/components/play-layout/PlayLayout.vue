<script setup lang="ts">
import PlayAside from './PlayAside.vue';
import HomeHeader from '../home-layout/HomeHeader.vue';
import PlayHeader from './PlayHeader.vue';
import HomeFooter from '../home-layout/HomeFooter.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HomeHeader />
      </el-header>
      <!-- <el-container class="aside-and-main">
        <PlayAside />
        <el-container class="header-and-main">
          <PlayHeader /> -->
          <el-main>
            <el-scrollbar>
              <router-view />
            </el-scrollbar>
          </el-main>
        <!-- </el-container>
      </el-container> -->
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.aside-and-main {
  display: flex;
  flex-direction:row;
  height: 100vh;
}
.header-and-main{
  display: flex;
  flex-direction: column;
  flex: 1;
}
.el-main {
  padding-right: 0%;
}
</style>
