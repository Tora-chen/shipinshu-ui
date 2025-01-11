import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

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
  
    const handleLogin = async () => {
      const { username, password } = form.value;
  
      if (!username || !password) {
        ElMessage.warning('请输入用户名和密码');
        return;
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