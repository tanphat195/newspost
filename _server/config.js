module.exports = {
  port: process.env.PORT || 9999,
  mongodb_host: 'mongodb://localhost:27017/news',
  // mongodb_host: 'mongodb+srv://zephys_db1:thezephysgame@zephys-d6zna.mongodb.net/zephys?retryWrites=true&w=majority',
  google_client_id: '1004633767039-80rgcp29mna8g0ifa26maoo8bu3kmie0.apps.googleusercontent.com',
  jwtKey: 'Zephys4HS96kDJS2HAGwk9skd847jdG3fsljl57Gsfsj6FsHF46GD768gal1kkaa',
  authCookieKey: 'news_session',
  jwtExpiresIn: 2592000000, //30 days
  cachingConfig: {
    host: '127.0.0.1',
    port: 6379,
  },
  awsConfig: {
    S3_BUCKET: 'zephys3',
    AWS_ACCESS_KEY_ID: 'canmotcaitenkhoquen',
    AWS_SECRET_ACCESS_KEY: 'hettienroi',
  }
}