import jwt from 'jsonwebtoken'
import User from '@/models/User'
import { dbConnect, dbDisconnect } from '@/utils/db'

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '10h',
      // httpOnly: process.env.NEXT_ENV === 'production' ? true : false,
    },
  )
}

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' })
      } else {
        // fetch all users from db
        await dbConnect()
        const users = await User.findById(decode._id)
        await dbDisconnect()

        if (!users) {
          res.status(401).send({ message: 'User not found' })
          return
        } else if (
          users.password != decode.password ||
          users.email !== decode.email
        ) {
          res.status(401).send({ message: 'Email/Password is not valid' })
          return
        } else if (!users.isAdmin || !decode.isAdmin) {
          res.status(401).send({ message: 'User is not admin' })
          return
        }
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'Token is not suppiled' })
  }
}

const isAdmin = async (req, res, next) => {
  // req.user gets decoded in isAuth middleware and creates on signToken
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ message: 'User is not admin' })
  }
}

export { signToken, isAuth, isAdmin }
