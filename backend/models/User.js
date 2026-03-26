import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: false, default: null },
  companyName: { type: String, required: false, default: '' },
  role:        { type: String, required: false, default: 'user' },
  googleId:    { type: String, default: null },
  picture:     { type: String, default: null },
}, { timestamps: true })

export default mongoose.model('User', userSchema)