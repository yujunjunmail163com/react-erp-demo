import request from '../utils/request'

// 模块级变量模拟“后端数据库”。
// 注意：这不是 React state，所以它变化不会直接触发页面更新；页面仍要重新调用接口并 setState。
let mockUserList = [
  {
    id: 1,
    username: 'admin',
    name: '系统管理员',
    role: '管理员',
    status: '启用',
  },
  {
    id: 2,
    username: 'tom',
    name: 'Tom',
    role: '普通用户',
    status: '启用',
  },
  {
    id: 3,
    username: 'jerry',
    name: 'Jerry',
    role: '运营',
    status: '停用',
  },
]

function mockRequest(callback) {
  // 当前阶段没有真实后端，用 Promise + setTimeout 模拟接口异步返回。
  // 这样组件里可以用 async/await，写法和真实接口保持一致。
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback())
    }, 300)
  })
}

export function getUserList(params = {}) {
  // 接真实接口时可替换为：return request.get('/users', { params })
  // 当前 mock 没有真正发 axios 请求，保留 request 引用是为了展示真实项目分层。
  void request

  return mockRequest(() => {
    // username 是查询参数；没有关键词时返回完整列表。
    const keyword = params.username?.trim().toLowerCase()

    if (!keyword) {
      return [...mockUserList]
    }

    return mockUserList.filter((user) =>
      user.username.toLowerCase().includes(keyword),
    )
  })
}

export function createUser(data) {
  // 接真实接口时可替换为：return request.post('/users', data)
  return mockRequest(() => {
    const newUser = {
      id: Date.now(),
      ...data,
    }

    // 新增时创建新数组，保持和 React state 一样的不可变更新习惯。
    mockUserList = [...mockUserList, newUser]
    return newUser
  })
}

export function updateUser(id, data) {
  // 接真实接口时可替换为：return request.put(`/users/${id}`, data)
  return mockRequest(() => {
    let updatedUser = null

    // 编辑时用 map 生成新数组，只替换命中的用户。
    mockUserList = mockUserList.map((user) => {
      if (user.id !== id) {
        return user
      }

      updatedUser = {
        ...user,
        ...data,
      }

      return updatedUser
    })

    return updatedUser
  })
}

export function deleteUser(id) {
  // 接真实接口时可替换为：return request.delete(`/users/${id}`)
  return mockRequest(() => {
    // 删除时用 filter 生成新数组。
    mockUserList = mockUserList.filter((user) => user.id !== id)
    return true
  })
}
