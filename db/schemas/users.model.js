
import { Schema } from 'mongoose';

// const { ObjectId } = Schema.Types;

const usersModel = new Schema({
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birth_date: { type: Date, required: true },
  city: { type: Date, required: true },
  country: { type: Date, required: true },
  about: { type: String, required: true },
  instagram: { type: String, required: true },
  facebook: { type: String, required: true },
  tinder: { type: String, required: true },
  relationship: { type: String, required: true },
  genre: { type: String, required: true },
  race: { type: String, required: true },
  lgbtqia: { type: String, required: true },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default usersModel;
