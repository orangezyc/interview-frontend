<template>
  <div v-if="modelValue" class="modal-mask" @click.self="$emit('update:modelValue', false)">
    <div class="modal">
      <div class="modal-header">
        <span>{{ isEdit ? '编辑用户' : '新增用户' }}</span>
        <button class="close-btn" @click="$emit('update:modelValue', false)">✕</button>
      </div>

      <div class="modal-body">
        <div class="form-item">
          <label>姓名 <span class="required">*</span></label>
          <div class="field">
            <input v-model="form.name" placeholder="请输入姓名" :class="{ error: errors.name }" />
            <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
          </div>
        </div>

        <div class="form-item">
          <label>邮箱 <span class="required">*</span></label>
          <div class="field">
            <input v-model="form.email" placeholder="请输入邮箱" :class="{ error: errors.email }" />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>
        </div>

        <div class="form-item">
          <label>角色</label>
          <div class="field">
            <select v-model="form.role">
              <option value="admin">管理员</option>
              <option value="editor">编辑</option>
              <option value="viewer">访客</option>
            </select>
          </div>
        </div>

        <div class="form-item">
          <label>状态</label>
          <div class="field">
            <label class="toggle">
              <input type="checkbox" :checked="form.status === 1" @change="form.status = ($event.target as HTMLInputElement).checked ? 1 : 0" />
              <span>{{ form.status === 1 ? '启用' : '禁用' }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn" @click="$emit('update:modelValue', false)">取消</button>
        <button class="btn primary" :disabled="loading" @click="$emit('submit')">
          {{ loading ? '提交中...' : '确认' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserForm, FormErrors } from '../types'

defineProps<{
  modelValue: boolean
  isEdit: boolean
  form: UserForm
  errors: FormErrors<UserForm>
  loading: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'submit': []
}>()
</script>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: #fff;
  border-radius: 8px;
  width: 460px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  font-weight: 600;
}
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #999;
  padding: 0 4px;
}
.close-btn:hover { color: #333; }
.modal-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.modal-footer {
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.form-item { display: flex; align-items: flex-start; gap: 12px; }
.form-item label { width: 60px; flex-shrink: 0; line-height: 34px; text-align: right; }
.form-item .field { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.form-item label { font-size: 13px; color: #555; }
.required { color: #f00; }
.form-item input,
.form-item select {
  padding: 8px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.form-item input:focus,
.form-item select:focus { border-color: #4f6ef7; }
.form-item input.error { border-color: #ff4d4f; }
.error-msg { font-size: 12px; color: #ff4d4f; }
.toggle { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.btn {
  padding: 7px 20px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
}
.btn:hover { border-color: #4f6ef7; color: #4f6ef7; }
.btn.primary { background: #4f6ef7; color: #fff; border-color: #4f6ef7; }
.btn.primary:hover { background: #3d5ce0; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
