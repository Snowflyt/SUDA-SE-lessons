import request from '@/utils/request'

export default {
  studentRecord(student, date, week) {
    return request({
      url: '/signInRecordForStudent/' + student,
      method: 'get',
      params: {
        student: student,
        date: date,
        week: week
      }
    })
  },
  courseRecord(course, date) {
    return request({
      url: '/signInRecordForCourse/' + course + '/' + date,
      method: 'get',
      params: {
        course: course,
        date: date
      }
    })
  },
  remove: function (recordId) {
    return request({
      url: '/deleteSignInRecord',
      method: 'delete',
      params: {
        recordId: recordId
      }
    })
  },
  sign(studentId, courseId, date, operator) {
    return request({
      url: '/manualSignIn',
      method: 'post',
      params: {
        studentId: studentId,
        courseId: courseId,
        date: date,
        operator: operator,
      }
    })
  },
  info() {
    return request({
      url: '/account/info',
      method: 'get',
    })
  },
  coursesToday(date) {
    return request({
      url: '/coursesToday',
      method: 'get',
      params: {
        date: date
      },
    })
  },
  getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
}
