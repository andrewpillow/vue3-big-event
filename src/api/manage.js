import request from '@/utils/request.js'

export const manageInfoService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}
