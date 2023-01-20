<template>
  <div class="login-box">
    <h1 class="title">登录</h1>
    <el-form :model="loginForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import loginApi, { defaultLoginRequest } from '~~/apis/login'

definePageMeta({
  layout: false
})

const loginForm = ref(defaultLoginRequest)
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const router = useRouter()
const login = async () => {
  try {
    await loginApi.login(loginForm.value)
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    ElMessage.error('登录失败')
  }
}
</script>

<style lang="scss" scoped>

.login-box {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;

  .title {
    text-align: center;
    margin-left: 80px;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
