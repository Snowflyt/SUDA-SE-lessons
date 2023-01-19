<template>
  <el-aside>
    <el-row class="tac">
      <el-col :span="50">
        <h5 class="mb-2">Default colors</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>业务全局管理</span>
            </template>
            <el-menu-item index="/warehouse">仓库</el-menu-item>
            <el-menu-item index="/PENDING">待生产</el-menu-item>
            <el-menu-item index="/defect">缺陷品概览</el-menu-item>
            <el-menu-item index="/Analysis">统计分析</el-menu-item>
            <el-menu-item index="/assemblyLine">流水线状态</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </template>
            <el-menu-item index="/s">账号管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script lang="ts" setup>
import { Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import routes from '../config/route'

const router = useRouter()
const DEFAULT_TITLE = '伙伴匹配'
const title = ref(DEFAULT_TITLE)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

/**
 * 根据路由切换标题
 */
router.beforeEach(to => {
  const toPath = to.path
  const route = routes.find(route => {
    return toPath === route.path
  })
  title.value = route?.title ?? DEFAULT_TITLE
})
</script>
