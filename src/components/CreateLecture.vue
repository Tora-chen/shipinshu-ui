<template>
  <!-- 创建课程弹窗 -->
  <el-dialog title="创建课程" width="500" center v-model="dialogVisible">
    <el-form :model="formData" :rules="rules" ref="createLectureForm" label-width="80px">
      <el-form-item label="课程标题" prop="lectureTitle">
        <el-input v-model="formData.lectureTitle" placeholder="请输入课程标题"></el-input>
      </el-form-item>
      <el-form-item label="课程描述" prop="lectureDescription">
        <el-input v-model="formData.lectureDescription" placeholder="请输入课程描述"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="createLecture">创建</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {API_URLS} from "@/config/api";
import axios from "axios";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible,

      formData: {
        lectureTitle: '',
        lectureDescription: ''
      },
      rules: {
        lectureTitle: [
          { required: true, message: '课程标题不能为空', trigger: 'change' },
          { min: 2, max: 50, message: '课程标题长度在 2 到 50 个字符之间', trigger: 'change' }
        ],
        lectureDescription: [
          { required: true, message: '课程描述不能为空', trigger: 'change' },
          { min: 2, max: 200, message: '课程描述长度在 2 到 200 个字符之间', trigger: 'change' }
        ]
      }
    };
  },
  watch: {
      visible(val) {
        this.dialogVisible = val; // 监听父组件的 `visible` 状态
      }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.$emit('close'); // 向父组件传递状态
      console.log('close emitted')
    },
    // 创建课程
    createLecture() {
      this.$refs.createLectureForm.validate(valid => {
        if (valid) {
          axios.post(
              API_URLS.createLecture,
              {
                title: this.formData.lectureTitle,
                description: this.formData.lectureDescription
              },
              {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          }).then(() => {
            alert('创建课程成功!');
          }).then(()=> {
            this.$emit('created'); // 向父组件传递状态
            this.closeDialog(); // 关闭弹窗
          }).catch(error => {
            alert('创建课程失败!');
            console.error('创建课程失败:', error);
          });
        } else {
          console.log('表单验证失败!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
