import courseApi from '@/api/course/course'
import ElementUI from 'element-ui'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'

type CourseInfo = {
  id: number
  name: string
  time: string
  location: string
  courseId: string
}
export default Vue.extend({
  name: 'course',
  directives: { permission },
  data() {
    return {
      formVisible: false,
      formTitle: '添加课程',
      isAdd: true,
      form: {} as CourseInfo,
      selRow: {} as CourseInfo,
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        teacher: undefined
      },
      total: 0,
      list: [],
      listLoading: true,
      students: [],
      teachers: [],
      stuTableVisible: false,
      teaTableVisible: false,
      teacher:'',
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
      const response = await courseApi.getList(this.listQuery)
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
      this.listQuery.teacher = undefined
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
      this.form.id = 0
      this.form.name = ''
      this.form.time = ''
      this.form.location = ''
      this.form.courseId = ''
    },
    add() {
      this.resetForm()
      this.formTitle = '添加课程'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      const form = this.$refs['form'] as ElementUI.Form
      form.validate(valid => {
        if (valid) {
          courseApi
            .save({
              id: this.form.id,
              name: this.form.name,
              time: this.form.time,
              location: this.form.location,
              courseId: this.form.courseId,
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
    editItem(record: CourseInfo) {
      this.selRow = record
      this.edit()
    },
    edit() {
      if (this.checkSel()) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '编辑课程'
        this.formVisible = true
      }
    },
    removeItem(record: CourseInfo) {
      this.selRow = record
      this.remove()
    },
    remove() {
      if (this.checkSel()) {
        const id = this.selRow.id
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
            courseApi.remove(id).then(response => {
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
    async getStudents(record: CourseInfo) {
      this.stuTableVisible = true
      this.selRow = record
      const id = this.selRow.courseId
      this.listLoading = true
      const response = await courseApi.getStudent(id)
      this.students = response.data
      this.listLoading = false
      this.total = response.data.length
    },
    async getTeachers(record: CourseInfo) {
      this.teaTableVisible = true
      this.selRow = record
      const id = this.selRow.courseId
      this.listLoading = true
      const response = await courseApi.getTeacher(id)
      this.teachers = response.data
      this.listLoading = false
      this.total = response.data.length
    },
  }
})