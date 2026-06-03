import { Button, Card, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "未登录用户";

  /**
   * 处理用户登出操作
   * 清除本地存储中的认证令牌和用户名，并导航至登录页面
   */
  const handleLogout = () => {
    // 清除本地存储中的认证信息
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <main className="home-page">
      <Card className="home-card">
        <Space direction="vertical" size="middle">
          <Title level={3}>后台首页</Title>
          <Paragraph>
            当前登录用户：<Text strong>{username}</Text>
          </Paragraph>
          <Button onClick={handleLogout}>退出登录</Button>
        </Space>
      </Card>
    </main>
  );
}

export default Home;