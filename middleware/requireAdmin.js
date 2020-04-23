
module.exports = async (req, res, next) => {
  const { authorization } = req.headers
  req.body.adminFullAccess = false
  const { NODE_ENV, ADMIN_FULL_TOKEN, ADMIN_TOKEN } = process.env
  if (NODE_ENV == 'development') {
    req.body.adminFullAccess = true
    return next()
  }
  if (authorization === ADMIN_FULL_TOKEN || authorization === ADMIN_TOKEN) {
    req.body.adminFullAccess = true
    req.body.employee = 'SYSTEM'
    return next()
  }
  return res.status(401).send('Error: Access Denied')
}