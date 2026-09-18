<script setup>
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores/user'
import router from '@/router'
const userStore = useUserStore()

const updateInfo = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const defaultInfo = { ...updateInfo.value }
// 重置表单
const handleReset = () => {
  updateInfo.value = { ...defaultInfo }
}

// 修改密码
const form = ref(null)
const handleChange = async () => {
  await form.value.validate()
  const res = await userUpdatePasswordService(updateInfo.value)
  if (res.code === 0) {
    ElMessage.success('密码修改成功')
    //修改成功后 清除登录数据 并跳转至登录页面
    userStore.removeToken()
    userStore.removeUserInfo()
    router.push('/login')
  } else {
    ElMessage.error('密码修改失败')
  }
}

const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: ['blur', 'change'] },
    {
      pattern: /^\S{6,15}$/,
      message: '原密码需为6-15位非空格字符',
      trigger: ['blur', 'change']
    }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: ['blur', 'change'] },
    {
      pattern: /^\S{6,15}$/,
      message: '新密码需为6-15位非空格字符',
      trigger: ['blur', 'change']
    }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: ['blur', 'change'] },
    {
      pattern: /^\S{6,15}$/,
      message: '确认密码需为6-15位非空格字符',
      trigger: ['blur', 'change']
    },
    {
      validator: (_, value, callback) => {
        if (value !== updateInfo.value.new_pwd) {
          callback(new Error('两次输入的新密码不一致'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ]
}
</script>

<template>
  <page-container title="修改密码">
    <el-form
      ref="form"
      label-width="100px"
      style="width: 400px"
      :model="updateInfo"
      :rules="rules"
    >
      <el-form-item label="原密码" prop="old_pwd" size="large">
        <el-input
          type="password"
          placeholder="请输入原密码"
          v-model="updateInfo.old_pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd" size="large">
        <el-input
          type="password"
          placeholder="请输入新密码"
          v-model="updateInfo.new_pwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd" size="large">
        <el-input
          type="password"
          placeholder="请再次输入新密码"
          v-model="updateInfo.re_pwd"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="handleChange"
          >修改密码</el-button
        >
        <el-button size="large" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
