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
    const users = await User.find({})
    const network = await Network.find({})
    // await dbDisconnect()
    const usersWithNetwork = users.map((user) => {
      const userNetwork = network.find(
        (n) => n.userId.toString() === user._id.toString(),
      )
      return {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        network: userNetwork,
      }
    })
    res.send({
      users: usersWithNetwork,
      success: true,
      message: 'successfully fetched users',
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default router.handler()
