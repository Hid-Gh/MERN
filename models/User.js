const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
JWT_SECRET = "x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H+M4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(mZq4t7w!z$C&F)J@NcRfUjXn2r5u8x/AShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7aPdSgVkYp3s6v9y$B?E(H+MbQeThWmZqF-JaNdRgUkXp2s5v8y/B?D(G+KbPeShV$C&F)J@NcRfUjXn2r5u8x/A?D*G-KaPdw9y$B&E)H@McQfTjWnZr4u7x!A%C*F-J3s6v9y/B?E(H+MbQeThWmZq4t7w!z%C&kXp2s5v8y/A?D(G+KbPeShVmYq3t6w9z"
JWT_LIFETIME="30d"
const UserSchema = new mongoose.Schema({
  fName: {
    type: String,
   required: [true, 'Please provide first name'],
    maxlength: 50,
    minlength: 3,
  },
  lName: {
    type: String,
    required: [true, 'Please provide last name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  nationality: {
    type: String,
    required: [true, 'Please provide your nationality'],
    maxlength: 50,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    JWT_SECRET,
    {
      expiresIn: JWT_LIFETIME,
    }
  )
}
UserSchema.methods.comparePassword = async function (candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}
module.exports = mongoose.model('User', UserSchema)
