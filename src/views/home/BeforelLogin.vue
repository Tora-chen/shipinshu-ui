<script lang="ts" setup>
import router from '@/router';

 const handleJump = () =>{
    router.push('/video/upload');
 }
</script>
<template>
    <div class="welcome-message">
        <h1>欢迎使用云课速通智能导览系统</h1>
        <el-button @click="handleJump" style="cursor: pointer;">立即使用</el-button>
        <!-- 内容部分 -->
        <main class="content">
      <!-- 左侧模块介绍部分 -->
      <div class="left-panel">
        <div class="header-image">
          <img src="/videobook.jpg" alt="/videobook.jpg" />
        </div>
        <div class="module-card">
          <h3>轻松上传</h3>
          <p>快速上传视频并为其命名，轻松将视频归类到您创建的课程中，让学习变得高效灵活。</p>
        </div>
        <div class="module-card">
          <h3>智能分析</h3>
          <p>自动分析每一秒的内容，将视频分割成清晰的图片，并为每个画面添加详细描述，助您快速了解关键内容。</p>
        </div>
        <div class="module-card">
          <h3>轻松收藏</h3>
          <p>提供视频收藏功能，帮助您将感兴趣的视频和课程轻松保存到个人收藏夹，随时随地享受个性化学习体验。</p>
        </div>
      </div>
      
      <!-- 右侧文字介绍部分 -->
      <div class="right-panel">
        <h2>让每个视频成为互动课程的引擎</h2>
        <p>在云课速通，您不仅可以轻松上传视频、创建自定义课程，还可以为每个视频命名并将其归类到相应课程中。系统支持视频内容分析，自动将每秒画面分割成图片，并为每一帧添加详细内容标注。无论您是教育工作者、内容创作者还是学习者，都可以轻松管理和分享您的视频内容。同时，我们还支持视频收藏功能，让您随时回顾并快速访问您喜爱的课程或视频。</p>
        <p>立即加入云课速通，开启个性化学习与创作的全新体验！</p>
      </div>
    </main>
    </div>
</template>

<style lang="scss" scoped> 
    h1{
    text-align: center;
        font-size: 400%;
        background-clip: text;
        color: #333;
        margin-bottom: 40px;
  }
  .welcome-message{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 30px;
  }
  .el-button {
    margin-top: 20px; 
    margin-bottom: 40px; 
  }
  .content {
    display: flex;
    justify-content: space-between;
    gap:20px;
    width: 100%;
    margin-top: 30px;
    // 内容最小高度占整个视口
    min-height: 100vh;
  }
  
  .left-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px; 
  }
  .header-image {
    width: 100%;
    text-align: center;
    margin-bottom: 30px; 
  }

  .header-image img {
    max-width: 100%; 
    height: auto;
    border-radius: 10px; 
  }

  .module-card {
    background-color: #f7f7f7; 
    padding: 20px; 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    text-align: left; 
  }

  .module-card h3 {
    margin-top: 0;
    color: #333; 
    font-size: 1.5rem; 
  }

  .module-card p {
    color: #555; 
    font-size: 1rem; 
  }
  .right-panel {
    flex: 1;
    text-align: left;
    background-color: #fafafa; 
    padding: 30px; 
    border-radius: 10px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 为右侧区域添加阴影效果 */
  }
  .right-panel h2 {
    font-size: 2.5rem; 
    color: #666; 
    margin-bottom: 20px; 
  }

  .right-panel p {
    font-size: 1.5rem; 
    color: #777; 
    line-height: 1.6;
  }

</style>