import request from '../utils/request'

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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback())
    }, 300)
  })
}

export function getUserList(params = {}) {
  // 接真实接口时可替换为：return request.get('/users', { params })
  void request

  return mockRequest(() => {
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

    mockUserList = [...mockUserList, newUser]
    return newUser
  })
}

export function updateUser(id, data) {
  // 接真实接口时可替换为：return request.put(`/users/${id}`, data)
  return mockRequest(() => {
    let updatedUser = null

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
    mockUserList = mockUserList.filter((user) => user.id !== id)
    return true
  })
}
