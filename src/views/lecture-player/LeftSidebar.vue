<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <h2 class="sidebar-title">课程目录</h2>
      <VideoList :videos="videos" :currentVideo="currentVideo" @select-video="selectVideo" />
    </div>
  </div>
</template>

<script setup>
import VideoList from './VideoList.vue'

defineProps({
  videos: {
    type: Array,
    required: true
  },
  currentVideo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['select-video'])

const selectVideo = (video) => {
  emit('select-video', video)
}
</script>

<style scoped>
.sidebar {
  width: 320px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
}

.sidebar-content {
  padding: 1rem;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>