<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-date-picker @change="getCourse" type="date" placeholder="签到日期" v-model="listQuery.date" value-format="yyyy-MM-dd"
            style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-select v-model="listQuery.courseId" placeholder="请选择课程">
            <el-option v-for="item in options" :key="item.courseId" :label="item.name" :value="item.courseId"
              size="small">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <br /> <br />
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}
          </el-button>
        </el-col>
        <br /> <br /> <br />
      </el-row>
      <el-row :gutter="30">
        <div> 已签到人数为：{{ signed }} 未签到人数为：{{ unsigned }} 签到率为：{{ level }} %</div>
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
          {{ scope.row.class }}
        </template>
      </el-table-column>
      <el-table-column label="签到情况">
        <template slot-scope="scope">
          {{ scope.row.signedIn }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="签到时间" sortable>
        <template slot-scope="scope">
          {{ scope.row.signInTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" icon="el-icon-plus" @click.native="add(scope.row)">手动补签
          </el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click.native="removeItem(scope.row)">{{
              $t('button.delete')
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100, 500]"
      :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page" @size-change="changeSize"
      @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext">
    </el-pagination>
  </div>
</template>

<script src="./signinrecord.ts"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
