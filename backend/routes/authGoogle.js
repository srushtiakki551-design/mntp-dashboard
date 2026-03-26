import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post('/google', async (req, res) => {
  const { credential } = req.body
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const { email, name, picture, sub: googleId } = ticket.getPayload()

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ name, email, googleId, picture, password: null })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, picture } })
  } catch (err) {
    res.status(401).json({ message: 'Google auth failed' })
  }
})

export default router