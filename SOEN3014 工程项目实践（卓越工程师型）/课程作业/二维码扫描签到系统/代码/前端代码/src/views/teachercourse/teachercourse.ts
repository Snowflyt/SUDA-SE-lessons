import courseApi from '@/api/course/course'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'
import teacherApi from '@/api/teacher/teacher'
import signinrecordApi from '@/api/signinrecord/signinrecord'

type CourseInfo = {
  id: number
  name: string
  time: string
  location: string
  courseId: string
}
export default Vue.extend({
  name: 'teachercourse',
  directives: { permission },
  data() {
    return {
      selRow: {} as CourseInfo,
      listQuery: {
        page: 1,
        limit: 20,
        teacherId: '',
        name:'',
      },
      
      total: 0,
      list: [],
      listLoading: true,
      students: [],
      stuTableVisible: false,
      newlist:[],
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
    async init() {
      await this.fetchData()
      this.list = this.newlist
    },
    async fetchData() {
      this.listLoading = true
      const response1 = await signinrecordApi.info()
      this.listQuery.teacherId = response1.data.profile.account
      if (this.listQuery.teacherId != 'admin') {
        const response = await teacherApi.findAll(this.listQuery.teacherId)
        this.newlist = response.data
        this.total = response.data.length
      }
      this.listLoading = false

    },
    async search() {
      await this.fetchData()
      this.listLoading = true
      this.listQuery.page = 1
      this.list = this.newlist.filter(
        (item: CourseInfo) =>
          item.name.includes(this.listQuery.name)
      )
      this.listLoading = false
    },
    reset() {
      this.listQuery.name = ''
      this.listQuery.page = 1
      this.fetchData()
      this.list = this.newlist
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
    goTo(record: CourseInfo) {
      this.selRow = record
      const name = this.selRow.name
      this.$router.push({path:'/signin',query:{name}});
    }
  }
})