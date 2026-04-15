// 用户实体
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 0 | 1
  createdAt: string
}

// 新增/编辑表单（不含服务端生成字段）
export type UserForm = Omit<User, 'id' | 'createdAt'>

// 表单校验错误映射
export type FormErrors<T> = Partial<Record<keyof T, string>>

// 通用响应结构
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 分页参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应
export interface PaginationResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
