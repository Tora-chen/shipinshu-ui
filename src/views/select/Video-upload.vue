<script setup>
import { ref, reactive } from 'vue'
import axios from '@/utils/http'
import { UploadFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'

const router = useRouter()
const dialogTableVisible = ref(false)
const fileList = ref([])

const form = reactive({
  name: '',
  description: '',
  file: null
})

// Custom upload handler
const uploadFile = (v) => {
  console.log('File selected:', v.file)
  // Cache the file
  form.file = v.file
  return false // Prevent default upload behavior
}

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
}

// Handle file preview
const uploadPreview = (file) => {
  console.log('Preview file:', file)
  // Implement preview functionality if needed
}

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
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('file', form.file)
    
    // Show loading message
    const loadingNotification = ElNotification({
      title: '上传中',
      message: '视频正在上传，请稍候...',
      duration: 0,
      type: 'info'
    })
    
    // Send request to backend API
    const { data } = await axios.post('api/videos/upload', formData, {
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
    
    if (data.code === 20000 || data.status === 'success') {
      ElNotification({
        title: '上传成功',
        message: '视频已成功上传!',
        duration: 2000,
        type: 'success'
      })
      
      // Reset form
      form.name = ''
      form.description = ''
      form.file = null
      fileList.value = []
      
      // Navigate to video list page
      router.push('/show')
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

// Optional: Fetch existing videos if needed
const fetchMyLectures = async () => {
  try {
    const { data } = await axios.get('api/videos', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (data.code === 20000 || data.status === 'success') {
      // Handle the fetched videos if needed
      console.log('Fetched videos:', data.data)
    }
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
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
        <el-form-item label="视频标题" required>
          <el-input v-model="form.name" style="width: 400px" placeholder="请输入视频标题" />
        </el-form-item>

        

        <el-form-item label="视频上传" required>
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action=""
            :auto-upload="false"
            :http-request="uploadFile"
            :limit="1"
            :on-exceed="uploadExceed"
            :before-upload="beforeUpload"
            :on-remove="uploadRemove"
            :on-preview="uploadPreview"
            drag
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖拽文件到此处或 <em>点击上传</em></div>
            <!-- <template #tip>
              <div class="el-upload__tip">仅支持MP4格式视频文件，大小不超过100MB</div>
            </template> -->
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
          <el-button @click="() => { form.name = ''; form.description = ''; form.file = null; fileList.value = []; }">重置</el-button>
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