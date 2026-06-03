# React ERP Demo 学习与开发任务文档

> 项目名称：`react-erp-demo`  
> 目标：用一个最小闭环的 React + Ant Design 后台管理项目，帮助 Vue 开发者快速入门 React，并准备 React 面试。  
> 适用对象：已有 Vue2 / Vue3 + Element UI 后台系统经验，但 React 项目经验较少的前端开发者。  

---

## 0. 给 Codex 的角色设定

请将以下内容作为 Codex 的执行规则：

你现在是我的 **React 入门导师 + 项目开发助手**。

我的背景是：

- 8 年前端开发经验；
- 主栈是 Vue2 / Vue3 + Element UI；
- 做过企业级后台系统、医疗 SaaS、多端项目和 AI 应用；
- React 目前只了解基础语法，没有大型 React 项目经验；
- 我希望通过一个小型 React 后台管理项目，理解 React 的核心用法和面试高频点。

请你遵守以下规则：

1. 不要一次性生成完整项目。
2. 每次只完成一个小阶段。
3. 每一步都要先说明目标、涉及知识点、要执行的命令、要修改的文件。
4. 代码写完后，要解释这一步对应哪些 React 面试题。
5. 解释时尽量用 Vue 开发者能理解的方式对比说明。
6. 不要一开始引入 Redux、Zustand、TypeScript、复杂权限、Mock.js、微前端等内容。
7. 先完成最小闭环，再逐步补充优化点。

---

## 1. 项目最终目标

使用以下技术栈完成一个最小后台管理 Demo：

- React
- Vite
- JavaScript
- Ant Design
- React Router
- Axios
- localStorage
- 本地 mock 数据

最终实现功能：

1. 登录页
2. 后台整体 Layout
3. 左侧菜单
4. 用户列表
5. 用户查询
6. 新增用户
7. 编辑用户
8. 删除用户
9. Axios 请求封装
10. token 登录状态判断
11. 路由访问控制
12. React 高频面试点理解

---

## 2. 项目目录结构

最终建议目录结构：

```txt
react-erp-demo
├─ package.json
├─ index.html
├─ vite.config.js
└─ src
   ├─ api
   │  └─ user.js
   ├─ components
   │  └─ UserModal.jsx
   ├─ pages
   │  ├─ Login.jsx
   │  ├─ Home.jsx
   │  └─ UserList.jsx
   ├─ router
   │  └─ index.jsx
   ├─ utils
   │  └─ request.js
   ├─ App.jsx
   ├─ main.jsx
   └─ index.css
```

---

## 3. 每一步 Codex 固定输出格式

每个阶段请 Codex 按照这个格式回答：

```txt
1. 本步骤目标
2. 涉及 React 知识点
3. 需要执行的命令
4. 需要新增或修改的文件
5. 完整代码
6. 运行验证方式
7. 这一步对应的面试问题和回答思路
8. 和 Vue 项目的对比理解
```

每完成一个阶段后，请停下来等我确认，不要继续自动开发下一阶段。

---

# 阶段一：初始化 Vite + React 项目

## 目标

在空文件夹 `react-erp-demo` 中初始化 React 项目，并安装基础依赖。

## 技术点

- Vite 创建 React 项目
- React 项目入口
- main.jsx
- App.jsx
- Ant Design 引入
- 项目基础目录

## 执行命令

在 `react-erp-demo` 文件夹中执行：

```bash
npm create vite@latest . -- --template react
npm install
npm install antd @ant-design/icons react-router-dom axios
npm run dev
```

如果 npm 下载慢，可以临时切换镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

恢复官方源：

```bash
npm config set registry https://registry.npmjs.org
```

## 让 Codex 执行的提示词

```txt
现在开始第一阶段：初始化 Vite + React 项目。

要求：
1. 使用 Vite + React + JavaScript；
2. 安装 antd、@ant-design/icons、react-router-dom、axios；
3. 清理 Vite 默认代码；
4. 创建 api、components、pages、router、utils 目录；
5. 在 main.jsx 中引入 Ant Design 样式；
6. App.jsx 暂时只保留一个简单页面；
7. 完成后解释 main.jsx、App.jsx 的作用，以及 React 项目入口和 Vue 项目入口的区别。

请先告诉我需要执行哪些命令，然后再生成需要修改的文件代码。
```

## 需要理解

React 项目中：

- `main.jsx` 类似 Vue 项目的 `main.js`；
- `App.jsx` 类似 Vue 项目的根组件 `App.vue`；
- React 组件本质是函数；
- JSX 是 JavaScript 的语法扩展，可以在 JS 中写类似 HTML 的结构。

---

# 阶段二：登录页

## 目标

实现一个最简单的登录页。

功能：

- 输入账号密码；
- 账号密码先写死为 `admin / 123456`；
- 登录成功后保存 token；
- 跳转到 `/home`。

## 技术点

- 函数组件
- useState
- 受控组件
- Ant Design Form / Input / Button
- localStorage
- useNavigate 路由跳转

## 让 Codex 执行的提示词

```txt
现在进入第二阶段：开发登录页。

要求：
1. 创建 pages/Login.jsx；
2. 使用 Ant Design 的 Form、Input、Button、message；
3. 账号密码先写死：admin / 123456；
4. 登录成功后将 token 存入 localStorage；
5. 登录成功后跳转到 /home；
6. 页面样式简单即可，居中显示登录框；
7. 请解释 useState、受控组件、表单提交、useNavigate 的作用；
8. 请用 Vue 开发者能理解的方式对比 Vue 表单绑定和 React 受控组件。
```

## 需要理解

### useState

可以类比 Vue 的 `data`：

```jsx
const [username, setUsername] = useState('');
```

- `username` 是状态值；
- `setUsername` 是修改状态的方法；
- React 中不要直接修改状态。

### 受控组件

React 中表单值由 state 控制：

```jsx
<Input value={username} onChange={(e) => setUsername(e.target.value)} />
```

可以理解为 Vue 中 `v-model` 的手动写法。

---

# 阶段三：React Router 和后台 Layout

## 目标

实现基础路由和后台管理布局。

功能：

- `/login` 登录页；
- `/home` 后台首页；
- 左侧菜单；
- 顶部栏；
- 内容区；
- 未登录访问 `/home` 时跳转 `/login`。

## 技术点

- React Router
- BrowserRouter
- Routes
- Route
- Navigate
- useNavigate
- Layout 布局
- 简单路由守卫

## 让 Codex 执行的提示词

```txt
现在进入第三阶段：配置 React Router 和后台 Layout。

要求：
1. 创建 router/index.jsx；
2. 配置 /login 和 /home 路由；
3. 创建 pages/Home.jsx；
4. 使用 Ant Design Layout 实现左侧菜单、顶部区域、内容区域；
5. 左侧菜单先放一个“用户管理”；
6. 如果没有 token，访问 /home 时跳转到 /login；
7. 登录后默认进入 /home；
8. 请解释 React Router、路由守卫思路，以及它和 Vue Router 的区别。
```

## 需要理解

React Router 和 Vue Router 不完全一样：

- Vue Router 常用 `beforeEach` 做全局守卫；
- React Router 更常见的是用组件判断 token，然后通过 `<Navigate />` 跳转；
- React 中路由也是组件化的。

---

# 阶段四：用户列表页

## 目标

实现用户管理列表。

功能：

- 用户列表；
- 用户名查询；
- 表格展示；
- 删除按钮；
- 新增按钮；
- 编辑按钮；
- 本地数组模拟数据。

## 技术点

- useState
- useEffect
- Ant Design Table
- Ant Design Form
- 列表 key
- rowKey
- filter
- state 不可变更新

## 让 Codex 执行的提示词

```txt
现在进入第四阶段：开发用户列表页。

要求：
1. 创建 pages/UserList.jsx；
2. 在 Home.jsx 中展示 UserList；
3. 使用 Ant Design Table、Form、Input、Button、Popconfirm；
4. 使用本地数组模拟用户数据；
5. 支持用户名查询；
6. 支持删除用户；
7. 每一行展示编辑和删除按钮；
8. Table 必须设置 rowKey；
9. 页面加载时用 useEffect 初始化数据；
10. 请解释 useEffect、列表 key、Table rowKey、状态更新为什么不能直接修改原数组。
```

## 需要理解

### useEffect

页面加载时执行：

```jsx
useEffect(() => {
  getUserList();
}, []);
```

### key 的作用

key 用来帮助 React 识别列表中每一项，方便 diff 更新。

面试回答：

```txt
key 用来标识列表项的唯一性，帮助 React 在 diff 时判断元素的新增、删除或移动。一般使用业务唯一 id，不建议使用 index，尤其是列表会增删或排序时。
```

### 为什么不能直接修改 state

错误写法：

```jsx
userList.splice(index, 1);
setUserList(userList);
```

推荐写法：

```jsx
setUserList(userList.filter(item => item.id !== id));
```

React 状态更新要保持不可变性，要生成新数组或新对象。

---

# 阶段五：新增 / 编辑用户弹窗

## 目标

实现用户新增和编辑。

功能：

- 点击新增打开空表单；
- 点击编辑回显当前行；
- 保存后更新列表；
- 子组件弹窗；
- 父子组件通信。

## 技术点

- 组件拆分
- props
- 回调函数
- 父子组件通信
- Modal
- Form
- 表单回显
- 状态不可变更新

## 让 Codex 执行的提示词

```txt
现在进入第五阶段：开发新增和编辑用户弹窗。

要求：
1. 创建 components/UserModal.jsx；
2. 父组件 UserList 控制弹窗打开和关闭；
3. 点击新增时打开空表单；
4. 点击编辑时回显当前行数据；
5. 提交后新增或更新用户列表；
6. 使用 Ant Design Modal 和 Form；
7. 子组件通过 onCancel 通知父组件关闭；
8. 子组件通过 onSuccess 通知父组件保存数据；
9. 请解释父子组件通信、props、回调函数、受控组件、Form 表单回显。
```

## 需要理解

React 父子组件通信：

```jsx
<UserModal
  open={open}
  currentUser={currentUser}
  onCancel={() => setOpen(false)}
  onSuccess={handleSuccess}
/>
```

- 父传子：`open`、`currentUser`
- 子通知父：`onCancel`、`onSuccess`

面试回答：

```txt
React 中常见的组件通信方式是 props 父传子，子组件通过调用父组件传入的回调函数通知父组件。如果跨层级较深，可以使用 Context 或状态管理工具。
```

---

# 阶段六：Axios 请求封装

## 目标

按真实项目方式组织接口层，虽然数据仍可先用本地 mock。

## 技术点

- Axios 实例
- 请求拦截器
- 响应拦截器
- token 携带
- api 分层
- 与 Vue 项目的相同点

## 让 Codex 执行的提示词

```txt
现在进入第六阶段：封装 Axios 请求。

要求：
1. 创建 utils/request.js；
2. 创建 api/user.js；
3. 封装 axios 实例；
4. 请求拦截器中自动携带 token；
5. 响应拦截器中统一处理错误；
6. 用户列表、新增、编辑、删除接口先可以用 Promise + setTimeout 模拟；
7. UserList 页面调用 api/user.js 中的方法；
8. 请解释 axios 封装在 React 项目和 Vue 项目中的相同点和不同点。
```

## 需要理解

Axios 封装和 Vue 中基本一样。

区别主要在于：

- React 没有 Vue 插件式挂载 `$request` 的习惯；
- React 更常见的是直接在模块中引入 api 方法；
- 请求结果通过 `useState` 更新页面。

---

# 阶段七：补充 useMemo / useCallback / React.memo

## 目标

在已有项目中用真实场景理解性能优化相关 Hooks。

## 技术点

- React.memo
- useMemo
- useCallback
- columns 缓存
- 函数缓存
- 子组件避免无意义渲染

## 让 Codex 执行的提示词

```txt
现在进入第七阶段：在当前项目中补充 useMemo、useCallback、React.memo 的实际使用场景。

要求：
1. 不要为了使用而使用；
2. 请在用户列表查询、表格 columns、子组件渲染中找合适场景演示；
3. 使用 useMemo 缓存 Table columns 或过滤后的列表；
4. 使用 useCallback 缓存传给子组件的事件函数；
5. 使用 React.memo 包裹 UserModal 或一个简单子组件；
6. 分别解释 React.memo、useMemo、useCallback 的区别；
7. 请告诉我面试中如何回答这三个概念。
```

## 需要理解

一句话记忆：

```txt
React.memo 缓存组件；
useMemo 缓存计算结果；
useCallback 缓存函数。
```

面试回答：

```txt
React.memo 用于避免组件在 props 未变化时重复渲染；
useMemo 用于缓存计算结果，适合复杂计算或派生数据；
useCallback 用于缓存函数引用，通常配合 React.memo 使用，避免子组件因为函数引用变化而重复渲染。
```

---

# 阶段八：React 和 Vue 对比总结

## 目标

把项目中学到的 React 知识和 Vue 经验联系起来，形成面试表达。

## 让 Codex 执行的提示词

```txt
现在请结合当前项目，帮我总结 React 和 Vue 在后台管理系统开发中的区别。

请从以下角度总结：
1. 组件写法；
2. 状态管理；
3. 表单绑定；
4. 生命周期 / 副作用；
5. 路由；
6. 组件通信；
7. 列表渲染；
8. 状态更新；
9. UI 组件库使用；
10. 后台项目开发思路是否可以迁移。

要求：
请用我这种 Vue 开发者能听懂的方式解释，并整理成面试回答。
```

## 推荐面试回答

```txt
我之前主栈是 Vue2 / Vue3，React 是最近重点补充方向。通过 React + Hooks + React Router + Ant Design 搭建后台管理 Demo，我把登录、路由、用户列表、查询、新增编辑弹窗、接口封装这些后台常见场景都跑了一遍。

我理解 Vue 和 React 在语法和生态上不同，Vue 更偏模板、指令和响应式系统，React 更偏函数组件、JSX 和状态驱动 UI。但在企业后台系统里，核心开发能力是相通的，比如组件拆分、表单表格、权限控制、接口联调、业务状态维护和复杂业务理解。

所以我认为从 Vue 切到 React，主要是语法和生态切换，业务开发思路和工程经验是可以迁移的。
```

---

# 阶段九：最终面试复盘

## 目标

让 Codex 基于项目帮我整理面试题。

## 让 Codex 执行的提示词

```txt
现在这个 React ERP Demo 已经完成，请你基于这个项目帮我整理一份 React 面试复盘。

要求：
1. 列出这个项目涉及的 React 高频面试题；
2. 每个问题给出简洁回答；
3. 回答要结合本项目场景；
4. 帮我整理一段 1 分钟自我介绍，说明我虽然主栈是 Vue，但已经通过这个项目补充了 React 后台开发能力；
5. 帮我整理一段“为什么你没有大型 React 项目经验，但能快速上手 React 项目”的回答。
```

---

# 4. 高频面试点和项目对应关系

| 面试点 | 在项目中的对应场景 |
|---|---|
| 函数组件和类组件区别 | 所有页面都使用函数组件 |
| useState | 登录表单、用户列表、弹窗开关 |
| useEffect | 页面加载获取用户列表 |
| useRef | 可选：表单或 DOM 引用场景 |
| useMemo | 缓存 Table columns / 过滤后的列表 |
| useCallback | 缓存传给子组件的方法 |
| React.memo | 避免子组件无意义渲染 |
| 组件通信 | UserList 和 UserModal |
| 受控组件 | 登录页输入框、查询表单 |
| key 的作用 | 用户列表、Table rowKey |
| 不能直接修改 state | 删除、编辑用户列表 |
| React Router | 登录页和后台页跳转 |
| React 和 Vue 区别 | 项目整体对比 |
| Axios 封装 | utils/request.js 和 api/user.js |
| 权限控制 | token 判断访问 /home |

---

# 5. 最终要达到的学习效果

完成这个项目后，我需要能够回答：

1. React 函数组件是什么；
2. useState 怎么用；
3. useEffect 什么时候执行；
4. 受控组件是什么；
5. React 组件怎么通信；
6. React Router 怎么配置；
7. key 有什么作用；
8. 为什么不能直接修改 state；
9. React.memo / useMemo / useCallback 区别；
10. React 和 Vue 的主要区别；
11. Vue 经验如何迁移到 React；
12. 如何用 React + Ant Design 开发后台管理页面。

---

# 6. 学习节奏建议

如果时间很紧，可以按这个节奏：

## 第一天

完成：

1. 项目初始化；
2. 登录页；
3. 路由；
4. 后台 Layout。

理解：

- main.jsx
- App.jsx
- 函数组件
- useState
- 受控组件
- useNavigate
- React Router

## 第二天

完成：

1. 用户列表；
2. 查询；
3. 删除；
4. 新增编辑弹窗。

理解：

- useEffect
- Table
- key
- props
- 父子组件通信
- state 不可变更新

## 第三天

完成：

1. Axios 封装；
2. useMemo / useCallback / React.memo；
3. 面试复盘。

理解：

- 请求封装
- 性能优化 Hooks
- React 和 Vue 对比
- 面试表达

---

# 7. 注意事项

1. 不要一开始做复杂权限。
2. 不要一开始上 Redux。
3. 不要一开始上 TypeScript。
4. 不要为了使用 Hooks 而强行使用 Hooks。
5. 每一步必须能运行起来。
6. 每写完一个模块，都要让 Codex 解释代码。
7. 每个知识点都要能对应到项目中的实际场景。
8. 面试时不要说自己 React 项目经验很丰富，要说“主栈 Vue，React 正在补充，已经通过项目 Demo 跑通后台常见场景”。

---

# 8. 面试时可使用的表达

## 自我介绍中的 React 表达

```txt
我之前主栈是 Vue2 / Vue3，React 是最近重点补充方向。为了快速熟悉 React 后台开发，我用 React + Hooks + React Router + Ant Design 搭了一个后台管理 Demo，实现了登录、路由、菜单布局、用户列表、查询、新增编辑弹窗、删除、Axios 封装等功能。

通过这个 Demo，我把 React 中的 useState、useEffect、受控组件、父子组件通信、列表 key、状态不可变更新、React Router 等常见后台开发知识点都跑了一遍。因为我之前长期做企业级后台系统，所以业务开发思路是相通的，目前主要是在补 React 语法和生态。
```

## 为什么没有大型 React 项目经验也能上手

```txt
我承认大型 React 项目经验没有 Vue 多，但我过去长期做企业级后台和医疗 SaaS 系统，复杂业务、表单表格、权限控制、接口联调、组件封装、项目交付这些经验是通用的。

React 对我来说主要是语法和生态切换，比如 JSX、Hooks、React Router、Ant Design 的使用。我已经通过 Demo 把后台常见开发链路跑通，所以我认为自己可以比较快适应 React 项目。
```

---

# 9. 最后提醒

这个项目不是为了做得多复杂，而是为了建立 React 项目感。

真正目标是：

```txt
用最短时间，从“只看过 React 语法”变成“能用 React + Ant Design 独立完成后台管理常见功能，并能讲清楚对应面试点”。
```
