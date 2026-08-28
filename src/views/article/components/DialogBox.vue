<script setup>
import { ref } from 'vue'
import { articleAddService, articleUpdateService } from '@/api/article'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)

// 根据row传来的内容 决定删除/编辑/添加
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
  console.log(formModel.value)
}

defineExpose({
  open
})

// 表单部分
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入内容', trigger: ['blur', 'change'] },
    {
      pattern: /^\S{1,5}$/,
      message: '不能超过5个字符 不能包含空格',
      trigger: ['blur', 'change']
    }
  ],
  cate_alias: [
    { required: true, message: '请输入内容', trigger: ['blur', 'change'] },
    {
      pattern: /^[a-z0-9]{1,10}$/i,
      message: '不能超过10个字符 只支持数字字母 不能包含空格',
      trigger: ['blur', 'change']
    }
  ]
}

// articleAddService
const form = ref()
const emit = defineEmits(['refresh'])
const submitRequest = async () => {
  // 表单校验
  await form.value.validate()
  if (formModel.value.id) {
    await articleUpdateService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await articleAddService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('refresh')
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form :model="formModel" :rules="rules" width="50" ref="form">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类标题" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRequest()"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
