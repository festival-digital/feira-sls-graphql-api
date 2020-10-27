
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const faqQuestionModel = new Schema({
  name: { type: String },
  email: { type: String },
  phone: [{ type: String }],
  message: { type: String },
  user: { type: ObjectId, ref: 'users' },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default faqQuestionModel;
