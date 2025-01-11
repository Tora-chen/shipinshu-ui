<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'
let isTeleport = ref(true)
let isShow = ref(false)

onMounted(() => {
  IntersectionObserver()
  setTimeout(() => {
    isShow.value = true
  })
})

const IntersectionObserver = () => {
  const { stop } = useIntersectionObserver(
    document.getElementById('bigBos'),
    ([{ isIntersecting }]) => {
      isTeleport.value = isIntersecting
    }
  )
}
</script>

<template>
  <div class="Video">
    <div id="bigBox">
      <Teleport to="#smallBox" :disabled="isTeleport" v-if="isShow">
        <video
          class="show"
          src="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4"
        ></video>
      </Teleport>
    </div>

    <div id="smallBox"></div>

    <div style="height: 2000px"></div>
  </div>
</template>

<style scoped>
.Video {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.show {
  width: 640px;
  height: 360px;
}
#bigBox {
  width: 640px;
  height: 360px;
  border: solid #79bbff;
  z-index: 99;
}
#smallBox {
  position: fixed;
  bottom: 20px;
  right: 60px;
  width: 320px;
  height: 180px;
  border: solid #79bbff;
}
</style>
