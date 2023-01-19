import courseApi from '@/api/course/course'
import Vue from 'vue'
import permission from '@/directive/permission/index.js'

type StudentInfo = {
  id: number
  name: string
  studentId: string
  college: string
  major: string
  classes: string
  grade: string
}

type CourseInfo = {
  courseId: string
  createTime: string
  id: number
  location: string
  modifyTime: string
  name: string
  signInRecords: {
    createTime: string
    day: string
    id: number
    lesson: string
    modifyTime: string
    qrCreator: string
    status: string
    week: string
  }[]
  studentMtmCourses: {
    createTime: string
    id: number
    modifyTime: string
    select_time: string
  }[]
  time: string
}

export default Vue.extend({
  name: 'selectstudent',
  directives: { permission },
  data () {
    return {
      selRow: {} as StudentInfo,
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
        }
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
        }
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
        }
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
        }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        studentId: '',
        name: '',
        college: '',
        grade: '',
        major: '',
        classes: '',
        courseId: ''
      },
      listQuery1: {
        id: undefined,
        name: '',
        page: 1,
        limit: 100
      },
      total: 0,
      list: [] as StudentInfo[],
      newlist: [] as StudentInfo[],
      listLoading: false,
      options: [] as CourseInfo[]
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },

  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this.getCourse()
      this.listQuery.courseId = this.options[0].courseId
      await this.fetchData()
      this.list = this.newlist
    },
    async fetchData () {
      if (this.listQuery.courseId != '') {
        this.listLoading = true
        const response = await courseApi.getStudent(this.listQuery.courseId)
        this.newlist = response.data
        this.listLoading = false
        this.total = response.data.length
      }
    },
    async getCourse () {
      const response = await courseApi.getList(this.listQuery1)
      this.options = response.data.records
      console.log('woo-hoo')
      console.log(this.options)
    },
    async search () {
      await this.fetchData()
      this.listLoading = true
      this.listQuery.page = 1
      this.list = this.newlist.filter(
        item =>
          item.studentId.includes(this.listQuery.studentId) &&
          item.name.includes(this.listQuery.name) &&
          item.college.includes(this.listQuery.college) &&
          item.grade.includes(this.listQuery.grade) &&
          item.major.includes(this.listQuery.major) &&
          item.classes.includes(this.listQuery.classes)
      )
      this.listLoading = false
    },
    reset () {
      this.listQuery.studentId = ''
      this.listQuery.name = ''
      this.listQuery.college = ''
      this.listQuery.grade = ''
      this.listQuery.major = ''
      this.listQuery.classes = ''
      this.listQuery.page = 1
      this.fetchData()
      this.list = this.newlist
    },
    fetchNext () {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev () {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage (page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize (limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.selRow = currentRow
    }
  }
})
