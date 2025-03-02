<template>
  <HomeHeader />
  <div class="lecture-player">
    <!-- 左侧栏 -->
    <LeftSidebar :videos="videos" :currentVideo="currentVideo" @select-video="selectVideo" />

    <!-- 主要部分 -->
    <div class="main-content">
      <div class="content-wrapper">
        <!-- 播放器 VideoPlayer -->
        <div class="video-player">
          <video v-if="currentVideo" ref="videoPlayer" :src="currentVideo.url" controls></video>
          <!-- 当前没有获取到视频时 -->
          <div v-else class="video-placeholder">
            咦，视频好像不见了~
          </div>
        </div>
        <!--        收藏按钮-->
        <div style="padding-bottom: 1em; display: flex; justify-content: right">
          <CollectionBottom :lecture-id="$route.params.lectureId"/>
        </div>

        <!-- 底部选项卡 BottomTabs -->
        <BottomTabs current-tab="notes" :tabs="tabs">
          <template #caption>
            <h2>Caption</h2>
            <p>Here you can find the caption for the video.</p>
          </template>

          <template #notes>
            <Notes v-if="currentVideo" :video-id="currentVideo.id" :key="currentVideo.id"/>

          </template>
        </BottomTabs>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { API_URLS } from '@/config/api'
import LeftSidebar from './LeftSidebar.vue'
import HomeHeader from '@/components/home-layout/HomeHeader.vue'
import BottomTabs from "@/views/lecture-player/BottomTabs.vue";
import Notes from "@/views/lecture-player/Notes.vue";
import CollectionBottom from "@/views/lecture-player/CollectionBottom.vue";

const $route = useRoute()
const videos = ref([])
const currentVideo = ref(null)
const tabs = [
  { id: 'notes', name: '笔记' },
  // { id: 'caption', name: '字幕' },
]

const fetchVideos = async () => {
  const lectureId = $route.params.lectureId
  try {
    const response = await fetch(API_URLS.getLectureVideos(lectureId), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    videos.value = await response.json()
    for (const video of videos.value) {
      video.url = API_URLS.getVideoStream(video.id)
    }
    currentVideo.value = videos.value[0]
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
}


const selectVideo = (video) => {
  currentVideo.value = video
}

onMounted(() => {
  fetchVideos()
})
</script>

<style scoped>
.lecture-player {
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.content-wrapper {
  padding: 1.5rem;
}

.video-player {
  background-color: #000000;
  border-radius: 0.5rem;
  aspect-ratio: 16 / 9;
  margin-bottom: 1.5rem;
}

.video-player video {
  width: 100%;
  height: 100%;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
</style>