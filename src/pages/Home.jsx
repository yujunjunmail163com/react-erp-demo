import { LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Layout, Menu, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "未登录用户";

  const handleLogout = () => {
    // 退出登录时清理本地登录态，再用 replace 跳转，避免浏览器后退回到后台页。
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  return (
    <Layout className="admin-layout">
      <Sider className="admin-sider">
        <div className="admin-logo">React ERP</div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={["users"]}
          items={[
            {
              key: "users",
              icon: <TeamOutlined />,
              label: "用户管理",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="admin-header">
          <Space>
            <UserOutlined />
            <Text>当前用户：{username}</Text>
          </Space>

          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            退出登录
          </Button>
        </Header>

        <Content className="admin-content">
          <Card>
            <Title level={3}>后台首页</Title>
            <Paragraph>
              阶段三完成后，这里就是后台内容区。下一阶段会在这里接入用户列表。
            </Paragraph>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
