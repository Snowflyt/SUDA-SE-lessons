
import signinrecordApi from '@/api/signinrecord/signinrecord'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'

type signInfo = {
  studentId:string
  courseId: string
  studentName: string
  courseName:string
  signInTime:string
  courseTime: string
  week: string
  courseLocation:string
  lesson:string
  day:string
  qrCreator:string

}

export default Vue.extend({
  name: 'personalrecord',
  directives: { permission },
  data() {
    return {
      selRow: {} as signInfo,
      listQuery: {
        studentId: '',
        week: '',
        signInTime: '',
        page: 1,
        limit: 20,
      },
      total: 0,
      list: [],
      listLoading: true,
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
      const response = await signinrecordApi.studentRecord(this.listQuery.studentId,this.listQuery.signInTime,this.listQuery.week)
      this.list = response.data
      this.listLoading = false
      this.total = response.data.length
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.week = ''
      this.listQuery.signInTime = ''
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
  }
})