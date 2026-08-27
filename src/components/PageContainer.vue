<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="header">
        <span style="font-size: 19px">{{ title }}</span>
        <slot name="btn"></slot>
      </div>
    </template>
    <!-- 默认插槽 用于页面主内容 -->
    <slot></slot>
  </el-card>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
