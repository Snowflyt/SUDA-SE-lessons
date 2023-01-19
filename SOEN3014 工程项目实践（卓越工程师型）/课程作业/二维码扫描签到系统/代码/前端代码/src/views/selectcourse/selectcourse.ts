import courseApi from '@/api/course/course'
import studentApi from '@/api/student/student'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'
import signinrecordApi from '@/api/signinrecord/signinrecord'

type CourseInfo = {
  id: number
  name: string
  time: string
  location: string
  courseId: string
}
export default Vue.extend({
  name: 'selectcourse',
  directives: { permission },
  data() {
    return {
      selRow: {} as CourseInfo,
      listQuery: {
        page: 1,
        limit: 20,
        studentId: undefined,
      },
      total: 0,
      list: [],
      listLoading: true,
      teachers: [],
      teaTableVisible: false,
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
      const response1 = await signinrecordApi.info()
      this.listQuery.studentId = response1.data.profile.account
      if(this.listQuery.studentId != 'admin'){
      const response = await studentApi.getCourse(this.listQuery.studentId)
      this.list = response.data
      this.listLoading = false
      this.total = response.data.length
      }
      this.listLoading = false
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
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