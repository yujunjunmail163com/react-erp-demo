import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.jsx'

// createRoot 会把 React 应用挂载到 index.html 里的 #root 节点上。
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter 提供路由上下文，组件里才能使用 Route、Navigate、useNavigate。 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
