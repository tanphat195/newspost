const redis = require('redis')
const { port, host } = require('../../config').cachingConfig

class Caching {
  constructor() {
    this.redis = redis.createClient(port, host) 

    this.redis.on('connect', () => {
      console.log('Redis connected')
    })

    this.redis.on('ready', () => {
      console.log('Redis ready')
    })

    this.redis.on('error', (err) => {
      console.log(`Redis error: ${err.message}`)
    })
  }

  expire(key, expire) {
    return new Promise((resolve, reject) => {
      this.redis.expire(key, expire, (err, res) => {
        if (err) return reject(err)
        return resolve(res > 0)
      })
    })
  }

  hset(key, field, value, expire = 0) {
    return new Promise((resolve, reject) => {
      this.redis.hset(key, field, value, async (err, res) => {
        if (err) return reject(err)
        if (expire === 0) return resolve(res > 0)
        const result = await this.expire(key, expire)
        return resolve(result)
      })
    })
  }

  hget(key, field) {
    return new Promise((resolve, reject) => {
      this.redis.hget(key, field, (err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  pushLeftList(key, value) {
    return new Promise((resolve, reject) => {
      this.redis.LPUSH(key, value, (err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  pushRightList(key, value) {
    return new Promise((resolve, reject) => {
      this.redis.RPUSH(key, value, (err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  getLRange(key, start, end) {
    return new Promise((resolve, reject) => {
      this.redis.LRANGE(key, start, end, (err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  hmset(key, fieldValues, expire) {
    return new Promise((resolve, reject) => {
      this.redis.hmset(key, fieldValues, async (err, res) => {
        if (err) return reject(err);
        if (expire === 0) return resolve(res === 'OK');
        const result = await this.expire(key, expire);
        return resolve(result);
      })
    })
  }

  hmget(key, ...fields) {
    return new Promise((resolve, reject) => {
      this.redis.hmget(key, fields, (err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  hgetall(key) {
    return new Promise((resolve, reject) => {
      this.redis.hgetall(key, (err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  hdel(key, ...fields) {
    return new Promise((resolve, reject) => {
      this.redis.hdel(key, fields, (err, res) => {
        if (err) return reject(err)
        return resolve(res > 0)
      })
    })
  }
}

module.exports = new Caching()