<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { id, username, nickname, email } = userStore.userInformation
import { userUpdateService } from '@/api/user'

const userProfileInfo = ref({
  id,
  username,
  nickname,
  email
})
const originalUserProfileInfo = { ...userProfileInfo.value }
const loading = ref(false)

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: ['blur', 'change'] },
    {
      pattern: /^\S{2,10}$/,
      message: '用户昵称需为2-10位非空字符',
      trigger: ['blur', 'change']
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: ['blur', 'change'] },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
}
const formRef = ref('')
const submitUpdate = async () => {
  await formRef.value.validate()
  const isUnchanged = Object.keys(originalUserProfileInfo).every(
    (key) => userProfileInfo.value[key] === originalUserProfileInfo[key]
  )
  if (isUnchanged) {
    ElMessage.warning('请修改后提交')
    return
  }

  loading.value = true
  const res = await userUpdateService(userProfileInfo.value)
  console.log(res)
  userStore.getUserInfo()
  Object.assign(originalUserProfileInfo, userProfileInfo.value)
  loading.value = false
  ElMessage.success('用户信息修改成功')
}
</script>

<template>
  <page-container title="基础资料">
    <!-- 用户档案内容 -->
    <el-form
      :model="userProfileInfo"
      :rules="rules"
      label-width="100px"
      v-loading="loading"
      ref="formRef"
    >
      <el-form-item label="登录名称">
        <el-input
          v-model="userProfileInfo.username"
          disabled
          size="large"
          style="width: 45%"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="userProfileInfo.nickname"
          size="large"
          style="width: 45%"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input
          v-model="userProfileInfo.email"
          size="large"
          style="width: 45%"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      style="margin-left: 100px"
      size="large"
      @click="submitUpdate"
      >提交修改</el-button
    >
  </page-container>
</template>
