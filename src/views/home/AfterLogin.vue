<script lang="ts" setup>
import router from '@/router';

const handleJump = () =>{
   router.push('/use');
}
</script>
<template>
    <h1 class="tag">视频书让学习更简单</h1>
    <div class="button">
        <el-button @click="handleJump" style="cursor: pointer;">立即使用</el-button>
    </div>
    <!-- 最近浏览 -->
    <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">最近浏览1</span>
      <el-image src="/testpic.jpg">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image >
    </div>
    <div class="block">
      <span class="demonstration">最近浏览2</span>
      <el-image src="/testpic.jpg">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
    </div>
  </div>
</template>

<style scoped>
 .button{
    display: flex;
    justify-content: center;
    height: 60px;
  }
  .tag{
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 400%;
    background-clip: text;
    height: 300px;
  }
  .demo-image__placeholder {
    display: flex;
    justify-content: space-between;
    max-width: 1200px; /* 你可以根据需要调整 */
    margin: 0 auto; /* 居中对齐 */
  }
  .block {
    margin: 0 10px; /* 或者你可以使用适合的值 */
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    flex: 1; /* 使块元素均分空间 */
  }
  @media (max-width: 768px) {
    .demo-image__placeholder {
      flex-direction: column; /* 小屏幕时堆叠 */
    }
  }

</style>