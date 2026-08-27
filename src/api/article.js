import request from '@/utils/request.js'

export const articleInfoService = () => {
  return request.get('/my/cate/list')
}
