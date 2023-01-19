<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="当前仓库">
      {{ form.name }}
    </el-form-item>
    <el-form-item label="调度至仓库">
      <el-select
        v-model="modify.modifyWarehouseId"
        placeholder="请选择要调度到的仓库"
      >
        <template v-for="warehouse in warehouseList">
          <el-option
            v-if="warehouse.houseName !== form.name"
            :label="warehouse.houseName"
            :value="warehouse.id"
          />
        </template>
      </el-select>
    </el-form-item>

    <el-form-item label="调度产品名">
      <el-select
        v-model="modify.productName"
        placeholder="请选择要调度的产品的名称"
        @change="changeProductName(Number.parseInt(form.id as string), modify.productName)"
      >
        <template v-for="product in productList">
          <el-option
            :label="product.productName"
            :value="product.productName"
          />
        </template>
      </el-select>
    </el-form-item>

    <el-form-item label="调度数量">
      <el-input-number
        v-model="modify.modifyNum"
        :min="0"
        :max="maxNum"
        @change="handleChange"
      />
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">调度</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import warehouseApi from '../apis/warehouse'
import warehouseConcreteApi from '../apis/warehouseConcrete'

const modify = reactive({
  warehouseId: 0,
  modifyWarehouseId: '',
  productName: '',
  modifyNum: 0
})

const warehouseName = ref()
const dispatchProduct = ref()
const dispatchNum = ref(1)
const wareHouse = ref()

const handleChange = (value: number) => {
  console.log(value)
}

const route = useRoute()
const form = route.query

let modifyWarehouseId = ref(1)

let maxNum = ref(0)

const warehouseId = Number.parseInt(form.id as string)

const onSubmit = async () => {
  await warehouseConcreteApi.modifyWarehouseConcrete({
    warehouseId: warehouseId,
    modifyWarehouseId: Number.parseInt(modify.modifyWarehouseId),
    productName: modify.productName,
    modifyNum: modify.modifyNum
  })
  console.log('submit!')
  modify.modifyWarehouseId = ''
  modify.productName = ''
  modify.modifyNum = 0

  ElMessageBox.alert('调度成功！', '提示', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK'
  })
}

const productList = ref<WarehouseConcrete.WarehouseConcreteDto[]>([])

const warehouseList = ref<Warehouse.WarehouseDto[]>([])

onMounted(async () => {
  const res2 = await warehouseApi.getAllWarehouses()
  warehouseList.value = res2.data
  console.log({ warehouseId })
  const products = await warehouseConcreteApi.searchWarehouseConcrete({
    warehouseId
  })
  productList.value = products.data
})

const handleChangeWarehouse = (id: Ref<number>) => {
  modifyWarehouseId = id
}

const changeProductName = async (warehouseId: number, productName: string) => {
  const warehouseConcrete = (
    await warehouseConcreteApi.getWarehouseConcrete(warehouseId, productName)
  ).data

  maxNum.value = warehouseConcrete.productNum
}
</script>

<style scoped></style>
