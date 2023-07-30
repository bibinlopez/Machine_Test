const User = require('../models/userSchema')
const CustomError = require('../errors/custom-error')

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password')
    return res.status(200).json({ data: users, count: users.length })
  } catch (error) {
    next(error)
  }
}

const getAllAdmin = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'admin' }).select('-password')
    return res.status(200).json({ data: users, count: users.length })
  } catch (error) {
    next(error)
  }
}

const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      console.log('no id provided')
      throw new CustomError('No id Provided', 400)
    }
    const user = await User.findById(id).select('-password')
    if (!user) {
      throw new CustomError(`No user found in the id: ${id}`, 404)
    }
    return res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

const showCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).select(
      '-password'
    )

    return res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

const updateUserRole = async (req, res, next) => {
  try {
    const { email, role } = req.body
    if (!email || !role) {
      throw new CustomError('Please provide email and role', 400)
    }

    const user = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true, runValidators: true }
    )
    if (!user) {
      throw new CustomError(`No user with the email: ${email}`, 404)
    }
    return res
      .status(200)
      .json({ msg: 'Successfully Updated the Role', data: user })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { email, name, phone } = req.body
    if (!email && !name && !phone) {
      throw new CustomError('Please provide email and password', 400)
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { email, name, phone },
      { new: true, runValidators: true }
    )
    return res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

const updateUserPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      throw new CustomError('Please provide email and password', 400)
    }
    const user = await User.findOne({ _id: req.user.userId })
    const isPasswordCorrect = await user.comparePassword(currentPassword)

    if (!isPasswordCorrect) {
      throw new CustomError('incorrect Current password', 401)
    }
    user.password = newPassword
    await user.save()
    return res.status(200).json({ msg: 'Success!!! Password updated.' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUser,
  getAllAdmin,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  updateUserRole,
}
