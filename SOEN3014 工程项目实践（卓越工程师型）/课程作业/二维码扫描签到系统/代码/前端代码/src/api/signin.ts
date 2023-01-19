import request from '@/utils/request'


export function signInfo(courseId: string, day: string, lesson: string, qrCreateTime: string, qrCreator: string, studentId: string, week: string) {
  return request({
    url: '/signIn',
    method: 'post',
    data: {
      courseId: courseId,
      day: day,
      lesson: lesson,
      qrCreateTime: qrCreateTime,
      qrCreator: qrCreator,
      studentId: studentId,
      week: week
    }
  })
}

type SignInStatusResponse = {
  data: boolean
}

export function getSignInStatus(state: string) {
  return request<unknown, SignInStatusResponse>({
    url: '/signinStatus',
    method: 'get',
    params: {
      state
    }
  })
}

export interface UserInfo {
  errcode: number
  errmsg: string
  userid: string
  name: string
  gender: 0 | 1 | 2
  avatar: string
  qr_code: string
  mobile: string
  email: string
  biz_email: string
  address: string
}
export interface CourseInfo {
  courseId: number
  createTime: string
  id: string
  location: string
  modifyTime: string
  name: string
}
export function getSignedInUser(state: string) {
  return request<unknown, { data: UserInfo }>({
    url: '/signedInUser',
    method: 'get',
    params: {
      state
    }
  })
}
export function getStuCourse(stuId: string) {
  return request({
    url: '/student/' + stuId + '/course',
    method: 'get',
    params: {
      stuId
    }
  })
}
export function getCourseTime(courseId: string) {
  return request({
    url: '/getTimeByCourseId',
    method: 'get',
    params: {
      courseId
    }
  })
}
export function signInCount(courseId: string) {
  return request({
    url: '/signInCount',
    method: 'get',
    params: {
      courseId
    }
  })
}
export function getTodayCourse(id) {
  return request({
    url: '/coursesToday',
    method: 'get',
    params: {
      studentId: id
    }
  })
}
export function getTodayCourseTec(date) {
  return request({
    url: '/coursesToday',
    method: 'get',
    params: {
        date:date
    }
  })
}

export function getNumofStu(courseId) {
  return request({
    url: '/course/'+courseId+'/student',
    method: 'get',
    params: {
      courseId:courseId
    }
  })
}
