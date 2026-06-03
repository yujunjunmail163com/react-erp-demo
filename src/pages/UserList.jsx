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

const { Title } = Typography

// 阶段四先用本地数组模拟接口数据；阶段六再迁移到 api/user.js。
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
  const [form] = Form.useForm()
  const [userList, setUserList] = useState([])

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

  const handleSearch = ({ username }) => {
    const keyword = username?.trim()

    if (!keyword) {
      setUserList(mockUsers)
      return
    }

    // filter 会返回一个新数组，符合 React state 不可变更新的要求。
    const nextList = mockUsers.filter((user) =>
      user.username.toLowerCase().includes(keyword.toLowerCase()),
    )

    setUserList(nextList)
  }

  const handleReset = () => {
    form.resetFields()
    setUserList(mockUsers)
  }

  const handleDelete = (id) => {
    // 不要直接 userList.splice(...)，而是生成新数组再 setState。
    setUserList(userList.filter((user) => user.id !== id))
    message.success('删除成功')
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
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
          <Button type="link">编辑</Button>
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
        <Button type="primary" icon={<PlusOutlined />}>
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
        pagination={false}
      />
    </Card>
  )
}

export default UserList
