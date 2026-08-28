<script setup>
import { articleInfoService, articleDelService } from '@/api/article'
import { ref } from 'vue'
import DialogBox from './components/DialogBox.vue'

// 获取文章列表信息
const articleInfo = ref([])
const loading = ref(false)

const getArticleInfo = async () => {
  loading.value = true
  const res = await articleInfoService()
  articleInfo.value = res.data
  loading.value = false
}
getArticleInfo()

// 按钮功能
const dialog = ref()

// 添加分类
const handleAdd = () => {
  dialog.value.open({})
}
// 编辑分类
const handleEdit = (row) => {
  dialog.value.open(row)
}
// 删除分类
const handleDel = async (row) => {
  await ElMessageBox.confirm('确定删除？', '删除提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await articleDelService(row.id)
  ElMessage.success('删除成功')
  getArticleInfo()
}
</script>

<template>
  <page-container title="文章分类">
    <!-- 右侧按钮 -->
    <template #btn>
      <el-button type="primary" @click="handleAdd()">添加分类</el-button>
    </template>

    <!-- 主内容 -->
    <template #default>
      <el-table
        v-if="articleInfo.length > 0"
        :data="articleInfo"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="index" width="100" label="序号" />
        <el-table-column property="cate_name" label="分类名字" />
        <el-table-column property="cate_alias" label="分类别名" />
        <el-table-column label="操作" width="190">
          <template #default="{ row }">
            <el-button @click="handleEdit(row)">编辑</el-button>
            <el-button @click="handleDel(row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else description="无数据" />
    </template>
  </page-container>
  <DialogBox ref="dialog" @refresh="getArticleInfo"></DialogBox>
</template>

<style scoped lang="scss"></style>
