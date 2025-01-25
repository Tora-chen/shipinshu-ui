import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

//播放视频页面侧边栏收放
export const aside = defineStore('global', {
  state: () => ({
    isCollapse: false
  }),
  actions: {
    updateIsCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
})

// 登录和退出登录身份验证等等
export const useAuthStore = defineStore('auth', () => {
  const islogin = ref(false)
  const loginDialogVisible = ref(false)
  const avatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
  const form = ref({ username: '', password: '' })
  const username = ref('')

  const handleLogin = async () => {
    const { username: inputUsername, password } = form.value

    if (!inputUsername || !password) {
      ElMessage.warning('请输入用户名和密码')
      return false
    }

    islogin.value = true
    username.value = inputUsername
    avatarUrl.value = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    loginDialogVisible.value = false // 关闭登录窗口
    form.value = { username: '', password: '' }
    // 打印状态
    console.log('Login successful:', {
      islogin: islogin.value,
      username: username.value
    })
    ElMessage.success('登录成功')
    return true
  }
  const handleLogout = () => {
    islogin.value = false
    username.value = ''
    avatarUrl.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    ElMessage.success('退出登录成功')
  }

  return {
    islogin,
    loginDialogVisible,
    form,
    handleLogin,
    avatarUrl,
    username,
    handleLogout
  }
})
