import request from '@/utils/request.js'

// 获取文章分类信息
export const articleInfoService = () => {
  return request.get('/my/cate/list')
}

// 添加分类信息
export const articleAddService = (data) => {
  return request.post('/my/cate/add', data)
}

// 更新分类信息
export const articleUpdateService = (data) => {
  return request.put('/my/cate/info', data)
}

// 删除分类信息
export const articleDelService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
