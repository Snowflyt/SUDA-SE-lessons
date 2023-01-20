<template>
  <div class="header">
    <div class="left">
      <el-button link @click="goHome">主页</el-button>
      <el-button link @click="goAbout">关于</el-button>
    </div>
    <div class="right">
      <div v-if="isLogin">
        欢迎您，{{ getAccountInfo().value.username }}
        <el-button link @click="goProfile">我</el-button>
        <el-button link @click="_logout">登出</el-button>
      </div>
      <div v-else>
        <el-button link @click="goLogin">登录</el-button>
        <el-button link @click="goRegister">注册</el-button>
      </div>
    </div>
  </div>
  <slot />
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const isLogin = ref(isLoggedIn())

const router = useRouter()
const goHome = () => {
  router.push('/')
}
const goAbout = () => {
  router.push('/about')
}
const goProfile = () => {
  router.push('/profile')
}
const _logout = () => {
  logout()
  isLogin.value = isLoggedIn()
  router.go(0)
}
const goLogin = () => {
  router.push('/login')
}
const goRegister = () => {
  router.push('/register')
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: $header-bg-color;
  color: #fff;

  .left {
    display: flex;
    align-items: center;
    padding-left: $page-padding-left-right;

    .el-button {
      margin-right: 20px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    padding-right: $page-padding-left-right;
    color: grey;
    font-size: 14px;

    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
