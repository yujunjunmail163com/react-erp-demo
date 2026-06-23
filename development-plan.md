# React ERP Demo 功能需求开发计划

> 来源：`REACT_ERP_DEMO_GUIDE.md`  
> 当前约定：阶段一、阶段二默认已完成。  
> 使用方式：每完成一个任务，将 `[ ]` 改为 `[x]`。

## 总体目标

使用 `Vite + React + JavaScript + Ant Design + React Router + Axios + localStorage + 本地 mock 数据` 完成一个最小闭环后台管理 Demo，并同步沉淀 React 高频面试点。

## 阶段一：初始化 Vite + React 项目

状态：已完成

- [x] 使用 Vite 创建 React + JavaScript 项目
- [x] 安装项目基础依赖：`react`、`react-dom`、`vite`
- [x] 安装业务依赖：`antd`、`@ant-design/icons`、`react-router-dom`、`axios`
- [x] 清理 Vite 默认示例代码
- [x] 在 `main.jsx` 中引入 Ant Design reset 样式
- [x] 保留一个简单的 `App.jsx` 页面用于验证 React 和 Ant Design 生效
- [x] 理解 `main.jsx` 的作用
- [x] 理解 `App.jsx` 的作用
- [x] 理解 React 项目入口和 Vue 项目入口的区别

## 阶段二：登录页

状态：已完成

- [x] 创建 `pages/Login.jsx`
- [x] 使用 Ant Design `Form`
- [x] 使用 Ant Design `Input`
- [x] 使用 Ant Design `Button`
- [x] 使用 Ant Design `message`
- [x] 实现账号输入
- [x] 实现密码输入
- [x] 账号密码固定为 `admin / 123456`
- [x] 登录成功后写入 `localStorage` token
- [x] 登录成功后跳转到 `/home`
- [x] 登录页居中展示登录框
- [x] 理解 `useState`
- [x] 理解受控组件
- [x] 理解 Ant Design 表单提交 `onFinish`
- [x] 理解 `useNavigate` 页面跳转
- [x] 对比 Vue 表单绑定和 React 受控组件

## 阶段三：React Router 和后台 Layout

状态：已完成

- [x] 创建 `router/index.jsx`
- [x] 配置 `/login` 路由
- [x] 配置 `/home` 路由
- [x] 创建或完善 `pages/Home.jsx`
- [x] 使用 Ant Design `Layout` 实现后台整体布局
- [x] 实现左侧菜单区域
- [x] 左侧菜单先放一个“用户管理”
- [x] 实现顶部栏区域
- [x] 实现内容区区域
- [x] 实现未登录访问 `/home` 时跳转到 `/login`
- [x] 实现登录后默认进入 `/home`
- [x] 实现退出登录并清除 token
- [x] 理解 `BrowserRouter`
- [x] 理解 `Routes`
- [x] 理解 `Route`
- [x] 理解 `Navigate`
- [x] 理解 React Router 路由守卫思路
- [x] 对比 React Router 和 Vue Router 的区别

## 阶段四：用户列表页

状态：已完成

- [x] 创建 `pages/UserList.jsx`
- [x] 在 `Home.jsx` 内容区展示 `UserList`
- [x] 使用本地数组模拟用户数据
- [x] 页面加载时初始化用户列表数据
- [x] 使用 Ant Design `Table` 展示用户列表
- [x] 为 `Table` 设置 `rowKey`
- [x] 使用 Ant Design `Form` 实现查询区域
- [x] 使用 Ant Design `Input` 实现用户名查询
- [x] 使用 Ant Design `Button` 实现查询按钮
- [x] 支持按用户名筛选用户列表
- [x] 每一行展示编辑按钮
- [x] 每一行展示删除按钮
- [x] 使用 Ant Design `Popconfirm` 做删除确认
- [x] 支持删除用户
- [x] 理解 `useEffect`
- [x] 理解列表渲染中的 `key`
- [x] 理解 `Table rowKey`
- [x] 理解为什么 React state 更新不能直接修改原数组

## 阶段五：新增 / 编辑用户弹窗

状态：已完成

- [x] 创建 `components/UserModal.jsx`
- [x] 在 `UserList` 中控制弹窗打开和关闭
- [x] 点击新增时打开空表单
- [x] 点击编辑时打开弹窗并回显当前行数据
- [x] 使用 Ant Design `Modal`
- [x] 使用 Ant Design `Form`
- [x] 实现新增用户保存
- [x] 实现编辑用户保存
- [x] 保存后更新用户列表
- [x] 子组件通过 `onCancel` 通知父组件关闭弹窗
- [x] 子组件通过 `onSuccess` 通知父组件保存数据
- [x] 理解组件拆分
- [x] 理解 props 父传子
- [x] 理解回调函数子传父
- [x] 理解父子组件通信
- [x] 理解 Ant Design Form 表单回显

## 阶段六：Axios 请求封装

状态：已完成

- [x] 创建 `utils/request.js`
- [x] 创建 `api/user.js`
- [x] 封装 Axios 实例
- [x] 配置请求基础参数
- [x] 在请求拦截器中自动携带 token
- [x] 在响应拦截器中统一处理响应数据
- [x] 在响应拦截器中统一处理错误
- [x] 使用 `Promise + setTimeout` 模拟用户列表接口
- [x] 使用 `Promise + setTimeout` 模拟新增用户接口
- [x] 使用 `Promise + setTimeout` 模拟编辑用户接口
- [x] 使用 `Promise + setTimeout` 模拟删除用户接口
- [x] 将 `UserList` 中的本地操作迁移为调用 `api/user.js`
- [x] 理解 Axios 封装在 React 项目中的组织方式
- [x] 对比 Axios 封装在 React 和 Vue 项目中的相同点
- [x] 对比 Axios 封装在 React 和 Vue 项目中的不同点

## 阶段七：补充 useMemo / useCallback / React.memo

状态：已完成

- [x] 找到用户列表中的真实优化场景
- [x] 使用 `useMemo` 缓存 `Table columns`
- [x] 评估过滤列表缓存场景：当前查询已迁移到 API 层，暂不额外使用
- [x] 使用 `useCallback` 缓存传给子组件的事件函数
- [x] 使用 `React.memo` 包装合适的子组件
- [x] 验证优化不影响现有功能
- [x] 理解 `React.memo` 的作用
- [x] 理解 `useMemo` 的作用
- [x] 理解 `useCallback` 的作用
- [x] 理解三者的区别：组件、计算结果、函数引用
- [x] 整理面试中如何回答性能优化 Hooks

## 阶段八：React 和 Vue 对比总结

状态：已完成

- [x] 总结组件写法差异
- [x] 总结状态管理差异
- [x] 总结表单绑定差异
- [x] 总结生命周期 / 副作用差异
- [x] 总结路由使用差异
- [x] 总结组件通信差异
- [x] 总结列表渲染差异
- [x] 总结 state 更新方式差异
- [x] 总结 UI 组件库使用差异
- [x] 总结 Vue 经验如何迁移到 React 后台项目
- [x] 整理成面试可表达的话术

## 阶段九：最终面试复盘

状态：待开始

- [ ] 基于项目列出 React 高频面试题
- [ ] 为每个问题整理简洁回答
- [ ] 将回答和项目实际场景关联起来
- [ ] 整理 1 分钟自我介绍中的 React 表达
- [ ] 整理“主栈 Vue，但如何快速上手 React 项目”的回答
- [ ] 复盘登录、路由、Layout、用户列表、查询、新增、编辑、删除、Axios 封装涉及的知识点
- [ ] 整理最终面试清单

## 关键验收标准

- [x] 项目能够启动
- [x] 已完成登录页
- [x] 登录后能够进入后台 Layout
- [x] 未登录访问后台页面会回到登录页
- [x] 用户列表能够展示
- [x] 用户列表能够查询
- [x] 用户能够新增
- [x] 用户能够编辑
- [x] 用户能够删除
- [x] Axios 封装完成
- [x] 所有核心 React 面试点都有项目场景支撑

## 面试点映射清单

- [x] 函数组件：`App`、`Login`、`Home`
- [x] `useState`：登录表单、输入状态
- [x] `useEffect`：用户列表初始化
- [x] 受控组件：登录输入框
- [x] 组件通信：`UserList` 和 `UserModal`
- [x] key / rowKey：用户表格
- [x] state 不可变更新：新增、编辑、删除用户
- [x] React Router：登录后跳转
- [x] 路由访问控制：token 判断
- [x] Axios 封装：`utils/request.js` 和 `api/user.js`
- [x] `useMemo`：缓存表格列或过滤结果
- [x] `useCallback`：缓存事件函数
- [x] `React.memo`：减少子组件无意义渲染
- [x] React 和 Vue 对比表达
