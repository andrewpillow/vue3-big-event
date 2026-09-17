import request from '@/utils/request.js'

export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}

export const userInfoService = () => {
  return request.get('/my/userinfo')
}

//更新用户信息
export const userUpdateService = (data) => request.put('/my/userinfo', data)

// 更新用户头像
export const userUpdateAvatarService = (data) =>
  request.patch('/my/update/avatar', data)
