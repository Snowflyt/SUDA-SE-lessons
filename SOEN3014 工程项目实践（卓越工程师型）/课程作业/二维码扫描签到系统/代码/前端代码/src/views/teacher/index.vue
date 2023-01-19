<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="30">
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}
          </el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}
          </el-button>
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="listQuery.name" size="medium" placeholder="教师名"></el-input>
        </el-col>
      </el-row>
      <br />
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" stripe border fit
      highlight-current-row @current-change="handleCurrentChange">
      <el-table-column prop="id" label="ID" sortable=true>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="teaId" label="教师号" sortable>
        <template slot-scope="scope">
          {{ scope.row.teacherId }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable>
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click.native="editItem(scope.row)">{{
              $t('button.edit')
          }}</el-button>
           <el-button type="text" size="mini" icon="el-icon-delete" @click.native="removeItem(scope.row)">{{
              $t('button.delete')
          }}</el-button>
          <el-button type="text" @click.native="getCourses(scope.row)">查看课程</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="课程" :visible.sync="dialogTableVisible">
      <el-table :data="courses">
        <el-table-column prop="id" label="ID" sortable>
          <template slot-scope="scope">
            {{ scope.row.id }}
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
      </el-table>
    </el-dialog>
    <el-dialog :title="formTitle" :visible.sync="formVisible" width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="教师号" prop="teacherId">
              <el-input v-model="form.teacherId" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" minlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{
              $t('button.submit')
          }}</el-button>
          <el-button @click.native="formVisible = false">{{
              $t('button.cancel')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100, 500]"
      :page-size="listQuery.limit" :total="total" :current-page.sync="listQuery.page" @size-change="changeSize"
      @current-change="fetchPage" @prev-click="fetchPrev" @next-click="fetchNext">
    </el-pagination>
  </div>
</template>

<script src="./teacher.ts"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
