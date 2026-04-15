import type { PaginationResult, User, UserForm } from '../types'

// mock 数据源
let mockStore: User[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: (['admin', 'editor', 'viewer'] as const)[i % 3],
  status: (i % 3 === 0 ? 0 : 1) as 0 | 1,
  createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}))
let nextId = mockStore.length + 1

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchUsers(page: number, pageSize: number): Promise<PaginationResult<User>> {
  await delay()
  const start = (page - 1) * pageSize
  return {
    list: mockStore.slice(start, start + pageSize),
    total: mockStore.length,
    page,
    pageSize,
  }
}

export async function createUser(form: UserForm): Promise<User> {
  await delay()
  const user: User = { ...form, id: nextId++, createdAt: new Date().toLocaleDateString() }
  mockStore.unshift(user)
  return user
}

export async function updateUser(id: number, form: UserForm): Promise<User> {
  await delay()
  const index = mockStore.findIndex(u => u.id === id)
  if (index === -1) throw new Error('用户不存在')
  mockStore[index] = { ...mockStore[index], ...form }
  return mockStore[index]
}

export async function deleteUser(id: number): Promise<void> {
  await delay()
  mockStore = mockStore.filter(u => u.id !== id)
}
