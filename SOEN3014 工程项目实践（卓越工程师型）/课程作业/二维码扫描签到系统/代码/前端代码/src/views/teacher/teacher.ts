import teacherApi from '@/api/teacher/teacher'
import ElementUI from 'element-ui'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'

type teacherInfo = {
  id: number
  name: string
  teacherId: string
}

export default Vue.extend({
  name: 'teacher',
  directives: { permission },
  data() {
    return {
      formVisible: false,
      formTitle: '添加教师',
      isAdd: true,
      form: {} as teacherInfo,
      selRow: {} as teacherInfo,
      rules: {
        name: [
          { required: true, message: '请输入教师名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
      },
      total: 0,
      list: [],
      listLoading: false,
      courses: [],
      dialogTableVisible: false,
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const response = await teacherApi.getList(this.listQuery.name)
      this.list = response.data.records
      this.listLoading = false
      this.total = response.data.length
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.name = undefined
      this.listQuery.page = 1
      this.fetchData()
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    resetForm() {
      this.form.name = ''
      this.form.teacherId = ''
    },
    add() {
      this.resetForm()
      this.formTitle = '添加教师'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      const form = this.$refs['form'] as ElementUI.Form
      form.validate(valid => {
        if (valid) {
          teacherApi
            .save({
              id: this.form.id,
              teacherId: this.form.teacherId,
              name: this.form.name,
            })
            .then(response => {
              this.$message({
                message: this.$t('common.optionSuccess') as string,
                type: 'success'
              })
              this.fetchData()
              this.formVisible = false
            })
        } else {
          return false
        }
      })
    },
    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: '请选中操作项',
        type: 'warning'
      })
      return false
    },
    editItem(record: teacherInfo) {
      this.selRow = record
      this.edit()
    },
    edit() {
      if (this.checkSel()) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '编辑教师'
        this.formVisible = true
      }
    },
    removeItem(record: teacherInfo) {
      this.selRow = record
      this.remove()
    },
    remove() {
      if (this.checkSel()) {
        const id = this.selRow.teacherId
        this.$confirm(
          this.$t('common.deleteConfirm') as string,
          this.$t('common.tooltip') as string,
          {
            confirmButtonText: this.$t('button.submit') as string,
            cancelButtonText: this.$t('button.cancel') as string,
            type: 'warning'
          }
        )
          .then(() => {
            teacherApi.remove(id).then(response => {
              this.$message({
                message: this.$t('common.optionSuccess') as string,
                type: 'success'
              })
              this.fetchData()
            })
          })
          .catch(() => { })
      }
    },
    async getCourses(record: teacherInfo) {
      this.dialogTableVisible = true
      this.selRow = record
      const id = this.selRow.teacherId
      this.listLoading = true
      const response = await teacherApi.findAll(id)
      this.courses = response.data
      this.listLoading = false
      this.total = response.data.length

    },
  }
})
