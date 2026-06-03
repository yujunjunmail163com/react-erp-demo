import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

function Login() {
  const navigate = useNavigate()

  const handleFinish = (values) => {
    localStorage.setItem('token', 'mock-token')
    localStorage.setItem('username', values.username)
    message.success('登录成功')
    navigate('/home')
  }

  return (
    <main className="login-page">
      <Card className="login-card">
        <Title level={3}>React ERP Demo</Title>
        <Text type="secondary">请输入账号密码登录后台</Text>

        <Form
          className="login-form"
          initialValues={{ username: 'admin', password: '123456' }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form>
      </Card>
    </main>
  )
}

export default Login
