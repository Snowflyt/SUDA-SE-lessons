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
        <el-col :span="6">
          <el-input v-model="listQuery.name" size="mini" placeholder="课程名"></el-input>
        </el-col>
      </el-row>
      <br />
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" stripe border fit
      highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="课程号">
        <template slot-scope="scope">
          {{ scope.row.courseId }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="课程名" sortable>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="上课时间" sortable>
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="上课地点">
        <template slot-scope="scope">
          {{ scope.row.location }}
        </template>
      </el-table-column>
      <el-table-column label="学生信息">
        <template slot-scope="scope">
          <el-button type="text" @click.native="getStudents(scope.row)">查看学生</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click.native="goTo(scope.row)">开启签到</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="学生" :visible.sync="stuTableVisible">
      <el-table :data="students">
        <el-table-column prop="id" label="ID" sortable>
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column prop="stuId" label="学号" sortable>
          <template slot-scope="scope">
            {{ scope.row.studentId }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" sortable>
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="college" label="学院" sortable>
          <template slot-scope="scope">
            {{ scope.row.college }}
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="年级" sortable>
          <template slot-scope="scope">
            {{ scope.row.grade }}
          </template>
        </el-table-column>
        <el-table-column prop="major" label="专业" sortable>
          <template slot-scope="scope">
            {{ scope.row.major }}
          </template>
        </el-table-column>
        <el-table-column prop="class" label="班级" sortable>
          <template slot-scope="scope">
            {{ scope.row.classes }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100, 500]"
      :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page" @size-change="changeSize"
      @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext">
    </el-pagination>
  </div>
</template>

<script src="./teachercourse.ts"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
