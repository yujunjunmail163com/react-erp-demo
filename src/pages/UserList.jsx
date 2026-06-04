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
import { useEffect, useState } from 'react'
import {
  createUser,
  deleteUser,
  getUserList,
  updateUser,
} from '../api/user'
import UserModal from '../components/UserModal'

const { Title } = Typography

function UserList() {
  const [form] = Form.useForm()
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

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
      ignore = true
    }
  }, [])

  const fetchUserList = async (params = form.getFieldsValue()) => {
    setLoading(true)

    try {
      const data = await getUserList(params)
      setUserList(data)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (values) => {
    fetchUserList(values)
  }

  const handleReset = () => {
    form.resetFields()
    fetchUserList({})
  }

  const handleAdd = () => {
    // currentUser 为 null 表示新增模式。
    setCurrentUser(null)
    setModalOpen(true)
  }

  const handleEdit = (record) => {
    // currentUser 有值表示编辑模式，子组件会根据它做表单回显。
    setCurrentUser(record)
    setModalOpen(true)
  }

  const handleCancelModal = () => {
    setModalOpen(false)
    setCurrentUser(null)
  }

  const handleSaveUser = async (values) => {
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
  }

  const handleDelete = async (id) => {
    await deleteUser(id)
    message.success('删除成功')
    // 删除后重新拉取当前查询条件下的列表。
    fetchUserList()
  }

  const columns = [
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
      render: (status) => (
        <Tag color={status === '启用' ? 'green' : 'default'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
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
  ]

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
        open={modalOpen}
        currentUser={currentUser}
        onCancel={handleCancelModal}
        onSuccess={handleSaveUser}
      />
    </Card>
  )
}

export default UserList
