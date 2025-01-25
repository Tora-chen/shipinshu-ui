<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Search, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/app'
const router = useRouter()

const input = ref('')
// 登录弹窗
const authStore = useAuthStore()
const loginForm = ref()
//登录表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleAvatarClick = () => {
  if (!authStore.islogin) {
    authStore.loginDialogVisible = true //显示登录窗口
  }
}
const onLogin = async () => {
  const success = await authStore.handleLogin()
  if (success) {
    console.log('跳转至登陆后页面')
    router.push('/afterlogin') // 跳转到登录后页面
  }
}
// TODO:忘记密码
function openForget() {
  ElMessage.warning('暂不支持找回密码')
}
// 退出登录
const handleLogout = () => {
  authStore.handleLogout()
  console.log('退出登录')
  router.push('/')
}
//注册弹窗
const isRegister = ref(false) //注册状态
const registerDialogVisible = ref(false)
function openRegister() {
  registerDialogVisible.value = true
  authStore.loginDialogVisible = false
}
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const registerFormRef = ref()
const registerRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string) => value === registerForm.value.password,
      message: '两次输入的密码不一致',
      trigger: 'blur'
    }
  ]
}
const cancel = () => {
  registerDialogVisible.value = false
  console.log('取消注册')
  authStore.loginDialogVisible = true
}
const handleRegister = () => {
  registerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('注册成功')
      registerDialogVisible.value = false
      registerForm.value = { username: '', password: '', confirmPassword: '' }
    } else {
      ElMessage.error('请填写完整的注册信息')
    }
  })
}
onMounted(() => {
  console.log('isLogin:', authStore.islogin)
})
</script>

<template>
  <el-header>
    <div class="sign">
      <router-link to="/">
        <img src="@/assets/logo.svg" alt="/logo" />
        <h1>视频书</h1>
      </router-link>
    </div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="|">
      <el-breadcrumb-item>
        <router-link to="/about">关于</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/help">帮助</router-link>
      </el-breadcrumb-item>
      <!-- <el-breadcrumb-item>
                <router-link to="/contect">联系</router-link>
            </el-breadcrumb-item> -->
    </el-breadcrumb>
    <!-- 搜索框 -->

    <el-input
      v-model="input"
      style="width: 240px"
      size="large"
      placeholder="搜索..."
      :suffix-icon="Search"
    />

    <!-- 头像和显示用户名 -->
    <el-dropdown v-if="authStore.islogin" trigger="hover">
      <el-avatar :size="40" :src="authStore.avatarUrl" class="avatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span class="username">用户名：{{ authStore.username }}</span>
          </el-dropdown-item>
          <el-dropdown-item :icon="SwitchButton" @click="handleLogout"> 退出登录 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-avatar
      v-else
      :size="40"
      :src="authStore.avatarUrl"
      @click="handleAvatarClick"
      class="avatar"
    />
  </el-header>
  <!-- 登录弹窗 -->
  <el-dialog v-model="authStore.loginDialogVisible" title="登录" width="500" center>
    <el-form :model="authStore.form" :rules="rules" ref="loginForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="authStore.form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="authStore.form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onLogin">登录</el-button>
      <div class="footer-links">
        <span class="register-link" @click="openRegister">立即注册</span>
        <span class="forget-link" @click="openForget">忘记密码？</span>
      </div>
    </template>
  </el-dialog>

  <!-- 注册弹窗 -->
  <el-dialog v-model="registerDialogVisible" title="注册" width="500" center>
    <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="handleRegister">注册</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-header {
  width: 100%;
}
.sign {
  display: flex;
  align-items: center;
  padding: 16px;
  max-width: 100%;
  overflow: hidden;

  img {
    width: 30px;
    height: auto;
    margin-right: 8px;
    vertical-align: middle;
  }
  h1 {
    font-size: 15px;
    color: #333;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
}
.el-header {
  display: flex;
  align-items: center;
  background-color: #eee;
}
.el-input {
  margin-left: auto;
}
.el-avatar {
  margin-left: auto;
  cursor: pointer;
}
.el-dialog {
  .el-dialog__title {
    text-align: center; /* 标题居中 */
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-button {
    background-color: #409eff;
    color: white;
    margin-right: 10px;
    &:hover {
      background-color: #66b1ff;
    }
  }
  .footer-links {
    display: flex;
    justify-content: space-between; // 确保内容两端对齐
    align-items: center;

    // 左侧按钮（立即注册）
    .register-link {
      cursor: pointer;
      color: #409eff;
      &:hover {
        color: #66b1ff; // 鼠标悬停效果
      }
    }

    // 右侧按钮（忘记密码？）
    .forget-link {
      cursor: pointer;
      color: #409eff;
      &:hover {
        color: #66b1ff;
      }
    }
  }
}
</style>
