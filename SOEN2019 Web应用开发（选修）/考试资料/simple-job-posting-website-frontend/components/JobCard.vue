<template>
  <div>
    <el-card>
      <div class="job-card">
        <div class="left">
          <div class="title">{{ posting.jobTitle }} [{{ posting.region }}]</div>
          <div>
            <span class="salary">
              {{ posting.salaryFrom }}-{{ posting.salaryTo }}/{{
                parseSalaryUnit(posting.salaryBy)
              }}
            </span>
            <span class="label">{{ posting.experience }}</span>
            <span class="label">{{ posting.education }}</span>
          </div>
        </div>
        <div class="right">
          <div class="poster-name">上传用户: {{ posting.poster.username }}</div>
          <div class="poster-email">{{ posting.poster.email }}</div>
          <div class="poster-phone">{{ posting.poster.phone }}</div>
          <el-button link type="primary" @click="handleDetail">
            查看详情
          </el-button>
          <el-button v-if="editable" link type="primary" @click="handleEdit">
            编辑
          </el-button>
          <el-button v-if="editable" link type="primary" @click="handleDelete">
            删除
          </el-button>
        </div>
      </div>
    </el-card>
  </div>

  <client-only>
    <el-dialog
      title="编辑招聘信息"
      v-model="editDialogVisible"
      width="30%"
    >
      <job-posting-edit :posting="posting" :on-close="handleEditClose" />
    </el-dialog>
    <el-dialog
      title="详细信息"
      v-model="detailDialogVisible"
      width="30%"
    >
      <job-posting-detail :posting="posting" :on-close="handleDetailClose" />
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { ElButton, ElCard, ElDialog } from 'element-plus'
import jobPostingApi from '~~/apis/job_posting'

const parseSalaryUnit = (unit: JobPosting.SalaryBy) => {
  switch (unit) {
    case 'DAILY':
      return '天'
    case 'WEEKLY':
      return '周'
    case 'MONTHLY':
      return '月'
    case 'YEARLY':
      return '年'
    case 'HOURLY':
      return '小时'
  }
}

const props = defineProps<{
  posting: JobPosting.JobPostingDto
  editable: boolean
}>()

const handleDelete = async () => {
  console.log('handleDelete')
  await jobPostingApi.deleteJobPosting(props.posting.id)
}

const editDialogVisible = ref(false)
const handleEdit = () => {
  console.log('handleEdit')
  editDialogVisible.value = true
}
const handleEditClose = () => {
  editDialogVisible.value = false
}

const detailDialogVisible = ref(false)
const handleDetail = () => {
  console.log('handleDetail')
  detailDialogVisible.value = true
}
const handleDetailClose = () => {
  detailDialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.job-card {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .left {
    .title {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .salary {
      color: #fe574a;
    }

    .label {
      background-color: #f2f2f2;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px;
      margin: 0 5px;
    }
  }

  .right {
    .poster-name {
      color: #999;
      font-size: 14px;
    }
    .poster-email {
      color: #999;
      font-size: 14px;
    }
    .poster-phone {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
