const router = module.exports = require('express').Router()
const { authAction } = require('../../actions')
const config = require('../../../config')

router.post('/sign_up', (req, res) => {
  authAction.signUp(req.body, (err, successData) => {
    if (err) {
      res.status(err.status).json({errors: err.msg})
    } else {
      res.cookie(config.authCookieKey, {
        email: successData._cookie.email,
        token: successData._cookie.token
      }, {
        httpOnly: true,
        maxAge: config.jwtExpiresIn,
      })
      res.json({user: successData.user})
    }
  })
})

router.post('/sign_in', (req, res) => {
  authAction.signIn(req.body, (err, successData) => {
    if (err) {
      res.status(err.status).json({errors: err.msg});
    } else {
      res.cookie(config.authCookieKey, {
        email: successData._cookie.email,
        token: successData._cookie.token
      }, {
        httpOnly: true,
        maxAge: config.jwtExpiresIn,
      })
      // res.set('email', successData.headers.email);
      // res.set('token', successData.headers.token);
      // res.set('Access-Control-Expose-Headers', 'email, token, auth');
      res.json({user: successData.user})
    }
  })
})

router.get('/sign_out', (req, res) => {
  const _cookie = req.cookies[config.authCookieKey]
  if (_cookie && _cookie.email && _cookie.token) {
    authAction.signOut(_cookie.email, (err, successData) => {
      res.clearCookie(config.authCookieKey)
      if (err) {
        res.status(err.status).json({errors: err.msg})
      } else {
        res.json({msg: successData})
      }
    })
  } else {
    res.clearCookie(config.authCookieKey)
  }
})

// router.post('/google', (req, res) => {
//   const { idToken } = req.body
//   if (!idToken) {
//     res.status(404).json({msg: 'Token is required'})
//   } else {
//     authAction.google(idToken, (err, successData) => {
//       if (err) {
//         res.status(err.status).json({errors: err.msg})
//       } else {
//         res.cookie(config.authCookieKey, {
//           email: successData._cookie.email,
//           token: successData._cookie.token
//         }, {
//           maxAge: config.jwtExpiresIn,
//           httpOnly: true,
//         })
//         res.json({user: successData.user})
//       }
//     })
//   }
// })

router.post('/fetch', (req, res) => {
  const authCookie = (req.body.cookies && req.body.cookies[config.authCookieKey])
    ? req.body.cookies[config.authCookieKey] : req.cookies[config.authCookieKey]

  authAction.fetch(authCookie, (err, successData) => {
    if (err) {
      res.clearCookie(config.authCookieKey)
      res.status(err.status).json({errors: err.msg})
    } else {
      res.json({user: successData})
    }
  })
})