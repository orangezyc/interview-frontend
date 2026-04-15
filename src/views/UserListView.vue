<template>
  <div class="page">
    <div class="page-header">
      <h2>用户管理</h2>
      <button class="btn primary" @click="formHook.open()">+ 新增用户</button>
    </div>

    <!-- 表格 -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="listHook.loading.value && listHook.list.value.length === 0">
            <td colspan="7" class="center">加载中...</td>
          </tr>
          <tr v-else-if="listHook.list.value.length === 0">
            <td colspan="7" class="center">暂无数据</td>
          </tr>
          <tr v-for="user in listHook.list.value" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td><span :class="['tag', user.role]">{{ roleLabel[user.role] }}</span></td>
            <td><span :class="['status', user.status === 1 ? 'on' : 'off']">{{ user.status === 1 ? '启用' : '禁用' }}</span></td>
            <td>{{ user.createdAt }}</td>
            <td class="actions">
              <button class="link" @click="formHook.open(user)">编辑</button>
              <button class="link danger" :disabled="listHook.loading.value" @click="listHook.handleDelete(user.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <span class="total">共 {{ listHook.total.value }} 条</span>
      <button
        v-for="p in totalPages"
        :key="p"
        :class="['page-btn', { active: p === listHook.pagination.page }]"
        @click="listHook.handlePageChange(p)"
      >{{ p }}</button>
    </div>

    <!-- 表单弹窗 -->
    <UserFormModal
      v-model="formHook.visible.value"
      :is-edit="formHook.editingId.value !== null"
      :form="formHook.form"
      :errors="formHook.errors"
      :loading="formHook.loading.value"
      @submit="formHook.submit()"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import UserFormModal from '../components/UserFormModal.vue'
import { useUserList } from '../hooks/useUserList'
import { useUserForm } from '../hooks/useUserForm'

const roleLabel: Record<string, string> = { admin: '管理员', editor: '编辑', viewer: '访客' }

const listHook = useUserList()
const formHook = useUserForm(() => listHook.loadList())

const totalPages = computed(() =>
  Math.ceil(listHook.total.value / listHook.pagination.pageSize)
)

onMounted(() => listHook.loadList())
</script>

<style scoped>
.page { max-width: 1000px; margin: 32px auto; padding: 0 16px; font-size: 14px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-header h2 { margin: 0; font-size: 20px; }
.table-wrap { border: 1px solid #f0f0f0; border-radius: 6px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
th { background: #fafafa; font-weight: 600; color: #666; }
th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #f0f0f0; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: #fafff4; }
.center { text-align: center; color: #999; padding: 32px; }
.tag { padding: 2px 8px; border-radius: 10px; font-size: 12px; }
.tag.admin { background: #fff1f0; color: #cf1322; }
.tag.editor { background: #e6f7ff; color: #0958d9; }
.tag.viewer { background: #f6ffed; color: #389e0d; }
.status { padding: 2px 8px; border-radius: 10px; font-size: 12px; }
.status.on { background: #f6ffed; color: #389e0d; }
.status.off { background: #f5f5f5; color: #999; }
.actions { display: flex; gap: 12px; }
.link { background: none; border: none; cursor: pointer; color: #4f6ef7; font-size: 13px; padding: 0; }
.link:hover { text-decoration: underline; }
.link.danger { color: #ff4d4f; }
.link:disabled { opacity: 0.4; cursor: not-allowed; }
.pagination { display: flex; align-items: center; gap: 6px; margin-top: 16px; justify-content: flex-end; }
.total { color: #888; margin-right: 8px; }
.page-btn { padding: 5px 10px; border: 1px solid #d9d9d9; background: #fff; border-radius: 4px; cursor: pointer; }
.page-btn:hover { border-color: #4f6ef7; color: #4f6ef7; }
.page-btn.active { background: #4f6ef7; color: #fff; border-color: #4f6ef7; }
.btn { padding: 7px 16px; border-radius: 4px; border: 1px solid #d9d9d9; background: #fff; cursor: pointer; font-size: 14px; }
.btn.primary { background: #4f6ef7; color: #fff; border-color: #4f6ef7; }
.btn.primary:hover { background: #3d5ce0; }
</style>
