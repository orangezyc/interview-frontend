import { ref, reactive } from 'vue'
import { fetchUsers, deleteUser } from '../api/user'
import { useLoading } from './useLoading'
import type { User } from '../types'

export function useUserList() {
  const list = ref<User[]>([])
  const total = ref(0)
  const pagination = reactive({ page: 1, pageSize: 10 })
  const { loading, withLoading } = useLoading()

  async function loadList() {
    const result = await withLoading(() => fetchUsers(pagination.page, pagination.pageSize))
    list.value = result.list
    total.value = result.total
  }

  async function handleDelete(id: number) {
    if (!confirm('确认删除该用户？')) return
    await withLoading(() => deleteUser(id))
    // 删除后若当前页已空则回到上一页
    const remaining = total.value - 1
    const maxPage = Math.ceil(remaining / pagination.pageSize) || 1
    if (pagination.page > maxPage) pagination.page = maxPage
    await loadList()
  }

  function handlePageChange(page: number) {
    pagination.page = page
    loadList()
  }

  return { list, total, pagination, loading, loadList, handleDelete, handlePageChange }
}
