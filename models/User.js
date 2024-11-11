import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minLength: 6 },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
