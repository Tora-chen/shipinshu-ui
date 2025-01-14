<script lang="ts" setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import { ElButton, ElCard } from 'element-plus';
import { API_URLS } from '@/config/api';

const collection = ref([]);
const recommendation = ref([]);

const handleJump = () =>{
   router.push('/use');
}

const fetchUserCollection = async () => {
  try {
    // 请求附带jwt token
    const response = await fetch(API_URLS.getUserCollection, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    collection.value = await response.json();
    console.log('User collection:', response);
  } catch (error) {
    console.error('Error fetching user collection:', error);
  }
};

const fetchRecommendation = async () => {
  try {
    const response = await fetch(API_URLS.getRecommendation, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    recommendation.value = await response.json();
    console.log('Recommendation:', response);
  } catch (error) {
    console.error('Error fetching recommendation:', error);
  }
};

onMounted(() => {
  fetchUserCollection();
  fetchRecommendation();
});
</script>
<template>
    <h1 class="tag">视频书让学习更简单</h1>
    <div class="button">
        <el-button @click="handleJump" style="cursor: pointer;">立即使用</el-button>
    </div>
    <!-- 我的收藏 -->
    <div class="block">
      <h2 class="collection-title">我的收藏</h2>
      <div class="collection-grid">
        <ElCard v-for="lecture in collection" :key="lecture.id" class="lecture-card">
          <img src="/lectureThumbnail.png" alt="lecture.title" class="lecture-thumbnail">
          <h3 class="course-title">{{ lecture.title }}</h3>
          <p class="course-description">{{ lecture.description }}</p>
        </ElCard>
      </div>
    </div>
    <!-- 推荐课程 -->
    <div class="block">
      <h2 class="collection-title">推荐课程</h2>
      <div class="collection-grid">
        <ElCard v-for="lecture in recommendation" :key="lecture.id" class="lecture-card">
          <img src="/lectureThumbnail.png" alt="lecture.title" class="lecture-thumbnail">
          <h3 class="course-title">{{ lecture.title }}</h3>
          <p class="course-description">{{ lecture.description }}</p>
        </ElCard>
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
    font-size: 200%;
    background-clip: text;
    height: 100px;
  }
  .block {
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    .demo-image__placeholder {
      flex-direction: column; /* 小屏幕时堆叠 */
    }
  }

  .collection-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  .lecture-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .lecture-thumbnail {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

</style>