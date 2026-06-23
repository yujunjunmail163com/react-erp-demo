# React 和 Vue 后台管理开发对比总结

> 基于当前 `react-erp-demo` 项目整理。目标不是背概念，而是把 Vue 后台经验迁移到 React 后台开发，并形成面试表达。

## 1. 组件写法

Vue 常见写法是单文件组件：

```vue
<template>
  <div>页面结构</div>
</template>

<script setup>
const title = '用户管理'
</script>
```

React 当前项目使用函数组件：

```jsx
function UserList() {
  return <div>用户管理</div>
}
```

核心区别：

- Vue 更偏模板、指令、响应式声明。
- React 更偏 JavaScript 函数、JSX、状态驱动 UI。
- React 组件本质是函数，函数返回 JSX 描述页面。

面试表达：

> Vue 单文件组件把模板、脚本、样式组织在一起，React 函数组件更强调用 JavaScript 函数描述 UI。通过这个项目，我理解了 React 组件就是函数，组件内部通过 Hooks 管理状态和副作用，最后返回 JSX。

## 2. 状态管理

Vue3 中常见：

```js
const userList = ref([])
userList.value = data
```

React 中对应：

```jsx
const [userList, setUserList] = useState([])
setUserList(data)
```

当前项目场景：

- `Login.jsx`：登录表单提交后保存 token。
- `UserList.jsx`：`userList`、`loading`、`modalOpen`、`currentUser` 都是组件状态。
- `UserModal.jsx`：AntD Form 管理弹窗表单内部状态。

面试表达：

> Vue 依赖响应式系统追踪数据变化，React 更明确地通过 `useState` 和 `setState` 更新状态。React 中状态更新后会触发组件重新渲染，页面由 state 驱动。

## 3. 表单绑定

Vue 常见写法：

```vue
<el-input v-model="username" />
```

React 受控组件写法：

```jsx
<Input
  value={username}
  onChange={(event) => setUsername(event.target.value)}
/>
```

当前项目中，Ant Design Form 简化了表单收集：

```jsx
<Form onFinish={handleSearch}>
  <Form.Item name="username" label="用户名">
    <Input />
  </Form.Item>
</Form>
```

面试表达：

> Vue 的 `v-model` 帮我们封装了值和事件，React 中更常见的是 `value + onChange` 的受控组件写法。在 Ant Design Form 场景下，表单值由 Form 管理，提交时通过 `onFinish` 一次性拿到 values。

## 4. 生命周期 / 副作用

Vue 中：

```js
onMounted(() => {
  fetchUserList()
})
```

React 中：

```jsx
useEffect(() => {
  fetchUserList()
}, [])
```

当前项目场景：

- `UserList.jsx` 中首次加载用户列表。
- `UserModal.jsx` 中监听 `open` 和 `currentUser`，做新增清空和编辑回显。

面试表达：

> Vue 有明确的生命周期 API，例如 `onMounted`。React 的 `useEffect` 更通用，可以模拟挂载，也可以监听依赖变化，还可以返回清理函数。空依赖数组 `[]` 通常用于组件首次挂载后执行一次。

## 5. 路由

Vue Router 常见：

```js
router.beforeEach((to, from, next) => {
  next()
})
```

React Router 当前项目：

```jsx
function AuthRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

核心区别：

- Vue Router 更常用全局守卫。
- React Router 更常用组件包裹方式做权限判断。
- React 中路由配置的 `element` 本身就是组件。

面试表达：

> Vue Router 常用 `beforeEach` 做全局路由守卫，React Router 更组件化。这个项目里我封装了 `AuthRoute`，通过判断 token 决定渲染后台页面还是返回 `<Navigate />` 跳登录页。

## 6. 组件通信

Vue 中：

```vue
<UserModal
  :current-user="currentUser"
  @success="handleSaveUser"
/>
```

React 中：

```jsx
<UserModal
  currentUser={currentUser}
  onSuccess={handleSaveUser}
/>
```

当前项目场景：

- `UserList` 是父组件，管理列表和弹窗状态。
- `UserModal` 是子组件，负责弹窗表单。
- 子组件保存时调用 `onSuccess(values)` 通知父组件。

面试表达：

> Vue 子传父常用 `emit`，React 子传父是父组件把回调函数通过 props 传给子组件，子组件调用回调函数。二者思想类似，都是子组件通知父组件处理业务状态。

## 7. 列表渲染

Vue 中：

```vue
<tr v-for="item in userList" :key="item.id">
  {{ item.username }}
</tr>
```

React 中：

```jsx
userList.map((item) => (
  <div key={item.id}>{item.username}</div>
))
```

当前项目使用 Ant Design Table：

```jsx
<Table rowKey="id" dataSource={userList} />
```

面试表达：

> React 列表需要稳定的 `key`，帮助 diff 判断元素身份。Ant Design Table 通过 `rowKey` 指定每一行的唯一标识。本项目使用 `rowKey="id"`，避免用 index 带来的状态错位问题。

## 8. 状态更新方式

Vue 中数组更新通常可以直接操作响应式数据，但也推荐清晰地生成新数据：

```js
userList.value = userList.value.filter((item) => item.id !== id)
```

React 中必须更强调不可变更新：

```jsx
setUserList((prevList) =>
  prevList.filter((item) => item.id !== id)
)
```

当前项目场景：

- 新增用户：API mock 层用 `[...mockUserList, newUser]`
- 编辑用户：用 `map`
- 删除用户：用 `filter`

面试表达：

> React state 更新要保持不可变性，不能直接 `push`、`splice` 或修改对象属性。因为 React 需要通过新引用判断状态变化。新增用展开运算符，编辑用 `map`，删除用 `filter`。

## 9. UI 组件库使用

Vue 后台常用 Element UI / Element Plus：

```vue
<el-form>
<el-table>
<el-dialog>
```

React 后台当前项目使用 Ant Design：

```jsx
<Form>
<Table>
<Modal>
```

对应关系：

| Vue / Element | React / Ant Design | 当前项目场景 |
|---|---|---|
| `el-form` | `Form` | 登录、查询、用户弹窗 |
| `el-input` | `Input` | 登录、查询、用户弹窗 |
| `el-table` | `Table` | 用户列表 |
| `el-dialog` | `Modal` | 新增/编辑用户 |
| `el-popconfirm` | `Popconfirm` | 删除确认 |
| `el-menu` | `Menu` | 左侧菜单 |
| `el-container` | `Layout` | 后台布局 |

面试表达：

> Ant Design 和 Element UI 的后台开发思路非常接近，核心还是表单、表格、弹窗、菜单、布局。差异主要在 React JSX 写法和组件 API 上，业务组织思路可以迁移。

## 10. 接口封装

Vue 项目常见：

```js
// api/user.js
export function getUserList(params) {
  return request.get('/users', { params })
}
```

React 当前项目：

```js
export function getUserList(params) {
  return mockRequest(() => {
    // 模拟接口逻辑
  })
}
```

组件中调用：

```jsx
const data = await getUserList(params)
setUserList(data)
```

面试表达：

> React 和 Vue 的 Axios 封装思路基本一致，都是 `utils/request.js` 统一封装请求实例，`api/user.js` 按业务模块封装接口。区别是 Vue 项目有时会把请求挂到全局实例，React 更常见的是直接 import API 方法。

## 11. 性能优化

当前项目中：

- `React.memo(UserModal)` 缓存子组件。
- `useCallback` 缓存传给子组件的函数引用。
- `useMemo` 缓存 `Table columns`。

一句话区分：

```txt
React.memo 缓存组件
useMemo 缓存计算结果
useCallback 缓存函数引用
```

面试表达：

> React 函数组件每次渲染都会重新执行函数体，所以对象、数组、函数都可能产生新引用。在真实场景中，可以用 `useMemo` 缓存计算结果，用 `useCallback` 缓存函数引用，用 `React.memo` 减少子组件无意义渲染。但这些优化不应该滥用，要看场景和收益。

## 12. Vue 经验如何迁移到 React 后台项目

可以迁移的能力：

- 后台业务拆分能力
- 表单、表格、弹窗开发经验
- 权限和登录态理解
- Axios 封装和接口分层
- 组件抽象能力
- 列表查询、新增、编辑、删除闭环
- UI 组件库使用经验

需要切换的心智：

- 从模板指令切到 JSX
- 从 Vue 响应式切到 React state 快照
- 从 `emit` 切到回调函数 props
- 从 Vue Router 全局守卫切到 React 组件化守卫
- 从自动响应式依赖切到 Hooks 依赖数组

## 13. 面试综合回答

可以这样说：

> 我之前主栈是 Vue2 / Vue3 + Element UI，React 是最近重点补充的方向。为了快速熟悉 React 后台开发，我用 React + Hooks + React Router + Ant Design 做了一个 ERP 后台 Demo，实现了登录、路由守卫、后台 Layout、用户列表、查询、新增、编辑、删除、Axios 封装等功能。
>
> 通过这个项目，我把 React 中的函数组件、`useState`、`useEffect`、受控组件、父子组件通信、列表 `key`、不可变更新、React Router、`useMemo`、`useCallback`、`React.memo` 都放到了真实后台场景里理解。我的感受是，Vue 和 React 在语法和框架心智上不同，Vue 更偏模板和响应式系统，React 更偏函数组件、JSX 和 state 驱动 UI。但在企业后台项目中，表单、表格、弹窗、权限、接口封装、业务拆分这些经验是可以迁移的。
>
> 所以从 Vue 切到 React，对我来说主要是语法和生态切换，后台业务开发方法论是相通的。
