import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createUser,
  deleteUser,
  getUserList,
  updateUser,
} from '../api/user'
import UserModal from '../components/UserModal'

const { Title } = Typography

function UserList() {
  // AntD Form 实例，用来读取表单值、重置表单。
  const [form] = Form.useForm()

  // 表格数据。React 中数据变化后必须通过 setUserList 通知组件重新渲染。
  const [userList, setUserList] = useState([])

  // 表格加载状态，和业务数据分开维护，方便控制 Table 的 loading。
  const [loading, setLoading] = useState(false)

  // 控制新增/编辑弹窗是否显示。
  const [modalOpen, setModalOpen] = useState(false)

  // 当前正在编辑的用户；为 null 时表示新增模式。
  const [currentUser, setCurrentUser] = useState(null)

  // 组件首次挂载后加载用户列表。空依赖数组 [] 表示只执行一次。
  useEffect(() => {
    let ignore = false

    async function loadInitialUsers() {
      setLoading(true)

      try {
        // 页面初始化时调用用户列表接口，类似 Vue 的 onMounted 里请求列表。
        const data = await getUserList()

        if (!ignore) {
          setUserList(data)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadInitialUsers()

    return () => {
      // 如果请求还没回来组件就卸载了，避免继续 setState。
      // 这是处理异步请求时常见的防护写法。
      ignore = true
    }
  }, [])

  // useCallback 缓存函数引用，方便其他回调稳定依赖它。
  const fetchUserList = useCallback(async (params = form.getFieldsValue()) => {
    setLoading(true)

    try {
      // 页面组件只调用 api 方法，不关心接口内部是 axios 还是真实 mock。
      const data = await getUserList(params)
      setUserList(data)
    } finally {
      setLoading(false)
    }
  }, [form])

  // 查询表单提交后，用表单值作为接口查询参数。
  const handleSearch = useCallback((values) => {
    fetchUserList(values)
  }, [fetchUserList])

  // 重置表单后重新请求完整列表。
  const handleReset = useCallback(() => {
    form.resetFields()
    fetchUserList({})
  }, [fetchUserList, form])

  // 打开新增弹窗。
  const handleAdd = useCallback(() => {
    // currentUser 为 null 表示新增模式。
    setCurrentUser(null)
    setModalOpen(true)
  }, [])

  // 打开编辑弹窗，并把当前行数据交给弹窗回显。
  const handleEdit = useCallback((record) => {
    // currentUser 有值表示编辑模式，子组件会根据它做表单回显。
    setCurrentUser(record)
    setModalOpen(true)
  }, [])

  // 这个函数会传给 memo 后的 UserModal，稳定引用可以减少无意义渲染。
  const handleCancelModal = useCallback(() => {
    setModalOpen(false)
    setCurrentUser(null)
  }, [])

  // 弹窗保存：根据 currentUser 判断是新增还是编辑。
  const handleSaveUser = useCallback(async (values) => {
    if (currentUser) {
      await updateUser(currentUser.id, values)
      message.success('编辑成功')
    } else {
      await createUser(values)
      message.success('新增成功')
    }

    handleCancelModal()
    // 新增/编辑后重新拉取列表，保持页面数据和接口数据源一致。
    fetchUserList()
  }, [currentUser, fetchUserList, handleCancelModal])

  // 删除后重新请求列表，保持页面状态和接口数据源一致。
  const handleDelete = useCallback(async (id) => {
    await deleteUser(id)
    message.success('删除成功')
    // 删除后重新拉取当前查询条件下的列表。
    fetchUserList()
  }, [fetchUserList])

  // columns 是对象数组；用 useMemo 避免父组件每次渲染都创建新 columns 引用。
  const columns = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '状态',
      dataIndex: 'status',
      // render 用来自定义单元格渲染，这里把状态显示成 Tag。
      render: (status) => (
        <Tag color={status === '启用' ? 'green' : 'default'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      // record 是当前行完整数据，点击编辑时传给弹窗。
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除该用户吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ], [handleDelete, handleEdit])

  return (
    <Card>
      <div className="user-list-header">
        <Title level={3}>用户管理</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增用户
        </Button>
      </div>

      <Form
        form={form}
        className="user-search-form"
        layout="inline"
        // onFinish 是 AntD Form 校验通过后的提交回调。
        onFinish={handleSearch}
      >
        <Form.Item name="username" label="用户名">
          <Input placeholder="请输入用户名" allowClear />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        // rowKey 告诉 AntD Table 每一行的唯一标识，相当于 React 列表里的 key。
        rowKey="id"
        columns={columns}
        dataSource={userList}
        loading={loading}
        pagination={false}
      />

      <UserModal
        // 父组件控制弹窗开关和当前编辑数据，子组件通过回调通知父组件。
        open={modalOpen}
        currentUser={currentUser}
        onCancel={handleCancelModal}
        onSuccess={handleSaveUser}
      />
    </Card>
  )
}

export default UserList
