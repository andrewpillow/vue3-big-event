<script setup>
import { ref } from 'vue'
import { manageInfoService } from '@/api/manage'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
const articleInfo = ref([])

// 筛选条件
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const total = ref()
const loading = ref(false)
const getInfo = async () => {
  loading.value = true
  const res = await manageInfoService(params.value)
  articleInfo.value = res.data
  total.value = res.total
  loading.value = false
}
getInfo()

//筛选按钮
const search = () => {
  params.value.pagenum = 1
  getInfo()
}
const reset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getInfo()
}

//分页栏
const handleSizeChange = (val) => {
  // val返回的是当前pagesize的值 Number类型
  params.value.pagenum = 1
  params.value.pagesize = val
  getInfo()
}
const handlePageChange = (val) => {
  params.value.pagenum = val
  getInfo()
}
</script>

<template>
  <page-container title="文章管理">
    <!-- 右侧按钮 -->
    <template #btn>
      <el-button type="primary">发布文章</el-button>
    </template>
    <template #default>
      <!-- inline // 按行排列 -->
      <el-form inline>
        <!-- 分类搜索 -->
        <channel-select v-model="params.cate_id"></channel-select>

        <el-form-item label="发布状态：">
          <el-select style="width: 200px" v-model="params.state">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 文章管理列表 -->
      <el-table
        v-if="articleInfo.length > 0"
        :data="articleInfo"
        v-loading="loading"
        style="margin: 20px 0"
      >
        <el-table-column width="350" property="title" label="文章标题">
          <template #default="{ row }">
            <el-link type="primary" underline="never"> {{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column property="cate_name" label="分类" />
        <el-table-column property="pub_date" label="发表时间">
          <template #default="{ row }">
            {{ new Date(row.pub_date).toLocaleString('zh-CN') }}
          </template>
        </el-table-column>
        <el-table-column property="state" label="状态" />
        <el-table-column label="操作" width="190">
          <template #default="{ row }">
            <el-button @click="handleEdit(row)">编辑</el-button>
            <el-button @click="handleDel(row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else description="无数据" />

      <!-- 底部分页栏 -->
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 4, 5, 10]"
        background
        layout="jumper,total, sizes, prev, pager, next "
        :total="total"
        style="margin: 20px; justify-content: flex-end"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </template>
  </page-container>
</template>
