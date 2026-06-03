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
import UserModal from '../components/UserModal'

const { Title } = Typography

// 阶段四、五先用本地数组模拟接口数据；阶段六再迁移到 api/user.js。
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    name: '系统管理员',
    role: '管理员',
    status: '启用',
  },
  {
    id: 2,
    username: 'tom',
    name: 'Tom',
    role: '普通用户',
    status: '启用',
  },
  {
    id: 3,
    username: 'jerry',
    name: 'Jerry',
    role: '运营',
    status: '停用',
  },
]

function UserList() {
  const [form] = Form.useForm() // 表单实例
  const [userList, setUserList] = useState([]) // 用户列表数据
  const [searchKeyword, setSearchKeyword] = useState('') // 搜索关键词
  const [modalOpen, setModalOpen] = useState(false) // 弹窗是否打开
  const [currentUser, setCurrentUser] = useState(null) // 当前用户数据

  // 组件挂载后，模拟接口异步返回用户列表数据
  useEffect(() => {
    // 空依赖数组表示只在组件首次挂载后执行一次，类似 Vue 的 onMounted。
    // 这里用 setTimeout 模拟接口异步返回，阶段六会替换成真正的 api 调用。
    const timer = setTimeout(() => {
      setUserList(mockUsers)
    }, 0)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // 筛选用户列表
  const displayUserList = searchKeyword
    ? userList.filter((user) =>
        user.username.toLowerCase().includes(searchKeyword.toLowerCase()),
      )
    : userList

  // 搜索用户
  const handleSearch = ({ username }) => {
    setSearchKeyword(username?.trim() || '')
  }

  // 重置搜索
  const handleReset = () => {
    form.resetFields()
    setSearchKeyword('')
  }

  // 新增用户
  const handleAdd = () => {
    // currentUser 为 null 表示新增模式。
    setCurrentUser(null)
    setModalOpen(true)
  }

  // 编辑用户
  const handleEdit = (record) => {
    // currentUser 有值表示编辑模式，子组件会根据它做表单回显。
    setCurrentUser(record)
    setModalOpen(true)
  }

  // 关闭弹窗
  const handleCancelModal = () => {
    setModalOpen(false)
    setCurrentUser(null)
  }

  // 保存用户
  const handleSaveUser = (values) => {
    if (currentUser) {
      // 编辑：用 map 生成新数组，只替换命中的那一项。
      setUserList((prevList) =>
        prevList.map((user) =>
          user.id === currentUser.id ? { ...user, ...values } : user,
        ),
      )
      message.success('编辑成功')
    } else {
      // 新增：用展开运算符生成新数组，不要直接 push 原数组。
      setUserList((prevList) => [
        ...prevList,
        {
          id: Date.now(),
          ...values,
        },
      ])
      message.success('新增成功')
    }

    handleCancelModal()
  }

  // 删除用户
  const handleDelete = (id) => {
    // 删除：filter 会返回新数组，符合 React state 不可变更新的要求。
    setUserList((prevList) => prevList.filter((user) => user.id !== id))
    message.success('删除成功')
  }

  // 表格列配置
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

      {/* 表格组件 */}
      <Table
        // rowKey 告诉 AntD Table 每一行的唯一标识，相当于 React 列表里的 key。
        rowKey="id"
        columns={columns}
        dataSource={displayUserList}
        pagination={false}
      />

      {/* 弹窗组件：新增/编辑用户 */}
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
