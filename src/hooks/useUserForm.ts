import { reactive, ref } from 'vue'
import { createUser, updateUser } from '../api/user'
import { useLoading } from './useLoading'
import type { User, UserForm, FormErrors } from '../types'

const DEFAULT_FORM: UserForm = {
  name: '',
  email: '',
  role: 'viewer',
  status: 1,
}

// 校验规则
function validate(form: UserForm): FormErrors<UserForm> {
  const errors: FormErrors<UserForm> = {}
  if (!form.name.trim()) {
    errors.name = '姓名不能为空'
  } else if (form.name.length > 20) {
    errors.name = '姓名不能超过20个字符'
  }
  if (!form.email.trim()) {
    errors.email = '邮箱不能为空'
  } else if (!/^[\w.-]+@[\w-]+\.\w{2,}$/.test(form.email)) {
    errors.email = '邮箱格式不正确'
  }
  return errors
}

export function useUserForm(onSuccess: () => void) {
  const visible = ref(false)
  const editingId = ref<number | null>(null)
  const form = reactive<UserForm>({ ...DEFAULT_FORM })
  const errors = reactive<FormErrors<UserForm>>({})
  const { loading, withLoading } = useLoading()

  function open(user?: User) {
    // 编辑模式：回填数据；新增模式：重置表单
    if (user) {
      editingId.value = user.id
      Object.assign(form, { name: user.name, email: user.email, role: user.role, status: user.status })
    } else {
      editingId.value = null
      Object.assign(form, DEFAULT_FORM)
    }
    Object.keys(errors).forEach(k => delete (errors as Record<string, unknown>)[k])
    visible.value = true
  }

  function close() {
    visible.value = false
  }

  async function submit() {
    // 先清空再校验
    Object.keys(errors).forEach(k => delete (errors as Record<string, unknown>)[k])
    const result = validate(form)
    if (Object.keys(result).length > 0) {
      Object.assign(errors, result)
      return
    }

    await withLoading(() =>
      editingId.value !== null
        ? updateUser(editingId.value, { ...form })
        : createUser({ ...form })
    )

    close()
    onSuccess()
  }

  return { visible, editingId, form, errors, loading, open, close, submit }
}
