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

//发布文章
export const articlePubService = (data) => {
  return request.post('/my/article/add', data)
}

//获取文章详情
export const articleDetailService = (id) => {
  return request.get('/my/article/info', { params: { id } })
}
//更新
export const articleEditService = (data) => {
  return request.put('/my/article/info', data)
}

//删除
export const articleDeletService = (id) =>
  request.delete('/my/article/info', { params: { id } })
