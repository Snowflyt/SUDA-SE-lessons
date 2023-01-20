<template>
  <div>
    <div v-for="label in posting.labels">
      <el-tag>{{ label }}</el-tag>
    </div>
    <p>{{ posting.description }}</p>
    <el-button type="primary" @click="handleClose">确定</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElTag } from 'element-plus'

const props = defineProps<{
  posting: JobPosting.JobPostingDto
  onClose: () => void
}>()

const handleClose = () => {
  props.onClose()
}
</script>
