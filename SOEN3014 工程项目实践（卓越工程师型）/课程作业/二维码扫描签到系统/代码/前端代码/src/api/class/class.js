import request from '@/utils/request'

export default {
  getList () {
    return request({
      url: '/classrooms',
      method: 'get'
    })
  }
}
