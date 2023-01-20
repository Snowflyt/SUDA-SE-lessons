<template>
  <div class="register-box">
    <h1 class="title">注册</h1>
    <el-form :model="registerForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="register"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import accountApi, { defaultAccountCreationRequest } from '~~/apis/account'

definePageMeta({
  layout: false
})

const registerForm = ref({
  ...defaultAccountCreationRequest,
  confirmPassword: ''
})
const rules: Record<string, any> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (_: any, value: string, callback: any) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: '请输入电话', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ]
}

const router = useRouter()
const register = async () => {
  console.log('register')
  try {
    await accountApi.createAccount(registerForm.value)
    ElMessage.success('注册成功')
    router.push('/login')
  } catch (error) {
    ElMessage.error('注册失败')
  }
}
</script>

<style lang="scss" scoped>
.register-box {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 5px;

  .title {
    text-align: center;
    margin-left: 80px;
  }

  .register-btn {
    width: 100%;
  }
}
</style>
