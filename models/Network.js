import mongoose from 'mongoose'

const networkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    ip: { type: String, required: true, unique: true, trim: true },
    mac: [
      {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    ],
    ipvSix: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
)

const Network =
  mongoose.models.Network || mongoose.model('Network', networkSchema)

export default Network
