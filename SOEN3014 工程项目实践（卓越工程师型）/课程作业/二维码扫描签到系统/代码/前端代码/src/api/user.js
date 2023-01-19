import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/account/info',
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function updatePwd(params) {
  return request({
    url: '/account/updatePwd',
    method: 'post',
    data: qs.stringify(params)
  })
}

export function getQrcodeStatus(params) {
  return request({
    url: '/account/qrcode/getRet',
    method: 'get',
    params
  })
}
export function getSignInRateForStudentInAllCourse(studentId) {
  return request({
    url: '/signInRate/studentInAllCourse',
    method: 'get',
    params: {
      studentId: studentId
    }

  })

}

export function getSignInRateForAllCourseInTeacher(teacherId) {
  return request({
    url: '/signInRate/AllRateForTeacher',
    method: 'get',
    params: {
      teacherId: teacherId
    }

  })

}