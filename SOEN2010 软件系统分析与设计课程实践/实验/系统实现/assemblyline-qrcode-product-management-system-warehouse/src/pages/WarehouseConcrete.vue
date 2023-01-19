<template>
  <el-button type="primary" @click="checkWarehouseAll()">查看仓库统计</el-button>
  <el-table :data="products" stripe style="width: 100%">
    <el-table-column prop="id" label="产品ID" width="400" />
    <el-table-column prop="name" label="产品名" width="400" />
    <el-table-column prop="date" label="生产日期" width="400" />
    <el-table-column label="追溯" width="400">
      <template #default="scope">
        <el-button
          link
          type="primary"
          @click="findConcreteMessage(scope.row.id)"
          >追溯生产信息</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import warehouseApi from '../apis/warehouse'
import productApi from '../apis/product'
import warehouseConcreteApi from '../apis/warehouseConcrete'
import warehouseConcrete from "../apis/warehouseConcrete";

const route = useRoute()
const form = route.query
const warehouseId = Number.parseInt(form.id as string)

const products = ref<Product.ProductDto[]>([])

onMounted(async () => {
  const modifies = await warehouseApi.getWarehouseProducts(
    warehouseId
  )
  console.log('submit!')
  products.value = modifies.data
})

const findConcreteMessage = async (id: number) => {
  const product = (await productApi.getProduct(id)).data
  console.log(product.infos)

  const infosString = Object.entries(product.infos).map(
    ([key, value]) =>
      key +
      ' : ' +
      value +
      '<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
  )

  ElMessageBox.alert(
    '产品追溯信息为:<br>' +
      '&nbsp&nbsp&nbsp&nbsp产品批次Id：' +
      product.batchId +
      '<br>' +
      '&nbsp&nbsp&nbsp&nbsp批次数量：' +
      product.batchNum +
      '<br>' +
      '&nbsp&nbsp&nbsp&nbsp产品模型Id：' +
      product.modelId +
      '<br>' +
      '&nbsp&nbsp&nbsp&nbsp机器Id:' +
      product.machineId +
      '<br>' +
      '&nbsp&nbsp&nbsp&nbsp信息：' +
      infosString +
      '<br>',

    '追溯信息为',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '好的'
    }
  )
}



const checkWarehouseAll = async () => {
  const warehouseConcreteDtos = (await warehouseConcreteApi.searchWarehouseConcrete(warehouseId)).data;
  let result = "";
  console.log(warehouseConcreteDtos)
  for(warehouseconcrete of warehouseConcreteDtos){
    result += warehouseConcrete.productName + ' : ' + warehouseConcrete.productNum + '<br>';
  }

  ElMessageBox.alert(
      result,

      '概览',
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '好的'
      }
  )
}
</script>

<style scoped></style>
