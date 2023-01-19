<template>
  <el-table :data="pendingProducts" stripe style="width: 100%">
    <el-table-column prop="id" label="产品id" width="400" />
    <el-table-column prop="name" label="产品名" width="400" />
    <el-table-column prop="batchId" label="批次号" width="400" />
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import productApi from '../apis/product'

const pendingProducts = ref<Product.ProductDto[]>([])

onMounted(async () => {
  const products = (await productApi.getProductsByStatus('PENDING')).data
  pendingProducts.value = products
})
console.log(pendingProducts)
</script>

<style scoped></style>
