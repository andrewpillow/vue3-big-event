<script setup>
import { articleInfoService } from '@/api/article'
import { ref } from 'vue'

// 文章分类信息
const selectInfo = ref()
;(async () => {
  const res = await articleInfoService()
  selectInfo.value = res.data
})()

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-form-item label="文章分类：">
    <el-select
      style="width: 200px"
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <el-option
        v-for="item in selectInfo"
        :key="item.id"
        :label="item.cate_name"
        :value="item.id"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
