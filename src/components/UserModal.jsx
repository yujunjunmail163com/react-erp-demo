import { Form, Input, Modal, Select } from 'antd'
import { memo, useEffect } from 'react'

/**
 * 用户新增/编辑弹窗。
 * open：是否显示弹窗，由父组件控制。
 * currentUser：当前编辑的用户；为 null 时表示新增。
 * onCancel：子组件通知父组件关闭弹窗。
 * onSuccess：子组件把表单数据交给父组件保存。
 */
function UserModal({ open, currentUser, onCancel, onSuccess }) {
  // AntD Form 实例，负责表单赋值、重置、提交。
  const [form] = Form.useForm()

  // 根据 currentUser 判断弹窗标题和表单行为。
  const isEdit = Boolean(currentUser)

  // 弹窗打开时，根据新增/编辑模式初始化表单数据。
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
    // 这就是 React 子传父的常见写法：调用父组件传进来的回调函数。
    onSuccess(values)
  }

  return (
    <Modal
      title={isEdit ? '编辑用户' : '新增用户'}
      open={open}
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      // Modal 的确定按钮不在 Form 内部，所以这里手动触发表单提交。
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
