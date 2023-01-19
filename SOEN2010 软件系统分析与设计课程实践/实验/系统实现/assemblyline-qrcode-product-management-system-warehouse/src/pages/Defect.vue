<template>
  <el-table :data="DefectProducts" stripe style="width: 100%">
    <el-table-column prop="id" label="产品id" width="400" />
    <el-table-column prop="name" label="产品名" width="400" />
    <el-table-column prop="status" label="状态" width="400" />
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import productApi from '../apis/product'

const DefectProducts = ref<Product.ProductDto[]>([])

onMounted(async () => {
  const products = (await productApi.getProductsByStatus('REJECTED')).data
  DefectProducts.value = products
})
</script>

<style scoped></style>
