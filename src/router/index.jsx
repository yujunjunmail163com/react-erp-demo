import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

function AuthRoute({ children }) {
  // React 中常用“组件包裹”的方式做路由守卫：先判断登录态，再决定渲染页面还是跳转。
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppRouter() {
  return (
    <Routes>
      {/* 访问根路径时默认进入后台页，后台页会自己判断是否已登录。 */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }
      />
      {/* 没匹配到的路径统一回到后台首页，保持 Demo 路由简单。 */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default AppRouter
