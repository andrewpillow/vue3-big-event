import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfoService } from '@/api/user'

//用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'user-info',
  () => {
    // token对象
    const token = ref('')
    // 存入token方法
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 清除token方法
    const removeToken = () => {
      token.value = ''
    }

    // userInfo对象
    const userInformation = ref({})
    // 获取userinfo并存入pinia方法
    const getUserInfo = async () => {
      const res = await userInfoService()
      userInformation.value = res.data
      console.log(userInformation.value)
    }
    return {
      token,
      setToken,
      removeToken,
      userInformation,
      getUserInfo
    }
  },
  {
    persist: true
  }
)
