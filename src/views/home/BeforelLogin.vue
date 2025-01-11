<script lang="ts" setup>
import router from '@/router';

 const handleJump = () =>{
    router.push('/use');
 }
</script>
<template>
    <div class="welcome-message">
        <h1>欢迎使用电子视频书</h1>
        <el-button @click="handleJump" style="cursor: pointer;">立即使用</el-button>
        <!-- 内容部分 -->
      <main class="content">
        <div class="left-panel">
          <img src="/longpic.jpg" alt="/longpic.jpg" />
        </div>
        <div class="right-panel">
          <h2>介绍</h2>
        </div>
      </main>
    </div>
</template>

<style lang="scss" scoped> 
    h1{
    text-align: center;
        font-size: 400%;
        background-clip: text;
  }
  .welcome-message{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  .left-panel {
    flex: 1;
    text-align: center;
  }
  
  .right-panel {
    flex: 1;
    text-align: center;
  }
  
  .left-panel img {
    max-width: 70%;
    height: auto;
  }
</style>