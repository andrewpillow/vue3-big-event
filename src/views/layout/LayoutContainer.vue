<script setup>
import {
  Management,
  UserFilled,
  User,
  Promotion,
  Crop,
  EditPen,
  CaretBottom,
  SwitchButton
} from '@element-plus/icons-vue'
</script>

<template>
  <el-container class="common-layout">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>

          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基础资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 右侧主区域 -->
    <el-container>
      <el-header>
        <div>
          黑马程序员：<strong>{{ '用户名' }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar src="@/assets/BackPicForLogin.jpeg" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="resetPassword" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>大事件 ©2026 Practiced by AndrewCc</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .el-aside {
    background-color: #232323;
  }
}
.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown__box {
    display: flex;
    align-items: center;

    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}
</style>
