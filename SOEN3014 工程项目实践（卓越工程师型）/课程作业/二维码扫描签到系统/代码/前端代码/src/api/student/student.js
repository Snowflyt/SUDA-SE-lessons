import request from '@/utils/request'

export default {
  getList: function (params) {
    return request({
      url: '/students',
      method: 'get',
      params
    })
  },
  save: function (params) {
    return request({
      url: '/student',
      method: 'post',
      data: params
    })
  },
  remove: function (id) {
    return request({
      url: '/student/' + id,
      method: 'delete',
      params: {
        id: id
      }
    })
  },
  getCourse: function (studentId) {
    return request({
      url: '/student/' + studentId + '/course',
      method: 'get',
      params: {
        studentId: studentId
      }
    })
  },
  addCourse: function (studentId, courseId, selectTime) {
    return request({
      url: '/student/' + studentId + '/stu_mtm_cour',
      method: 'post',
      params: {
        studentId: studentId,
        courseId: courseId,
        selectTime: selectTime
      }
    })
  }
}
