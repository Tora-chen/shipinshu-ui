<script setup>
import { ref, reactive } from 'vue'
import axios from '@/utils/http'
import { UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
//列表默认
const fileList = ref([
  {
    name: 'VUE3',
    url: '/src/assert/logo.svg'
  }
])
//自定义上传
const uploadFile = (v) => {
  console.log(v.file)
  //缓存
  form.file = v.file
}
//超出限制后的提示
const uploadExceed = () => {
  ElMessage.warning('已超出最大文件数！')
}
//文件上传前的钩子，类型以及大小
const beforeUpload = (file) => {
  console.log(file)
  // //类型
  // const isJPG = file.type === 'image/jpeg'
  // //大小
  // const isLt2M = file.size / 1024 / 1024 < 2
  // if (!isJPG) {
  //   ElMessage.warning('上传的图片格式只能是JPG格式!')
  // }
  // if (!isLt2M) {
  //   ElMessage.warning('上传的图片大小不能超过2M!')
  // }
  const isVideo = file.type === 'video/mp4'
  if (!isVideo) {
    ElMessage.warning('上传的视频格式只能是MP4格式!')
  }
  return isVideo
}

//文件列表移除
const uploadRemove = () => {
  alert('是否移除文件？')
}

//文件列表点击
const uploadPreview = () => {
  alert('是否操作？')
}

//文件上传
const onSubmit = async () => {
  console.log(form)
  //数据交互
  let formdata = new FormData()
  formdata.append('name', form.name)
  formdata.append('file', form.file)
  //axios
  let { data } = await axios.post('upload/create', formdata, {
    headers: { 'Content-type': 'multipart/form-data' }
  })
  if (data.code === 20000) {
    ElNotification({
      title: '生成成功',
      message: 'Generation successful!',
      duration: 2000,
      type: 'success'
    })
  } else {
    ElNotification({
      title: '生成失败',
      message: 'Generation failed!',
      duration: 2000,
      type: 'error'
    })
  }

  //跳转
  router.push('/show')
}
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>视频文件上传</span>
        </div>
      </template>
      <el-form :model="form" label-width="120px">
        <el-form-item label="视频名称">
          <el-input v-model="form.name" style="width: 400px" />
        </el-form-item>

        <el-form-item label="上传视频">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action=""
            :http-request="uploadFile"
            :limit="3"
            :on-exceed="uploadExceed"
            :before-upload="beforeUpload"
            :on-remove="uploadRemove"
            :on-preview="uploadPreview"
            drag
            multiple
          >
            <!-- <el-button type="primary">Click to upload</el-button>
                <template #tip>
                <div class="el-upload__tip">
                   jpg/png files with a size less than 500KB.
                </div>
                </template> -->
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">开始生成</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog v-model="dialogTableVisible" title="Shipping address" width="800"> </el-dialog>
  </div>
</template>

<style scoped>
/* .el-icon--upload {
  width: 600px;
  height: 100px;
} */
</style>
