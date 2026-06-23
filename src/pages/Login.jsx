import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

function Login() {
  // useNavigate 类似 Vue Router 的 router.push，用于在函数组件里做页面跳转。
  const navigate = useNavigate()

  const handleFinish = (values) => {
    // onFinish 只会在 AntD Form 校验通过后触发，values 是表单收集到的数据。
    // 当前 Demo 用 mock-token 模拟登录态，真实项目这里会调用登录接口。
    localStorage.setItem('token', 'mock-token')
    localStorage.setItem('username', values.username)
    message.success('登录成功')

    // 登录成功后进入后台页。
    navigate('/home')
  }

  return (
    <main className="login-page">
      <Card className="login-card">
        <Title level={3}>React ERP Demo</Title>
        <Text type="secondary">请输入账号密码登录后台</Text>

        <Form
          className="login-form"
          // initialValues 是 AntD Form 的初始值，方便开发阶段快速登录。
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
