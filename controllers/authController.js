const User = require('../models/userSchema')
const CustomError = require('../errors/custom-error')

const register = async (req, res, next) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
      throw new CustomError('Provided email already exist', 400)
    }

    // checking 'User' collection , where documents is zero
    // returns 'Boolean' value.
    const isFirstAccount = (await User.countDocuments({})) === 0

    // if there is no documents, set role as admin otherwise user
    const role = isFirstAccount ? 'admin' : 'user'

    // req.body.role = role
    const data = {
      role,
      name,
      email,
      password,
    }

    const user = new User(data)
    const result = await user.save()

    const token = user.createJWT()

    res.status(201).json({ msg: 'User Created!!!', data: result, token })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if ((!email, !password)) {
      throw new CustomError('Please provide email and password', 400)
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new CustomError('Account does not exist email address', 404)
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw new CustomError('incorrect password', 401)
    }

    const token = user.createJWT()

    res.status(200).json({ data: user, token })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
}
