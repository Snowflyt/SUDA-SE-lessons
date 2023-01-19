<template>
  <div class="dashboard-container" id="dashboard">
    <div class="dashboard-text">欢迎光临:{{ user.name }}{{ user.roles }}
    </div>

    <el-row>
      <el-col :span="24">
        <div class="chart section">
          <v-chart :options="lineData" ref="lineChart" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <v-chart :options="barData" class="chart section" ref="barChart" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <v-chart :options="pieData" class="chart section" ref="pieChart" />
      </el-col>
      <el-col :span="12">
        <el-table height="250" stripe default-sort="{ prop: 'date', order: 'descending' }" :data="tableData"
          class="section">
          <el-table-column prop="date" :label="$t('dashboard.signtime')" width="180">
          </el-table-column>
          <el-table-column prop="name" :label="$t('dashboard.name')" width="180">
          </el-table-column>
          <el-table-column prop="course" :label="$t('dashboard.courseName')">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script src="./dashboard.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.dashboard {
  &-container {
    padding: 15px;
    background-color: #f0f2f5;
  }

  &-text {
    font-size: 14px;
    line-height: 22px;
    padding-bottom: 15px;
  }
}

.echarts {
  width: 100%;
  height: 100%;
}

.box-card {
  height: 108px;
}

.chart {
  height: 550px;
}

.section {
  padding: 10px;
  background-color: white;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.box-card>div>div>.svg-icon {
  width: 4em;
  height: 4em;
  color: #34bfa3;
}

.card-panel-text {
  padding-top: 10px;
  font-size: 16px;
  color: gray;
}

.card-panel-num {
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
}

.dashboard-text {
  font-size: 30px;
  font-weight: bold;
}

.test {
  text-align: center;
}
</style>
