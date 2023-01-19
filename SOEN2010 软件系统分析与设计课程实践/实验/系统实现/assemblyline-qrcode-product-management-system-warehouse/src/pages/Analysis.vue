<template>
  <el-card class="box-card">
    <div id="main" style="width: 1500px;height:400px;"></div>
  </el-card>
  <el-card class="box-card">
  <div id="main2" style="width: 1500px;height:400px;"></div>
  </el-card>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import * as echarts from 'echarts';
import productApi from "../apis/product";



onMounted(async () => {
  const PENDINGproducts = (await productApi.getProductsByStatus('PENDING')).data
  let PENDING_length = PENDINGproducts.length;
  const Defectproducts = (await productApi.getProductsByStatus('REJECTED')).data
  let Defect_length = Defectproducts.length;
  const PRODUCEDproducts = (await productApi.getProductsByStatus('PRODUCED')).data
  let PRODUCED_length = PRODUCEDproducts.length;


// 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
  myChart.setOption({
    title: {
      text: '产品概览'
    },
    tooltip: {},
    xAxis: {
      data: ['待生产产品', '已生产产品', '缺陷产品']
    },
    yAxis: {},
    series: [
      {
        name: '数量',
        type: 'bar',
        data: [PENDING_length,PRODUCED_length,Defect_length]
      }
    ]
  });

})
</script>

<style scoped>

</style>