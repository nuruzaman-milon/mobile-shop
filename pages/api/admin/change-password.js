import { createRouter } from 'next-connect'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { dbConnect, dbDisconnect } from '@/utils/db'
import { onError } from '@/utils/error'
import { isAdmin, isAuth, signToken } from '@/utils/auth'

const router = createRouter({ onError })

router.use(isAuth, isAdmin)

// post request to change password for admin from headers: `Bearer ${token}`, body: password, newPassword, cPassword
// get user details from token decoded
router.patch(async (req, res) => {
  await dbConnect()
  const user = await User.findById(req.user._id)
  await dbDisconnect()

  if (user) {
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (isMatch) {
      // hash new password and save to db
      user.password = bcrypt.hashSync(req.body.newPassword, 8)
      await dbConnect()
      const updatedUser = await user.save()
      await dbDisconnect()
      if (updatedUser) {
        const token = signToken(updatedUser)
        res.send({
          success: true,
          token,
          data: updatedUser,
        })
      } else {
        await dbDisconnect()
        res.status(401).send({ message: 'Invalid user data' })
      }
    } else {
      res.status(401).send({ message: 'Password is incorrect' })
    }
  } else {
    res.status(404).send({ message: 'User not found' })
  }
})

export default router.handler()
