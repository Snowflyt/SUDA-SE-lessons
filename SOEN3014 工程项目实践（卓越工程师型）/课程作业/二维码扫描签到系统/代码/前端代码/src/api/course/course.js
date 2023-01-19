import request from '@/utils/request'

export default {
  getList(params) {
    return request({
      url: '/courses',
      method: 'get',
      params
    })
  },
  save: function (params) {
    return request({
      url: '/course',
      method: 'post',
      data: params
    })
  },
  remove: function (id) {
    return request({
      url: '/course/' + id,
      method: 'delete',
      params: {
        id: id
      }
    })
  },
  getStudent(courseId) {
    return request({
      url: '/course/' + courseId + '/student',
      method: 'get',
      params: {
        courseId: courseId
      }
    })
  },

  addStudnet(studentId, courseId, selectTime) {
    return request({
      url: '/course/' + courseId + '/stu_mtm_cour',
      method: 'post',
      params: {
        studentId: studentId,
        courseId: courseId,
        selectTime: selectTime
      }
    })
  },
  getTeacher(courseId) {
    return request({
      url: '/course/teachers',
      method: 'get',
      params: {
        courseId: courseId
      }
    })
  },
  getsign(courseId) {
    return request({
      url: '/course/' + courseId + 'signInRecord',
      method: 'get',
      params: {
        courseId: courseId
      }
    })
  },
}
