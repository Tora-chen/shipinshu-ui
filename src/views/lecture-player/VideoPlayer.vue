<template>
  <div class="video-player">
    <video v-if="currentVideo" ref="videoPlayer" :src="currentVideo.url" controls></video>
    <div v-else class="video-placeholder">
      请选择要播放的视频
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentVideo: {
    type: Object,
    default: null
  }
})
</script>

<style scoped>
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