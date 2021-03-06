import axios from 'axios'
import store from './store'

const instance = axios.create({
  // baseURL: 'http://localhost',
  // baseURL: 'http://172.20.10.4',
  headers: {
    accept: 'application/json',
  },
})

const request = config => {
  const extraHeaders = {}
  const apiToken = store.getters.apiToken
  if (apiToken) {
    extraHeaders.authorization = `Bearer ${apiToken}`
  }
  const merged = {
    ...config,
    headers: {
      ...(config.headers || {}),
      ...extraHeaders,
    },
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log(merged)
  }

  return instance
    .request(merged)
    .then(res => res.data)
    .catch(err => {
      if (err.response && err.response.data) {
        const resError = new Error(err.response.data.message)
        resError.code = err.response.data.code
        resError.data = err.response.data.data
        throw resError
      } else {
        throw err
      }
    })
}

export const fetchLatestPost = async params => {
  return request({
    url: '/api/feed/latest',
    method: 'GET',
    params,
  })
}

export const fetchHottestPost = async params => {
  return request({
    url: '/api/feed/hottest',
    method: 'GET',
    params,
  })
}

export const fetchRandomPost = async params => {
  return request({
    url: '/api/feed/random',
    method: 'GET',
    params,
  })
}

export const createPost = data => {
  return request({
    url: '/api/posts',
    method: 'POST',
    data,
  })
}

export const getPost = async postId => {
  return request({
    url: `/api/posts/${postId}`,
    method: 'GET',
  })
}

export const updatePost = (postId, data) => {
  return request({
    url: `/api/posts/${postId}`,
    method: 'PUT',
    data,
  })
}

export const deletePost = postId => {
  return request({
    url: `/api/posts/${postId}`,
    method: 'DELETE',
  })
}

export const likePost = async postId => {
  return request({
    url: `/api/posts/${postId}/_like`,
    method: 'POST',
  })
}

export const unlikePost = async postId => {
  return request({
    url: `/api/posts/${postId}/_unlike`,
    method: 'POST',
  })
}

export const reportPost = async (postId, data) => {
  return request({
    url: `/api/posts/${postId}/_report`,
    method: 'POST',
    data,
  })
}

export const votePost = async (postId, data) => {
  return request({
    url: `/api/posts/${postId}/_vote`,
    method: 'POST',
    data,
  })
}

export const loginWithOauthCode = async (provider, data) => {
  return request({
    url: '/api/auth/login/with_oauth_code',
    method: 'POST',
    params: { provider },
    data,
  })
}

export const loginWithPassword = async data => {
  return request({
    url: '/api/auth/login/with_phone_password',
    method: 'POST',
    data,
  })
}

export const loginWithCode = async data => {
  return request({
    url: '/api/auth/login/with_phone_code',
    method: 'POST',
    data,
  })
}

export const sendLoginCode = async data => {
  return request({
    url: '/api/auth/login/send_phone_code',
    method: 'POST',
    data,
  })
}

export const sendRegisterCode = async data => {
  return request({
    url: '/api/auth/register/send_phone_code',
    method: 'POST',
    data,
  })
}

export const registerWithCode = async data => {
  return request({
    url: '/api/auth/register/with_phone_code',
    method: 'POST',
    data,
  })
}

export const registerWithPassword = async data => {
  return request({
    url: '/api/auth/register/with_phone_password',
    method: 'POST',
    data,
  })
}

export const fetchMe = () =>
  request({
    url: `/api/users/me`,
    method: 'GET',
  })

export const fetchUserCollection = (userId, params) => {
  return request({
    url: `/api/users/${userId}/liked-posts`,
    method: 'GET',
    params,
  })
}

export const fetchUserPosts = (userId, params) => {
  return request({
    url: `/api/users/${userId}/posts`,
    method: 'GET',
    params,
  })
}

export const archiveLike = likeId => {
  return request({
    url: `api/likes/${likeId}/_archive`,
    method: 'POST',
  })
}
export const unarchiveLike = likeId => {
  return request({
    url: `api/likes/${likeId}/_unarchive`,
    method: 'POST',
  })
}

export const search = params => {
  return request({
    url: `/api/search`,
    params,
  })
}
