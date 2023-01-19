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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click.native="editItem(scope.row)">{{
              $t('button.edit')
          }}</el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click.native="removeItem(scope.row)">{{
              $t('button.delete')
          }}</el-button>
          <el-button type="text" size="mini" @click.native="getCourse(scope.row)">查看选课</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="选课" :visible.sync="dialogTableVisible">
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
      </el-table>
    </el-dialog>
    <el-dialog :title="formTitle" :visible.sync="formVisible" width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="学号" prop="studentId">
              <el-input v-model="form.studentId" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学院" prop="college">
              <el-input v-model="form.college" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年级" prop="grade">
              <el-input v-model="form.grade" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="major">
              <el-input v-model="form.major" minlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级" prop="classes">
              <el-input v-model="form.classes" minlength="1"></el-input>
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

<script src="./student.ts"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
