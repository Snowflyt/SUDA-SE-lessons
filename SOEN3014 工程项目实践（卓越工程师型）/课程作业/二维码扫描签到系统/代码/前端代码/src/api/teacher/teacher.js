import request from '@/utils/request'

export default {
  getList: function (name) {
    return request({
      url: '/teacher/teacher-name',
      method: 'get',
      params:{
        name:name
      }
    })
  },
  save: function (params) {
    return request({
      url: '/teacher',
      method: 'post',
      data: params
    })
  },
  remove: function (teacherId) {
    return request({
      url: '/teacher/' + teacherId +'/del-teacher',
      method: 'delete',
      params: {
        teacherId: teacherId
      }
    })
  },
  findAll: function (teacherId) {
    return request({
      url: '/teacher/' + teacherId + '/courses',
      method: 'get',
      params: {
        teacherId: teacherId
      }
    })
  },
  addCourse: function (teacherId, courseId) {
    return request({
      url: '/teacher/course/' + teacherId + '/' + courseId,
      method: 'post',
      params: {
        teacherId: teacherId,
        courseId: courseId
      }
    })
  },
  deleteCourse: function (teacherId, deleteCourseId) {
    return request({
      url: '/teacher/' + teacherId + '/' + deleteCourseId,
      method: 'post',
      params: {
        teacherId: teacherId,
        deleteCourseId: courseId
      }
    })
  }

}
