import signinrecordApi from '@/api/signinrecord/signinrecord'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'
import courseApi from '@/api/course/course'

type signInfo = {
  studentId: string
  college: string
  signedIn: string
  week: string
  major: string
  grade: string
  name: string
  lesson: string
  qrCreator: string
  class: string
  day: string
  recordId: number,
  status: string,
}

export default Vue.extend({
  name: 'signinrecord',
  directives: { permission },
  data() {
    return {
      selRow: {} as signInfo,
      listQuery: {
        courseId: '',
        date: '',
        page: 1,
        limit: 100,
      },
      total: 0,
      list: [],
      listLoading: false,
      signed: 0,
      unsigned: 0,
      level:0,
      options: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.Today()
      this.fetchData()
      this.getCourse()
    },
    Today(){
      this.listQuery.date = signinrecordApi.getNowFormatDate()
    },
    async fetchData() {
      if (this.listQuery.courseId != '' && this.listQuery.date != '') {
        this.listLoading = true
        const response = await signinrecordApi.courseRecord(this.listQuery.courseId, this.listQuery.date)
        this.list = response.data
        this.listLoading = false
        this.total = response.data.length
        this.signed = 0
        this.unsigned = 0
        this.list.forEach((item) => {
          // @ts-ignore
          if (item.signedIn === true) {
            this.signed += 1
          }
          else {
            this.unsigned += 1
          }
        })
        this.level = this.signed / (this.signed+this.unsigned) *100
      }
    },
    async getCourse() {
      const response = await signinrecordApi.coursesToday(this.listQuery.date)
      this.options = response.data
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
      this.getCourse()
    },
    reset() {
      this.listQuery.courseId = ''
      this.listQuery.page = 1
      this.fetchData()
      this.getCourse()
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
    add(record: signInfo) {
      this.selRow = record
      signinrecordApi.sign(this.selRow.studentId, this.listQuery.courseId, this.listQuery.date, '张顾潇')
        .then(response => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.fetchData()
        })
    },
    removeItem(record: signInfo) {
      this.selRow = record
      this.remove()
    },
    remove() {
      const id = this.selRow.recordId
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
          signinrecordApi.remove(id).then(response => {
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
})