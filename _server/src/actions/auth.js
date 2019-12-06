const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const { isEmail } = require('../utils')
const config = require('../../config')
const { User, LoggedUser } = require('../models')
const loggedUserAction = require('./logged_user')

const signUp = async (body, callback) => {
  const { password, confirm_password, full_name } = body
  const email = body.email.toLocaleLowerCase()

  if (!isEmail(email)) {
    return callback({status: 405, msg: 'Email is required'})
  }
  
  if (password.length < 6) {
    return callback({status: 405, msg: 'Password must be more than 8 characters'})
  }
  
  if (password !== confirm_password) {
    return callback({status: 405, msg: 'Confirm password not match password'})
  }

  const get_user = await User.getUser(email);
  if (get_user) {
    return callback({status: 405, msg: 'Email already exists'})
  } else {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const user = {
      email,
      hash,
      salt,
      full_name,
      gender: 'male',
      phone_number: '',
      birthday: '',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySUvnmtdzOdplk95Fa5ziU0jSCJ6QrrXdTVWRXexIyMNEdflI',
    }

    const newUser = await User.createUser(user)
    if (newUser) {
      const secret = bcrypt.genSaltSync(10)
      const token = jwt.sign({ email }, secret, { expiresIn: config.jwtExpiresIn })

      const _cookie = {
        email,
        token,
      }
      const get_logged = await LoggedUser.getLoggedUser(email)
      
      if (get_logged) {
        return callback(null, {_cookie, user: get_user})
      } else {
        await LoggedUser.createLoggedUser({ email, token })
        return callback(null, {_cookie, user: get_user})
      }
    } else {
      return callback(err)
    }
  }
}

const signIn = async (body, callback) => {
  const {password} = body;
  const email = body.email.toLocaleLowerCase()

  if (!isEmail(email)) {
    callback({status: 401, msg: 'Invalid email'})
  } else if(password.length < 6) {
    callback({status: 401, msg: 'Password must be more than 8 characters'})
  } else {
    const get_user = await User.getUser(email)
    if (!get_user) {
      callback({status: 401, msg: 'Invalid login credentials. Please try again.'})
    } else {
      const exact = bcrypt.compareSync(password, get_user.hash)
      if (exact) {
        const secret = bcrypt.genSaltSync(10)
        const token = jwt.sign({ email }, secret, { expiresIn: config.jwtExpiresIn })

        const _cookie = {
          email: get_user.email,
          token,
        }
        const get_logged = await LoggedUser.getLoggedUser(email)
        
        if (get_logged) {
          callback(null, {_cookie, user: get_user})
        } else {
          await LoggedUser.createLoggedUser({ email, token })
          callback(null, {_cookie, user: get_user})
        }
      } else {
        callback({status: 401, msg: 'The password is not correct'})
      }
    }
  }
}

const signOut = async (_email, callback) => {
  const email = _email.toLocaleLowerCase()
  const removeLogged = await  LoggedUser.removeLoggedUser(email)
  if (removeLogged) {
    callback(null, 'Successfully Logout')
  } else {
    callback({status: 404, msg: 'An error occurred. Please try again!'})
  }
}

// const client = new OAuth2Client(config.google_client_id)
// const google = (idToken, callback) => {
//   client.verifyIdTokenAsync({
//     idToken,
//     audience: config.google_client_id,
//   }).then(res => {
//     const envelope = res.getEnvelope()
//     const kid = envelope['kid']

//     const payload = res.getPayload()
//     const sub = payload['sub']
//     const email = payload['email']
//     const full_name = payload['name']
//     const avatar = payload['picture']
//     const at_hash = payload['at_hash']
//     const jti = payload['jti']

//     const token = jwt.sign({ email }, at_hash, { expiresIn: config.jwtExpiresIn })
//     User.findOne({email}, (err, resultUser) => {
//       if (err || resultUser) {
//         loggedUserAction.create({email, secret: at_hash,
//           token, full_name}, (err, logged) => {
            
//           if (err || !logged) {
//             return callback({...err})
//           }

//           const _cookie = { email, token };
//           return callback(null, {_cookie, user: resultUser})
//         });
//       } else {
//         const salt = bcrypt.genSaltSync(10)
//         const hash = bcrypt.hashSync(kid, salt)
  
//         const user = {
//           email,
//           hash,
//           salt,
//           full_name,
//           gender: '',
//           birthday: '',
//           avatar,
//         }

//         const finalUser = new User(user);
//         finalUser.save()
//           .then((result) => {
//             const token = jwt.sign({ email }, at_hash, { expiresIn: config.jwtExpiresIn });

//             loggedUserAction.create({email, secret: at_hash,
//               token, full_name}, (err, logged) => {
//               if (err || !logged) {
//                 return callback({...err})
//               }

//               const _cookie = {
//                 email,
//                 token,
//               }
//               return callback(null, { _cookie, user: result} )
//             })
//           })
//           .catch(err => {
//             return callback({status: 500, msg: err})
//           })
//       }
//     })
//   })
// }

const fetch = async (authCookie, callback) => {
  if (authCookie && authCookie.email && authCookie.token) {
    const { email, token } = authCookie
    const _email = email.toLocaleLowerCase()

    const get_logged = await LoggedUser.getLoggedUser(_email)
    if (get_logged) {
      const get_user = await User.getUser(_email)
      if (get_user) {
        callback(null, get_user)
      } else {
        callback({status: 401, msg: 'User not found'})
      }
    } else {
      callback(null, {})
    }
  } else {
    callback(null, {})
  }
}

const authenticate = (req, callback) => {
  const authCookie = (req.body.cookies && req.body.cookies[config.authCookieKey])
    ? req.body.cookies[config.authCookieKey] : req.cookies[config.authCookieKey]

  fetch(authCookie, (err, successData) => {
    if (err) {
      callback(true)
    } else {
      callback(false, successData)
    }
  })
}

module.exports = {
  signUp, signIn, signOut, fetch, authenticate,
}