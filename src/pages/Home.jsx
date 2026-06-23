import { LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import UserList from './UserList'

const { Header, Sider, Content } = Layout
const { Text } = Typography

function Home() {
  const navigate = useNavigate()
  // 顶部栏展示当前登录用户；真实项目通常来自用户信息接口或全局状态。
  const username = localStorage.getItem('username') || '未登录用户'

  const handleLogout = () => {
    // 退出登录时清理本地登录态，再用 replace 跳转，避免浏览器后退回到后台页。
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login', { replace: true })
  }

  return (
    <Layout className="admin-layout">
      {/* Sider 是 Ant Design Layout 的侧边栏区域。 */}
      <Sider className="admin-sider">
        <div className="admin-logo">React ERP</div>

        {/* 当前 Demo 只有一个菜单，后续多页面时可以根据菜单 key 切换路由。 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={['users']}
          items={[
            {
              key: 'users',
              icon: <TeamOutlined />,
              label: '用户管理',
            },
          ]}
        />
      </Sider>

      <Layout>
        {/* Header 是后台顶部栏，通常放用户信息、退出、消息、面包屑等。 */}
        <Header className="admin-header">
          <Space>
            <UserOutlined />
            <Text>当前用户：{username}</Text>
          </Space>

          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            退出登录
          </Button>
        </Header>

        {/* Content 是后台主内容区，用户列表等业务页面都放这里。 */}
        <Content className="admin-content">
          {/* 阶段四先固定展示用户列表；后续可扩展为多菜单、多路由内容区。 */}
          <UserList />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Home
