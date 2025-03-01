<script lang="ts" setup>
import router from '@/router';
import { ref, onMounted } from 'vue';
import { ElButton, ElCard } from 'element-plus';
import { API_URLS } from '@/config/api';
import CreateLecture from "@/components/CreateLecture.vue";

const collection = ref([]);
const recommendation = ref([]);
const myLectures = ref([]);
const showCreateLectureDialog = ref(false);

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

const fetchMyLectures = async () => {
  try {
    const response = await fetch(API_URLS.getMyLectures, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    myLectures.value = await response.json();
    console.log('My lectures:', response);
  } catch (error) {
    console.error('Error fetching my lectures:', error);
  }
};

onMounted(() => {
  fetchUserCollection();
  fetchRecommendation();
  fetchMyLectures();
});
</script>
<template>
    <h1 class="tag">视频书让学习更简单</h1>
    <div class="button">
        <el-button @click="handleJump" style="cursor: pointer;">立即使用</el-button>
    </div>
    <!-- 我的课程 -->
    <div class="block">
        <h2 class="collection-title">我的课程</h2>
        <div class="collection-grid">
            <ElCard v-for="lecture in myLectures" :key="lecture.id" class="lecture-card" style="cursor: pointer;" @click="router.push(`/lecture/${lecture.id}`)">
            <img src="/lectureThumbnail.png" alt="lecture.title" class="lecture-thumbnail">
            <h3 class="course-title">{{ lecture.title }}</h3>
            <p class="course-description">{{ lecture.description }}</p>
            </ElCard>
            <!-- 添加课程 -->
            <ElCard class="lecture-card" @click="showCreateLectureDialog = true" style="cursor: pointer;">
            <img src="/addLecture.png" alt="添加课程" class="lecture-thumbnail">
            <h3 class="course-title" style="text-align: center;">创建课程</h3>
            </ElCard>

            <CreateLecture
                v-if="showCreateLectureDialog"
                :visible="showCreateLectureDialog"
                @close="showCreateLectureDialog = false"
                @created="fetchMyLectures"
            />

        </div>
    </div>

    <!-- 我的收藏 -->
    <div class="block">
      <h2 class="collection-title">我的收藏</h2>
      <div class="collection-grid">
        <ElCard v-for="lecture in collection" :key="lecture.id" class="lecture-card" @click="router.push(`/lecture/${lecture.id}`)">
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
        <ElCard v-for="lecture in recommendation" :key="lecture.id" class="lecture-card" @click="router.push(`/lecture/${lecture.id}`)">
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