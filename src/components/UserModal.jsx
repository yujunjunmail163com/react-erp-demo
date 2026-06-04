import { Form, Input, Modal, Select } from 'antd'
import { memo, useEffect } from 'react'


/**
 * 
 * open：是否开启弹窗
 * currentUser：当前用户数据
 * onCancel：取消回调
 * onSuccess：保存回调
 * 
 */
function UserModal({ open, currentUser, onCancel, onSuccess }) {
  const [form] = Form.useForm()
  const isEdit = Boolean(currentUser)

  // 组件挂载后，初始化弹窗数据
  useEffect(() => {
    if (!open) {
      return
    }

    if (currentUser) {
      // 编辑模式：把父组件传入的当前行数据回显到表单中。
      form.setFieldsValue(currentUser)
    } else {
      // 新增模式：打开弹窗时清空旧表单值，避免残留上一次编辑的数据。
      form.resetFields()
    }
  }, [open, currentUser, form])

  // 表单提交
  const handleFinish = (values) => {
    // 子组件不直接修改父组件列表，而是把表单结果交给父组件处理。
    onSuccess(values)
  }

  return (
    <Modal
      title={isEdit ? '编辑用户' : '新增用户'}
      open={open}
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          label="角色"
          name="role"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select
            placeholder="请选择角色"
            options={[
              { label: '管理员', value: '管理员' },
              { label: '普通用户', value: '普通用户' },
              { label: '运营', value: '运营' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="状态"
          name="status"
          rules={[{ required: true, message: '请选择状态' }]}
        >
          <Select
            placeholder="请选择状态"
            options={[
              { label: '启用', value: '启用' },
              { label: '停用', value: '停用' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

// memo 会在 props 没有变化时跳过子组件重复渲染，常和 useCallback 配合使用。
export default memo(UserModal)
