import signinrecordApi from '@/api/signinrecord/signinrecord'
import { getList } from '@/api/system/notice'
import { getSignInRateForStudentInAllCourse, getSignInRateForAllCourseInTeacher } from '@/api/user'
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'
import elementResizeDetectorMaker from 'element-resize-detector'
import logApi from '@/api/system/log'

export default {
  name: 'dashboard',
  components: {
    chart: ECharts
  },
  data() {
    return {
      SignInRateForAllCourseInTeacher: [],
      personalSignInRecord: [],
      SignInRateForStudentInAllCourse: [],
      signinCourse: [],
      signinrate: [],
      signinCourseAndTimes: [],
      user: {},
      notice: [],
      lineData: {
        title: {
          text: "课程签到率(Example)",
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: "6%",
          data: [
            "数据结构",
            "算法",
            "离散数学",
            "软件测试与质量保证",
            "计算机网络"
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            this.$t('common.week.mon'),
            this.$t('common.week.tue'),
            this.$t('common.week.wed'),
            this.$t('common.week.thu'),
            this.$t('common.week.fri'),
            this.$t('common.week.sat'),
            this.$t('common.week.sun')
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: "数据结构",
            type: 'line',

            data: [40, 87, 83, 84, 91, 23, 51]
          },
          {
            name: "算法",
            type: 'line',

            data: [72, 61, 93, 74, 92, 0, 41]
          },
          {
            name: "离散数学",
            type: 'line',

            data: [79, 71, 93, 94, 94, 0, 61]
          },
          {
            name: "软件测试与质量保证",
            type: 'line',

            data: [78, 81, 93, 98, 95, 21, 81]
          },
          {
            name: "计算机网络",
            type: 'line',

            data: [89, 91, 93, 74, 96, 0, 88]
          }
        ]
      },
      barData: {
        title: {
          text: "课程签到率统计(%)",
          x: 'center'
        },
        xAxis: {
          type: 'value',
          max: 'dataMax',
          data: []
        },

        yAxis: {
          inverse: true,
          // max:5,
          type: 'category',
          axisLabel: {
            //格式化
            formatter: function (params) {
              let val = "";
              //判断长度
              if (params.length > 4) {
                //替换原字符
                val = params.substr(0, 4) + '...';
                //返回
                return val;
              } else {
                //否则返回原string
                return params;
              }
            }
          }
        },

        series: [
          {
            realtimeSort: true,
            data: [],
            type: 'bar',
            barCategoryGap: '50%',
            label: {
              show: true,
              position: 'right',
            }
          }
        ]
      },


      pieData: {
        title: {
          text: "签到次数统计",
          x: 'center'
        },
        legend: {
          top: "6%",

        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: 'from',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{ value: 1, name: "ss" }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },


      tableData: [
      ]
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.fetchData()
  },
  mounted() {
    //绑定echart图表跟随窗口大小自动缩放
    let that = this
    let erd = elementResizeDetectorMaker()
    erd.listenTo(document.getElementById('dashboard'), element => {
      that.$nextTick(() => {
        that.$refs.lineChart.resize()
        that.$refs.barChart.resize()
        that.$refs.pieChart.resize()
      })
    })
    this.init();
  },
  methods: {
    init() {


      this.user = this.$store.state.user.profile
      this.user.roles = this.user.roles[0]
      if (this.user.roles == "学生") {
        this.user.roles = "同学"
      }
      if (this.user.roles == "教师") {
        this.user.roles = "老师"
      }
      if (this.user.account.length == 10) {
        this.barData.title.text = "你的签到率统计(%)"
        getSignInRateForStudentInAllCourse(this.user.account).then(response => {
          console.log(response)
          this.SignInRateForStudentInAllCourse = response.data
          let len = response.data.length
          for (const element of response.data) {
            this.signinCourse.push(element["courseName"])
            this.signinrate.push((element["details"]["rate"] * 100).toFixed(2))

          }
          for (let i = 0; i < len; i++) {
            this.signinCourseAndTimes[i] = { value: response.data[i]["details"]["signedIn"], name: response.data[i]["courseName"] }
          }
          this.barData.series[0].data = this.signinrate
          this.barData.yAxis.data = this.signinCourse
          this.pieData.series[0].data = this.signinCourseAndTimes
          console.log(this.pieData.series[0].data)
        })

        signinrecordApi.studentRecord(this.user.account).then(
          response => {
            for (const item of response.data) {
              this.personalSignInRecord.push({ name: item["studentName"], course: item["courseName"], date: item["signInTime"] })
            }
          }
        )
        console.log(this.personalSignInRecord)
        this.tableData = this.personalSignInRecord
      }



      else {
        getSignInRateForAllCourseInTeacher(this.user.account).then(response => {
          console.log(response)
          this.SignInRateForAllCourseInTeacher = response.data
          let len = response.data.length
          for (const element of response.data) {
            this.signinCourse.push(element["courseName"])
            this.signinrate.push((element["rate"] * 100).toFixed(2))

          }
          for (let i = 0; i < len; i++) {
            this.signinCourseAndTimes[i] = { value: response.data[i]["signedIn"], name: response.data[i]["courseName"] }
          }
          this.barData.series[0].data = this.signinrate
          this.barData.yAxis.data = this.signinCourse
          this.pieData.series[0].data = this.signinCourseAndTimes
          console.log(this.pieData.series[0].data)
        })
      }


      this.queryByUser()






    },
    queryByUser() {
      logApi
        .queryByUser()
        .then(response => {
          console.log(response)
          this.activities = response.data
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    fetchData() {
      this.listLoading = true
      const self = this
      getList(self.listQuery).then(response => {
        for (const notice of response.data) {
          self.$notify({
            title: notice.title,
            message: notice.content,
            duration: 3000
          })
        }
        self.listLoading = false
      })
    }
  }
}
