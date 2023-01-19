<template>
  <div aria-label="A complete example of page header">
    <el-page-header @back="onBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: './BasicLayout' }">
            <a href="./BasicLayout">主页</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="./">业务全局管理</a></el-breadcrumb-item
          >
        </el-breadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <el-avatar
            class="mr-3"
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> 陈阳 </span>
          <span
            class="text-sm mr-2"
            style="color: var(--el-text-color-regular)"
          >
          </span>
          <el-tag>最高管理员</el-tag>
        </div>
      </template>
    </el-page-header>
  </div>
</template>

<script setup lang="ts">
import { ElNotification as notify } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const onBack = () => {
  router.back()
}
</script>
