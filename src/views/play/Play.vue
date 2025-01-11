<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
const options = reactive({
  width: '800px', //播放器高度
  height: '400px', //播放器高度
  color: '#409eff', //主题色
  title: '', //视频名称
  src: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4', //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    'audioTrack',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen'
  ] //显示所有按钮,
})
const activeName = ref('first')
const value = ref('')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const options2 = [
  {
    value: 'Option1',
    label: '单栏'
  },
  {
    value: 'Option2',
    label: '双栏'
  },
  {
    value: 'Option3',
    label: '三栏'
  }
]
</script>

<template>
  <el-scrollbar>
    <div class="video-container">
      <vue3VideoPlay
        class="video"
        v-bind="options"
        poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
      />
    </div>
    <div class="video-name">
      <h1>视频名称</h1>
    </div>
    <div class="video-tabs">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="字幕" name="first">字幕内容</el-tab-pane>
        <el-tab-pane label="图片" name="second">
          <el-select v-model="value" placeholder="图片分布方式" size="large" style="width: 240px">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="讨论" name="third">讨论内容</el-tab-pane>
      </el-tabs>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.video-container {
  height: auto;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  border: #79bbff solid;
  .video {
    display: flex;
    border-radius: 4px;
  }
}
.video-name {
  height: 40px;
  margin-right: 15px;
}
.video-tabs {
  height: 2000px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
