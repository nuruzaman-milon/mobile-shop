import { dbDisconnect } from './db'

const onError = async (err, req, res, next) => {
  await dbDisconnect()
  res.status(500).send({ message: err.toString() })
}

const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message

export { onError, getError }
