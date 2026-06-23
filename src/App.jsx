import './App.css'
import AppRouter from './router/index.jsx'

function App() {
  // App 是应用根组件，类似 Vue 项目里的 App.vue。
  // 当前项目把页面切换逻辑放到 router/index.jsx，所以这里保持简单。
  return <AppRouter />
}

export default App
