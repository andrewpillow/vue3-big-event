<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="标题测试" width="500">
    <span>测试文本</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
