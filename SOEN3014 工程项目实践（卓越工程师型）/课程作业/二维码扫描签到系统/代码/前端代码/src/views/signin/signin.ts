import Vue from 'vue'
import WwLogin from '@/components/WwLogin/index.vue'
import { UserInfo, getCourseTime, getStuCourse, signInfo, getTodayCourse, getNumofStu, getTodayCourseTec, signInCount } from '@/api/signin'
import { stringify } from 'querystring'
import { isInteger } from 'lodash'
export default Vue.extend({
  components: {
    WwLogin
  },

  data() {
    return {
      signInLessons: [],
      courseIds: {},
      pickedLesson: '',
      isSigning: false,
      signinPeriod: ["5分钟", "10分钟", "15分钟", "20分钟", "25分钟", "30分钟"],
      signinTime: '',
      countdownMinute: 0,
      countdownSecond: 0,
      countdownTimer: null as NodeJS.Timer | null,
      pickedLessonTime: { week: '', lesson: '', day: '' },
      numOfsigninStu: 0,
      sumOfStu: 0
    }
  },

  mounted() {
    this.getCourse()
    this.init()
  },
  destroyed() {

  },
  beforeDestroy() {
    if (this.isSigning) {
      localStorage.setItem("pickedLesson", this.pickedLesson)
      localStorage.setItem("isSigning", `${this.isSigning}`)
      localStorage.setItem("signinTime", this.signinTime)
      localStorage.setItem("leftminute", `${this.countdownMinute}`)
      localStorage.setItem("leftsecond", `${this.countdownSecond}`)
      localStorage.setItem("endtime", `${new Date().getTime()}`)
      localStorage.setItem("numOfSigninStu", `${this.numOfsigninStu}`)
      localStorage.setItem("sumOfStu", `${this.sumOfStu}`)
    }
  },
  methods: {
    init() {
      if (localStorage.length > 0) {
        console.log(localStorage)
        const now = new Date().getTime()
        const last = localStorage.getItem("endtime")!
        const past = now - parseInt(last)
        const pastSec = past / 1000
        const leftminute = parseInt(localStorage.getItem("leftminute")!)
        const leftsecond = parseInt(localStorage.getItem("leftsecond")!)
        if (leftminute * 60 + leftsecond > pastSec) {
          const seconds = leftminute * 60 + leftsecond - pastSec
          this.pickedLesson = localStorage.getItem("pickedLesson")!
          this.countdownMinute = Math.floor(seconds / 60)
          this.countdownSecond = Math.floor(seconds % 60)
          this.signinTime = localStorage.getItem("signinTime")!
          this.numOfsigninStu = parseInt(localStorage.getItem("numOfSigninStu")!)
          this.sumOfStu = parseInt(localStorage.getItem("sumOfStu")!)
          console.log(this)
        }
        else {
          localStorage.clear()
        }
      }
    },
    async getCourse() {
      let id = this.$store.state.user.profile.account

      const courses = (await getTodayCourse(id)).data

      for (const course of courses) {
        //@ts-ignore
        this.signInLessons.push(course.name + " " + course.time)
        this.courseIds[course.name + " " + course.time] = course.courseId
      }
    },
    async beginSign() {
      if (this.pickedLesson == '') {
        alert('未选择签到课程')
        return
      }
      if (this.signinTime == '') {
        alert('未选择签到时间')
        return
      }
      console.log(this.pickedLesson)
      //@ts-ignore
      console.log(this.courseIds)
      console.log(this.courseIds[this.pickedLesson])
      //@ts-ignore
      const time = await getCourseTime(this.courseIds[this.pickedLesson])
      //@ts-ignore
      this.sumOfStu = (await getNumofStu(this.courseIds[this.pickedLesson])).data.length

      console.log(time)
      this.pickedLessonTime.day = time.data.day
      this.pickedLessonTime.week = time.data.week
      this.pickedLessonTime.lesson = time.data.lesson
      const status = time.data.status
      if (status == -1) {
        alert("课程不在签到时间")
        return
      }
      console.log(this.pickedLessonTime)
      const count = (await signInCount(this.courseIds[this.pickedLesson])).data
      this.numOfsigninStu = count.signedIn
      if (this.countdownMinute == 0 && this.countdownSecond == 0) {
        this.countdownMinute = parseFloat(this.signinTime)
        this.countdownSecond = 0
      }
      this.isSigning = true
        this.countdownTimer = setInterval(() => {
          if (this.countdownSecond == 0) {
            if (this.countdownMinute == 0) {
              this.endSign()
            }
            this.countdownMinute--
            this.countdownSecond = 59
          }
          else {
            this.countdownSecond--
          }
        }, 1000)
    },

    endSign() {
      this.isSigning = false
      clearInterval(this.countdownTimer!)
      this.countdownMinute = 0
      this.countdownSecond = 0
      localStorage.clear()
    },

    async onSigned(userInfo: UserInfo) {
      //@ts-ignore
      const status = (await signInfo(this.courseIds[this.pickedLesson], this.pickedLessonTime.day, this.pickedLessonTime.lesson, " ", this.$store.state.user.profile.name, userInfo.userid, this.pickedLessonTime.week)).data.status
      if (status == 0) {
        this.numOfsigninStu++
      }
    }
  }
})
