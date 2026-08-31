<script setup>
import { zhCn } from 'element-plus/es/locales.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
