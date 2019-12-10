const Caching = require('../services/Caching')
const CachingKey = require('../services/CachingKey')
const { getLocation } = require('../actions/geo')

const getPostById = async (post_id) => {
  const postsString = await Caching.hget(CachingKey.POSTS_KEY, post_id)
  return JSON.parse(postsString)
}

const getPosts = async (query) => {
  const postsString = await Caching.hgetall(CachingKey.POSTS_KEY)
  const posts = Object.values(postsString || '').reduce((prev, value) => ([
    ...prev,
    JSON.parse(value),
  ]), [])

  const { page: __page, per_page: __per_page} = query
  const page = __page > 1 ? __page : 1
  const per_page = __per_page > 0 ? __per_page : 5
  const postsReverse = [...posts.reverse()]

  const startIndex = (per_page * (page - 1))
  const endIndex = (per_page * page)
  const total_pages = Math.ceil(postsReverse.length / per_page)

  const data = {
    posts: [...postsReverse.slice(startIndex, endIndex)],
    page,
    per_page,
    total_pages,
    totals: postsReverse.length,
  }

  return data
}

const getPostsByUserEmail = async (email) => {
  const postsString = await Caching.hgetall(CachingKey.POSTS_KEY)
  const posts = Object.values(postsString || '').reduce((prev, value) => ([
    ...prev,
    JSON.parse(value),
  ]), [])
  const postsReverse = [...posts.reverse()]
  return postsReverse.filter(item => item.creator === email)
}

const getsetNextId = async () => {
  try {
    const getCurrentIdString = await Caching.hget(CachingKey.COUNTER_KEY, 'posts')
    const currentId = parseInt(JSON.parse(getCurrentIdString || 0))
    await Caching.hset(CachingKey.COUNTER_KEY, 'posts', JSON.stringify(currentId + 1))
    return currentId + 1
  } catch (err) {
    return 0
  }
}

const createPost = async (post) => {
  try {
    const id = await getsetNextId()
    
    let location = null
    if (post.address) {
      location = await getLocation(post.address).then(res => res).catch(() => null)
    }

    const finalPost = {
      ...post,
      id,
      comments: [],
      favorited: [],
      location,
      created_at: new Date(),
    }
    
    await Caching.hset(CachingKey.POSTS_KEY, id, JSON.stringify(finalPost))
    return finalPost
  } catch (err) {
    return false
  }
}

const updatePost = async (post) => {
  const get_post = await getPostById(post.id)
  if (get_post) {
    let finalPost = {}

    if (post.address && post.address !== get_post.address) {
      const location = await getLocation(post.address).then(res => res).catch(() => null)
      finalPost = {
        ...get_post,
        ...post,
        location,
      }
    } else {
      finalPost = {
        ...get_post,
        ...post,
      }
    }
    return Caching.hset(CachingKey.POSTS_KEY, post.id, JSON.stringify(finalPost))
      .then(() => finalPost).catch(err => err)
  } else {
    return Promise.reject('Post not exists')
  }
}

const deletePost = (post_id) => {
  return Caching.hdel(CachingKey.POSTS_KEY, post_id)
}

module.exports = {
  getPostById,
  getPosts,
  getPostsByUserEmail,
  createPost,
  updatePost,
  deletePost,
}