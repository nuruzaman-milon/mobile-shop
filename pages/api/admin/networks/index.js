import { createRouter } from 'next-connect'
import Network from '@/models/Network'
import macaddress from 'macaddress'
import { dbConnect, dbDisconnect } from '@/utils/db'
import { onError } from '@/utils/error'

const router = createRouter({ onError })

router.get(async (req, res) => {
  await dbConnect()
  const networks = await Network.find({})
  await dbDisconnect()
  res.send(networks)
})

export default router.handler()
