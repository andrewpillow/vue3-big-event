<script setup>
import { Lock, User } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores/user'
import router from '@/router/index'
import { ref } from 'vue'
import { watch } from 'vue'
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 绑定form的ref对象
// 点击注册 开始预校验 校验通过后发送注册请求
const form = ref()
const register = async () => {
  await form.value.validate()
  const res = await userRegisterService(formModel.value)
  if (res.code === 0) {
    ElMessage.success('注册成功')
  }
}

//点击登录 开始预校验 校验通过发送请求 若返回登录成功信息 将token存入pinia 并完成本地持久化操作 完成后跳转到首页
const userStore = useUserStore()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  console.log(res)
  if (res.code === 0) {
    userStore.setToken(res.token)
    ElMessage.success('登录成功')
    router.push('/')
  }
}

// 自定义 repassword校验
const checkpassword = (rule, value, callback) => {
  if (formModel.value.password !== value) {
    callback(new Error('两次输入不一致'))
  } else {
    callback()
  }
}

// rules 校验规则配置
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 5, max: 10, message: '用户名长度支持5-10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度支持6-15 不包含空格',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度支持6-15 不包含空格',
      trigger: 'blur'
    },
    {
      validator: checkpassword
    }
  ]
}

// 登录注册切换旗帜
const isLoginFlag = ref(true)

// 登录/注册切换重置表单数据
watch(isLoginFlag, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <!--
  el-row将1行划分为24份
  (1):span="" 在一行所占份数
  (2):offset="" 一行中 左margin份数

  el-form 整个表单组件
  el-form-item 表单中一行（一个表单域）
  el-input 表单元素（输入、复选 ...）
-->

  <el-row class="login-page">
    <!-- 左侧背景图片 -->

    <el-col :span="12" class="bg"></el-col>
    <!-- 登录注册界面 -->

    <el-col :span="6" :offset="3" class="form">
      <!-- 登录组件 -->

      <el-form
        ref="form"
        size="large"
        v-if="isLoginFlag"
        :model="formModel"
        :rules="rules"
      >
        <el-form-item>
          <h2>登录</h2>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            :prefix-icon="User"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            show-password
            :prefix-icon="Lock"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" underline="never">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" underline="never" @click="isLoginFlag = false"
            >注册 →</el-link
          >
        </el-form-item>
      </el-form>

      <!-- 注册组件 -->
      <el-form ref="form" size="large" v-else :model="formModel" :rules="rules">
        <el-form-item>
          <h2>注册</h2>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            :prefix-icon="User"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            show-password
            :prefix-icon="Lock"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            placeholder="请再次输入密码"
            type="password"
            show-password
            :prefix-icon="Lock"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" underline="never" @click="isLoginFlag = true"
            >←返回</el-link
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  /* 确保页面占满浏览器整屏高度 */
  height: 100vh;
  .bg {
    background: url('@/assets/BackPicForLogin.jpeg') no-repeat center center;
    background-size: cover; //等比缩放覆盖整个el-col区域
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
