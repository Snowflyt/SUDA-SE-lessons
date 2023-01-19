<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="30">
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="listQuery.week" size="medium" placeholder="第几周"></el-input>
        </el-col>
        <el-col :span="4">
          <el-date-picker
            type="date"
            placeholder="签到日期"
            v-model="listQuery.signInTime"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-row>
      <br />
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" stripe border fit
      highlight-current-row @current-change="handleCurrentChange">
      <el-table-column prop="stuId" label="学号" sortable>
        <template slot-scope="scope">
          {{ scope.row.studentId }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable>
        <template slot-scope="scope">
          {{ scope.row.studentName }}
        </template>
      </el-table-column>
      <el-table-column label="课程号" >
        <template slot-scope="scope">
          {{ scope.row.courseId }}
        </template>
      </el-table-column>
      <el-table-column prop = "course" label="课程名" sortable>
        <template slot-scope="scope">
          {{ scope.row.courseName }}
        </template>
      </el-table-column>
      <el-table-column label="上课时间" sortable>
        <template slot-scope="scope">
          {{ scope.row.courseTime }}
        </template>
      </el-table-column>
      <el-table-column prop= "week" label="第几周" sortable>
        <template slot-scope="scope">
          {{ scope.row.week }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="签到时间" sortable>
        <template slot-scope="scope">
          {{ scope.row.signInTime }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100, 500]"
      :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page" @size-change="changeSize"
      @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext">
    </el-pagination>
  </div>
</template>

<script src="./personalrecord.ts"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
