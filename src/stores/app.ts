import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { API_URLS } from '@/config/api';
import axios from 'axios';

export const aside = defineStore('global',{
    state:() =>({
        isCollapse:false,
    }),
    actions:{
        updateIsCollapse(){
            this.isCollapse = !this.isCollapse;
            
        }
    }
});
export const useAuthStore = defineStore('auth', () => {
    const islogin = ref(false);
    const loginDialogVisible = ref(false);
    const avatarUrl=ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
    const form = ref({ username: '', password: '' });
  
    const login = async (data: { username: string; password: string }) => {
        try {
            // 向后端发送 POST 请求，传递用户名和密码
            const response = await axios.post(API_URLS.login, data);
            
            // 处理后端返回的响应数据
            const res = response;
            console.log(res)
        
    
            if (res.status === 200) {
                // 登录成功，将 JWT Token 存储到本地存储
                console.log("登录成功")
                localStorage.setItem('token', res.data.token); // 假设后端返回的 token 字段名为 "token"
            } 
            return { code: res.status, message: res.data.message };
        }
        catch (error: any) {
            // 捕获错误并输出到控制台
            if (error.response.status === 401) {
                return { code: 401, message: '用户名或密码错误' };
            }
            return { code: 500, message: error.message };
        }
    };
  
    const handleLogin = async () => {
      const { username, password } = form.value;
  
      if (!username || !password) {
        ElMessage.warning('请输入用户名和密码');
        return;
      }
        
        // 向后端发送登录请求
        const res = await login({ username, password });
        if (res.code !== 200) {
          ElMessage.error(res.message);
          return false;
        }
  
      islogin.value = true;
      avatarUrl.value = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      loginDialogVisible.value = false; // 关闭登录窗口
      form.value = { username: '', password: '' };
      ElMessage.success('登录成功');
      return true;
    };
  
    return {
      islogin,
      loginDialogVisible,
      form,
      handleLogin,
      avatarUrl
    };
  });