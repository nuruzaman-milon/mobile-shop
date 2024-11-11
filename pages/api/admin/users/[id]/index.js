import { createRouter } from 'next-connect'
import User from '@/models/User'
import Network from '@/models/Network'
import { dbConnect, dbDisconnect } from '@/utils/db'
import { onError } from '@/utils/error'
import { isAdmin, isAuth } from '@/utils/auth'

const router = createRouter({ onError })

router.use(isAuth, isAdmin)

router.get(async (req, res) => {
  try {
    await dbConnect()
    const user = await User.findById(req.query.id)
    await dbDisconnect()
    res.send(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// update user isAdmin to true

router.patch(async (req, res) => {
  try {
    await dbConnect()
    const user = await User.findByIdAndUpdate(
      req.query.id,
      { isAdmin: true },
      { new: true },
    )
    await dbDisconnect()
    res.send({ user, success: true, message: 'User updated' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

router.delete(async (req, res) => {
  try {
    await dbConnect()
    const user = await User.findByIdAndDelete(req.query.id)
    // delete network too if exists with userId = req.query.id
    const network = await Network.findOne({ userId: req.query.id })
    await dbDisconnect()
    res.send({ user, network, success: true, message: 'User deleted' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default router.handler()
