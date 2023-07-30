const CustomError = require('../errors/custom-error')

const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('no token found ', 401)
  }
  const token = authHeader.split(' ')[1]

  try {
    const { userId, username, role } = jwt.verify(token, process.env.JWT)
    req.user = { userId, username, role }
    next()
  } catch (err) {
    throw new CustomError('invalid token', 401)
  }
}

const authPermission = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new CustomError('Unauthorized to access this route', 403)
  }
  next()
}

module.exports = {
  authMiddleware,
  authPermission,
}
