<template>
  <div class="app-container">
    <el-row>

      <el-col :span="20">
        <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
          @current-change="handleCurrentChange">
          <el-table-column label="账号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>

          <el-table-column label="部门">
            <template slot-scope="scope">
              {{ scope.row.dept.simplename }}
            </template>
          </el-table-column>

          <el-table-column label="修改个人信息" min-width="150px">
            <template slot-scope="scope">
              <el-button type="text" size="mini" icon="el-icon-edit" @click.native="editItem(scope.row)"
                v-permission="['/mgr/edit']">
                {{ $t('button.edit') }}
              </el-button>

            </template>
          </el-table-column>
        </el-table>


      </el-col>
    </el-row>
    <el-dialog :title="formTitle" :visible.sync="formVisible" width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户" prop="account">
              <el-input v-model="form.account" minlength="1" disabled="edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" minlength="1" disabled="edit"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isAdd">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isAdd">
            <el-form-item label="确认密码" prop="rePassword">
              <el-input v-model="form.rePassword" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="deptid">
              <treeselect v-model="form.deptid" :options="deptTree.data" placeholder="请选择所属部门" />
            </el-form-item>
          </el-col>


        </el-row>
        <el-form-item>
          <el-button type="primary" @click="saveUser">{{
              $t('button.submit')
          }}</el-button>
          <el-button @click.native="formVisible = false">{{
              $t('button.cancel')
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script src="./user.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';
</style>
