<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { userUpdateAvatarService } from '@/api/user'
const userStore = useUserStore()
const { user_pic } = userStore.userInformation

const imageUrl = ref('')
const newPic = ref('')
imageUrl.value = user_pic

const updatePic = (file) => {
  const rawFile = file.raw || file
  if (!rawFile) return

  const reader = new FileReader()
  reader.readAsDataURL(rawFile)
  reader.onload = () => {
    const base64 = reader.result
    newPic.value = base64
    imageUrl.value = base64
  }
}
const uploadRef = ref(null)
const handleClick = () => {
  uploadRef.value.$el.querySelector('input[type=file]').click()
}

const handleUpload = async () => {
  if (!newPic.value) {
    ElMessage.warning('请先选择图片')
    return
  }
  const res = await userUpdateAvatarService({ avatar: newPic.value })
  if (res.code === 0) {
    ElMessage.success('头像上传成功')
    userStore.getUserInfo()
  } else {
    ElMessage.error('头像上传失败')
  }
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="updatePic"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleClick">选择图片</el-button>
      <el-button type="success" @click="handleUpload">上传头像</el-button>
    </div>
  </page-container>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  text-align: center;
}
</style>
