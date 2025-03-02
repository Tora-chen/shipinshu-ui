<script setup>
import { ref, reactive, watch } from 'vue'
import axios from '@/utils/http'
import { UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { API_URLS, BASE_URL } from '@/config/api'

const router = useRouter()
const dialogTableVisible = ref(false)
const fileList = ref([]) // 绑定文件列表
const courses = ref([])

const form = reactive({
  name: '',
  description: '',
  file: null,  // 需要绑定上传的文件
  sort: null
})

// Handle exceeding file limit
const uploadExceed = () => {
  ElMessage.warning('已超出最大文件数！')
}

// File validation before upload
const beforeUpload = (file) => {
  console.log('Validating file:', file)

  const isVideo = file.type === 'video/mp4'
  if (!isVideo) {
    ElMessage.warning('上传的视频格式只能是MP4格式!')
    return false
  }

  // Optional: Add file size validation
  const maxSize = 100 * 1024 * 1024 // 100MB
  if (file.size > maxSize) {
    ElMessage.warning('视频大小不能超过100MB!')
    return false
  }

  return true
}

// Handle file removal
const uploadRemove = (file) => {
  ElMessage.info('文件已移除')
  form.file = null
  fileList.value = []
}

// Handle file preview
const uploadPreview = (file) => {
  console.log('Preview file:', file)
  // Implement preview functionality if needed
}

// 获取课程类型
const fetchCourses = async () => {
  try {
    const response = await axios.get(API_URLS.getLecture, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })

    console.log('API Response:', response) // 调试输出
    const data = response ?? [];
    if (Array.isArray(data)) {
      courses.value = data // 直接赋值，因为后端返回的是数组
    } else {
      ElMessage.warning('课程数据格式错误')
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    ElMessage.error('获取课程列表失败')
  }
}

// Call fetchCourses when component is mounted
onMounted(() => {
  fetchCourses()
})

// Submit form and upload file
const onSubmit = async () => {
  if (!form.name.trim()) {
    ElMessage.warning('请输入视频标题')
    return
  }

  if (!form.file) {
    ElMessage.warning('请选择要上传的视频文件')
    return
  }

  try {
    // Create FormData for multipart/form-data submission
    const formData = new FormData()
    formData.append('title', form.name)
    formData.append('transcript', form.description)
    formData.append('file', form.file)
    formData.append('lecture_id', form.sort)

    // Show loading message
    const loadingNotification = ElNotification({
      title: '上传中',
      message: '视频正在上传，请稍候...',
      duration: 0,
      type: 'info'
    })

    // Send request to backend API
    const  data  = await axios.post(API_URLS.videoUpload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      // Add progress tracking if needed
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(`Upload progress: ${percentCompleted}%`)
      }
    })

    // Close loading notification
    loadingNotification.close()

    if (data.toString() === 'Success!') {
      ElNotification({
        title: '上传成功',
        message: '视频已成功上传!',
        duration: 2000,
        type: 'success'
      })

      let lecture_id = form.sort
      // Reset form
      form.name = ''
      form.description = ''
      form.file = null
      fileList.value = []
      form.sort = ''

      // Navigate to video list page
      router.push('/lecture/' + lecture_id)
    } else {
      ElNotification({
        title: '上传失败',
        message: data.message || '视频上传失败，请重试!',
        duration: 3000,
        type: 'error'
      })
    }
  } catch (error) {
    console.error('Upload error:', error)
    ElNotification({
      title: '上传失败',
      message: error.message || '视频上传过程中发生错误，请重试!',
      duration: 3000,
      type: 'error'
    })
  }
}

// Watch for changes in the fileList and sync with form.file
watch(fileList, (newFileList) => {
  if (newFileList.length > 0) {
    form.file = newFileList[0].raw;  // Update form.file with the selected file
  } else {
    form.file = null; // Clear the form.file if the list is empty
  }
})
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
        <el-form-item label="视频标题" required>
          <el-input v-model="form.name" style="width: 400px" placeholder="请输入视频标题" />
        </el-form-item>

        <el-form-item label="所属课程" required>
          <el-select v-model="form.sort" style="width: 400px" placeholder="请选择课程">
            <el-option v-for="course in courses" :key="course.id" :label="course.title" :value="course.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="视频上传" required>
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action=""
            :auto-upload="false"
            :limit="1"
            :on-exceed="uploadExceed"
            :before-upload="beforeUpload"
            :on-remove="uploadRemove"
            :on-preview="uploadPreview"
            drag
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖拽文件到此处或 <em>点击上传</em></div>
          </el-upload>
        </el-form-item>

        <el-form-item label="视频描述">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            style="width: 400px"
            placeholder="请输入视频描述"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="!form.file">开始上传</el-button>
          <el-button @click="() => { 
            form.name = ''; 
            form.description = ''; 
            form.file = null; 
            fileList.value = []; 
            form.sort = null 
            uploadRemove(fileList.value[0])
            }" >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog v-model="dialogTableVisible" title="视频预览" width="800">
      <!-- Video preview content would go here -->
    </el-dialog>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.upload-demo {
  width: 400px;
}

.el-upload__tip {
  color: #909399;
  font-size: 12px;
  margin-top: 8px;
}

.el-icon--upload {
  margin-bottom: 8px;
  font-size: 28px;
  color: #909399;
}

.el-upload__text {
  margin-bottom: 8px;
  color: #606266;
}

.el-upload__text em {
  color: #409EFF;
  font-style: normal;
}
</style>
