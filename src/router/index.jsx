import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

// AuthRoute 是一个简单的“路由守卫组件”。
// React Router 没有 Vue Router beforeEach 那种固定写法，常用组件包裹来控制是否渲染页面。
function AuthRoute({ children }) {
  // React 中常用“组件包裹”的方式做路由守卫：先判断登录态，再决定渲染页面还是跳转。
  const token = localStorage.getItem('token')

  if (!token) {
    // replace 表示替换当前历史记录，避免用户点浏览器返回又回到受保护页面。
    return <Navigate to="/login" replace />
  }

  // children 就是被 AuthRoute 包起来的页面组件，比如 <Home />。
  return children
}

function AppRouter() {
  return (
    <Routes>
      {/* 访问根路径时默认进入后台页，后台页会自己判断是否已登录。 */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 登录页不需要权限校验。 */}
      <Route path="/login" element={<Login />} />

      {/* 后台页需要先经过 AuthRoute 判断 token。 */}
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
