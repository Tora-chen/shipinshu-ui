<template>
  <div class="video-list">
    <div v-for="video in videos" :key="video.id" @click="selectVideo(video)" class="video-item"
      :class="{ 'video-item-active': currentVideo?.id === video.id }">
      <div class="video-icon">
        >
      </div>
      <div class="video-info">
        <h3 class="video-title">{{ video.title }}</h3>
        <p class="video-duration">{{ video.duration }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
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
.video-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.video-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.video-item:hover {
  background-color: #f3f4f6;
}

.video-item-active {
  background-color: #e5edff;
  border-left: 4px solid #3b82f6;
}

.video-icon {
  margin-right: 0.75rem;
}

.video-info {
  flex: 1;
}

.video-title {
  font-weight: 500;
}

.video-duration {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>