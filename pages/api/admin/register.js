import { createRouter } from 'next-connect'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { dbConnect, dbDisconnect } from '@/utils/db'
import { onError } from '@/utils/error'
import { signToken, isAdmin, isAuth } from '@/utils/auth'

const router = createRouter({ onError })

router.use(isAuth, isAdmin)

router.post(async (req, res) => {
  if (
    req.user.email === 'nayem831021@gmail.com' ||
    req.user.email === 'shahariaresha@gmail.com'
  ) {
    await dbConnect()
    const { email, password, isAdmin } = req.body
    // register user and save to db
    const user = await User.findOne({ email })
    if (user) {
      await dbDisconnect()
      res.status(401).send({ message: 'User already exists' })
    } else {
      const newUser = new User({
        email,
        isAdmin: isAdmin || false,
        password: bcrypt.hashSync(password, 8),
      })
      const createdUser = await newUser.save()
      await dbDisconnect()
      if (createdUser) {
        const token = signToken(createdUser)
        res.send({
          success: true,
          token,
          data: createdUser,
        })
      } else {
        await dbDisconnect()
        res.status(401).send({ message: 'Invalid user data' })
      }
    }
  } else {
    res.status(401).send({ message: 'You are not authorized' })
  }
})

export default router.handler()
