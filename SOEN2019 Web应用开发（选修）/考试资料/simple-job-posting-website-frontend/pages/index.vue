<template>
  <div>
    <h1>简单招聘 Simple Job</h1>
    <el-input
      v-model="input"
      placeholder="搜索招聘信息"
      :prefix-icon="Search"
      @keyup.enter.native="handleSearch"
    />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最新" name="latest" />
      <el-tab-pane label="我的" name="mine" />
    </el-tabs>
    <el-button
      class="upload-btn"
      type="primary"
      @click="handleCreate"
      v-if="activeName === 'mine' && isLogin"
      >上传招聘信息</el-button
    >
    <div v-for="posting in postings">
      <job-card :posting="posting" :editable="activeName === 'mine'" />
    </div>
  </div>

  <client-only>
    <el-dialog
      title="上传招聘信息"
      v-model="createDialogVisible"
      width="30%"
    >
      <job-posting-create :on-close="handleCreateClose" />
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { ElButton, ElDialog, ElInput, ElTabs, ElTabPane } from 'element-plus'
import { Search } from '@element-plus/icons'
import jobPostingApi from '~~/apis/job_posting'

const isLogin = ref(isLoggedIn())
watch(getAccountInfo(), () => {
  isLogin.value = isLoggedIn()
})

const input = ref('')
const handleSearch = () => {
  activeName.value = 'latest'
  postings.value = postings.value.filter((posting) =>
    posting.jobTitle.includes(input.value)
  )
}

const activeName = ref('latest')
const handleClick = async () => {
  if (activeName.value === 'latest') {
    postings.value = await jobPostingApi.getAllJobPostings()
  } else {
    postings.value = await jobPostingApi.getJobPostingsByUser()
  }
}

const postings = ref(await jobPostingApi.getAllJobPostings())

const createDialogVisible = ref(false)
const handleCreate = () => {
  createDialogVisible.value = true
}
const handleCreateClose = () => {
  createDialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.upload-btn {
  width: 100%;
  margin-bottom: 10px;
}
</style>