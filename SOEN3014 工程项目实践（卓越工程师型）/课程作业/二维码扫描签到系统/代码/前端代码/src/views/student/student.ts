import studentApi from '@/api/student/student'
import ElementUI from 'element-ui'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'

type studentInfo = {
  id: number
  name: string
  studentId: string
  college: string
  major: string
  classes: string
  grade: string
}

export default Vue.extend({
  name: 'student',
  directives: { permission },
  data() {
    return {
      formVisible: false,
      formTitle: '添加学生',
      isAdd: true,
      form: {} as studentInfo,
      selRow: {} as studentInfo,
      rules: {
        name: [
          { required: true, message: '请输入学生名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      },
      options1: [
        {
          value: '1',
          label: '计算机科学与技术学院'
        },
        {
          value: '2',
          label: '马克思主义学院'
        },
        {
          value: '3',
          label: '英语学院'
        },
      ],
      options2: [
        {
          value: '1',
          label: '2020'
        },
        {
          value: '2',
          label: '2021'
        },
        {
          value: '3',
          label: '2022'
        },
      ],
      options3: [
        {
          value: '1',
          label: '软件工程'
        },
        {
          value: '2',
          label: '计算机科学与技术'
        },
        {
          value: '3',
          label: '人工智能'
        },
      ],
      options4: [
        {
          value: '1',
          label: '软工一班'
        },
        {
          value: '2',
          label: '软工二班'
        },
        {
          value: '3',
          label: '计科一班'
        },
        {
          value: '4',
          label: '计科二班'
        },
        {
          value: '5',
          label: '人智一班'
        },
        {
          value: '6',
          label: '人智二班'
        },
      ],
      listQuery: {
        page: 1,
        limit: 20,
        studentId: undefined,
        name: undefined,
        college: undefined,
        grade: undefined,
        major: undefined,
        classes: undefined,
      },
      total: 0,
      list: [],
      listLoading: true,
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
      const response = await studentApi.getList(this.listQuery)
      this.list = response.data.records
      this.listLoading = false
      this.total = response.data.length

    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.studentId = undefined
      this.listQuery.name = undefined
      this.listQuery.college = undefined
      this.listQuery.grade = undefined
      this.listQuery.major = undefined
      this.listQuery.classes = undefined
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
      this.form.studentId = ''
      this.form.college = ''
      this.form.major = ''
      this.form.grade = ''
      this.form.classes = ''
    },
    add() {
      this.resetForm()
      this.formTitle = '添加学生'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      const stuForm = this.$refs['form'] as ElementUI.Form
      stuForm.validate(valid => {
        if (valid) {
          studentApi
            .save({
              id: this.form.id,
              studentId: this.form.studentId,
              name: this.form.name,
              college: this.form.college,
              major: this.form.major,
              grade: this.form.grade,
              classes: this.form.classes
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
    editItem(record: studentInfo) {
      this.selRow = record
      this.edit()
    },
    edit() {
      if (this.checkSel()) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '编辑学生'
        this.formVisible = true
      }
    },
    removeItem(record: studentInfo) {
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
            studentApi.remove(id).then(response => {
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
    async getCourse(record: studentInfo) {
      this.dialogTableVisible = true
      this.selRow = record
      const id = this.selRow.studentId
      this.listLoading = true
      const response = await studentApi.getCourse(id)
      this.courses = response.data
      this.listLoading = false
      this.total = response.data.length
    },
  }
})
