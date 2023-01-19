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
          <el-select v-model="listQuery.courseId" placeholder="请选择课程">
            <el-option v-for="item in options" :key="item.courseId" :label="item.name" :value="item.courseId"
              size="small">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="listQuery.studentId" size="medium" placeholder="学号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="listQuery.name" size="medium" placeholder="名字"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="listQuery.college" placeholder="请选择学院">
            <el-option v-for="item1 in options1" :key="item1.value" :label="item1.label" :value="item1.label"
              size="small">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="listQuery.grade" placeholder="请选择年级">
            <el-option v-for="item2 in options2" :key="item2.value" :label="item2.label" :value="item2.label"
              size="small">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="listQuery.major" placeholder="请选择专业">
            <el-option v-for="item3 in options3" :key="item3.value" :label="item3.label" :value="item3.label"
              size="small">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="listQuery.classes" placeholder="请选择班级">
            <el-option v-for="item4 in options4" :key="item4.value" :label="item4.label" :value="item4.label"
              size="small">
            </el-option>
          </el-select>
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
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100, 500]"
      :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page" @size-change="changeSize"
      @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext">
    </el-pagination>
  </div>
</template>

<script src="./selectstudent.ts"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
