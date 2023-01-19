<template>
  <el-button type="primary" :icon="Search" @click="dialogFormVisible = true"
    >创建仓库</el-button
  >

  <el-dialog v-model="dialogFormVisible" title="创建仓库">
    <el-form :model="addWarehouse">
      <el-form-item label="请输入仓库名">
        <el-input v-model="addWarehouse.house_name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="addWarehouse2(addWarehouse.house_name)"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-table :data="afters" stripe style="width: 100%">
    <el-table-column prop="id" label="仓库ID" width="400" />
    <el-table-column prop="houseName" label="仓库名" width="400" />
    <el-table-column label="查看详情" width="400">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click="enterConcrete(scope.row.id, scope.row.houseName)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="300">
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Search"
          @click="handleClick(scope.row.id, scope.row.houseName)"
          >调度</el-button
        >
        <el-button type="danger" @click="deleteWarehouse(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { LocationQueryRaw, useRouter } from 'vue-router'
import warehouseApi from '../apis/warehouse'

let dialogFormVisible = ref(false)

const addWarehouse = reactive({
  house_name: ''
})

const afters = ref<Warehouse.WarehouseDto[]>([])

onMounted(async () => {
  const warehouseList = (await warehouseApi.getAllWarehouses()).data
  console.log({ warehouseList })
  warehouseList.forEach(warehouse => {
    console.log(warehouse.id)
  })
  afters.value = warehouseList
  console.log(afters)
})

const form = reactive({
  id: 0,
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: '',
  type: [],
  resource: '',
  desc: ''
} as LocationQueryRaw)

const router = useRouter()

const handleClick = (id: number, houseName: string) => {
  form.id = id
  console.log(form.id)
  form.name = houseName
  router.push({
    path: '/dispatch',
    query: form
  })
}

const enterConcrete = (id: number, houseName: string) => {
  form.id = id
  console.log(form.id)
  form.name = houseName
  router.push({
    path: '/warehouseConcrete',
    query: form
  })
}

const deleteWarehouse = async (id: number) => {
  await warehouseApi.deleteWarehouse(id)
  const warehouseList = (await warehouseApi.getAllWarehouses()).data
  afters.value = warehouseList
}

const addWarehouse2 = async (house_name: string) => {
  await warehouseApi.addWarehouse(house_name)
  const warehouseList = (await warehouseApi.getAllWarehouses()).data
  afters.value = warehouseList
  dialogFormVisible = ref(false)
}
</script>

<style scoped></style>
