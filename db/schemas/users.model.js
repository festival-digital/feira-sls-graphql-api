import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const usersModel = new Schema({
  ida: { type: String, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  display_name: { type: String },
  birth_date: { type: Date },
  tickets: [{ type: ObjectId, ref: 'tickets' }],
  my_events: [{ type: ObjectId, ref: 'Events' }],
  city: { type: String },
  state: { type: String },
  old: { type: Number },
  other_gender: { type: String },
  gender: { type: String },
  skin_color: { type: String },
  other_skin_color: { type: String },
  has_disability: { type: Boolean, default: false },
  disability: { type: String },
  is_deleted: { type: Boolean, default: false },
  status: { type: String, default: 'IN_REGISTER' },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default usersModel;
