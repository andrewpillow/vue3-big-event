<script setup>
import { ref } from 'vue'
import { manageInfoService } from '@/api/manage'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { articlePubService, articleDetailService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'

// 筛选条件
const articleInfo = ref([])
const params = ref({
  pagenum: 1,
  pagesize: 10,
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

// 筛选按钮
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

// 分页栏
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

// 侧边栏 - 文章编辑及发布
const title = ref('')
const defaultInfo = {
  title: '',
  content: '',
  cate_id: '',
  cover_img: '',
  state: ''
}
const detailInfo = ref({ ...defaultInfo })

// 转换为formdata格式
const formData = new FormData()
const convertToFormData = (value) => {
  for (let key in value) {
    formData.append(key, value[key])
  }
  return formData
}

// 侧边弹窗控制
const drawer = ref(false)
const editor = ref()
const openDrawer = async (row) => {
  if (row.id) {
    title.value = '编辑文章'
    const res = await articleDetailService(row.id)
    detailInfo.value = res.data
    imageUrl.value = baseURL + res.data.cover_img
  } else {
    title.value = '发布文章'
    detailInfo.value = { ...defaultInfo }
    imageUrl.value = ''
    editor.value?.setHTML('')
  }
  drawer.value = true
}

// 图片上传
const imageUrl = ref('')
const updatePic = (value) => {
  imageUrl.value = URL.createObjectURL(value.raw)
  detailInfo.value.cover_img = value.raw
}

//图片url转file对象
const urlToFile = async (url, fileName) => {
  const response = await fetch(url)
  const blob = await response.blob()
  const mimeType = blob.type || 'image/jpeg'
  detailInfo.value.cover_img = new File([blob], fileName, { type: mimeType })
}
// 发布及编辑文章功能
const onSubmit = async (value) => {
  if (value === 'add') {
    // 若为发布按钮执行if内容 若为草稿 执行else内容
    detailInfo.value.state = '已发布'
  } else {
    detailInfo.value.state = '草稿'
  }

  if (title.value === '发布文章') {
    await convertToFormData(detailInfo.value)
    await articlePubService(formData)
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
    ElMessage.success('发布成功')
  } else {
    await urlToFile(imageUrl.value, detailInfo.value.cover_img)
    await convertToFormData(detailInfo.value)

    ElMessage.success('编辑已保存')
  }
  getInfo()
  drawer.value = false
}
</script>

<template>
  <page-container title="文章管理">
    <!-- 右侧按钮 -->
    <template #btn>
      <el-button type="primary" @click="openDrawer({})">发布文章</el-button>
    </template>
    <template #default>
      <!-- inline // 按行排列 -->
      <el-form inline>
        <!-- 分类搜索 -->
        <channel-select v-model="params.cate_id" width="200px"></channel-select>

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
        :cell-style="{ padding: '15px 0' }"
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
            <el-button @click="openDrawer(row)">编辑</el-button>
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
        style="margin: 10px; justify-content: flex-end"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </template>
  </page-container>

  <!-- 编辑添加的侧边弹窗 -->
  <el-drawer v-model="drawer" :title="title" direction="rtl" size="50%">
    <el-form style="margin: 0 20px">
      <el-form-item label="文章标题：">
        <el-input
          placeholder="请输入标题"
          v-model="detailInfo.title"
        ></el-input>
      </el-form-item>
      <channel-select
        v-model="detailInfo.cate_id"
        width="100%"
      ></channel-select>
      <el-form-item label="文章封面：">
        <el-upload
          class="avatar-uploader"
          auto-upload:false
          :show-file-list="false"
          :on-change="updatePic"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容：" style="margin-bottom: 10px">
        <QuillEditor
          theme="snow"
          v-model:content="detailInfo.content"
          contentType="html"
          ref="editor"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('add')">{{
          title === '发布文章' ? '发布' : '确认'
        }}</el-button>
        <el-button @click="onSubmit">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
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
  width: 178px;
  height: 178px;
  text-align: center;
}

/* 富文本集成格式 */
.ql-toolbar.ql-snow {
  width: 100%;
}
.ql-container.ql-snow {
  width: 100%;
  height: 200px;
}
</style>
