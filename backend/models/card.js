import mongoose from 'mongoose';
import isUrl from 'validator/lib/isURL.js';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: () => 'Ссылка должна быть http(s)-URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],

  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('card', cardSchema);
