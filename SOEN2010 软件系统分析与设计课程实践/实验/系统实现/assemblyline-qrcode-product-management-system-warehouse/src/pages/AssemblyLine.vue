<template>
  <template v-for="assemblyLine in assemblyLineList">
    <el-alert
      :title="`${assemblyLine.name}发生了故障，请立即联系排查！`"
      type="warning"
      show-icon
      v-if="assemblyLine.status === 'FAULT'"
      effect="dark"
    />
  </template>
  <el-table :data="assemblyLineList" stripe style="width: 100%" size="large">
    <el-table-column prop="name" label="流水线名称" width="400" />
    <el-table-column prop="status" label="流水线状态" width="400">
      <template #default="scope">
        <span style="color: red" v-if="scope.row.status === 'FAULT'">{{
          scope.row.status
        }}</span>
        <span v-else>{{ scope.row.status }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import assemblyLineApi from '../apis/assemblyLine'

const assemblyLineList = ref<AssemblyLine.AssemblyLineDto[]>([])

onMounted(async () => {
  const assemblyLines = (await assemblyLineApi.getAllAssemblyLines()).data
  assemblyLineList.value = assemblyLines
})
</script>

<style scoped></style>
