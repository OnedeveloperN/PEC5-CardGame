import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    player: {
      type: String,
      required: [true, 'El nombre del jugador es obligatorio'],
      trim: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

export default mongoose.model('Game', gameSchema);