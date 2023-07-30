const mongoose = require('mongoose')
const validator = require('validator')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide Name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide name'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please Provide Password'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  const salt = 10
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { role: this.role, userId: this._id, username: this.name },
    process.env.JWT,
    { expiresIn: '30d' }
  )
}

module.exports = mongoose.model('User', userSchema)
