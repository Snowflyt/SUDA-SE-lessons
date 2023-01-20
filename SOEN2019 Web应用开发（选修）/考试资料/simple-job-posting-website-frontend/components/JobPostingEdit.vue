<template>
  <div>
    <el-input
      v-model="posting.jobTitle"
      placeholder="请输入职位名称"
      style="margin-bottom: 10px"
    />
    <el-input
      v-model="posting.region"
      placeholder="请输入工作地点"
      style="margin-bottom: 10px"
    />
    <el-input
      v-model="posting.education"
      placeholder="请输入学历要求"
      style="margin-bottom: 10px"
    />
    <el-input-number
      v-model="posting.salaryFrom"
      placeholder="请输入薪资起步"
      style="margin-bottom: 10px"
    />
    <el-input-number
      v-model="posting.salaryTo"
      placeholder="请输入薪资上限"
      style="margin-bottom: 10px"
    />
    <el-select
      v-model="posting.salaryBy"
      placeholder="请选择薪资单位"
      style="margin-bottom: 10px"
    >
      <el-option label="月" value="MONTHLY" />
      <el-option label="年" value="YEARLY" />
      <el-option label="周" value="WEEKLY" />
      <el-option label="天" value="DAILY" />
      <el-option label="小时" value="HOURLY" />
    </el-select>
    <el-input
      v-model="posting.experience"
      placeholder="请输入工作经验要求"
      style="margin-bottom: 10px"
    />
    <el-input
      v-model="posting.description"
      placeholder="请输入职位描述"
      style="margin-bottom: 10px"
    />
    <el-button type="primary" @click="handleClose">取消</el-button>
    <el-button type="primary" @click="handleSubmit">确定</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElInput, ElInputNumber, ElSelect, ElOption } from 'element-plus'
import jobPostingApi from '~~/apis/job_posting'

const props = defineProps<{
  posting: JobPosting.JobPostingDto
  onClose: () => void
}>()

const handleClose = () => {
  props.onClose()
}

const handleSubmit = () => {
  console.log(props.posting)
  jobPostingApi.updateJobPosting(props.posting.id, props.posting)
  props.onClose()
}
</script>
