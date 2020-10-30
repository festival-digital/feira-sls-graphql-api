
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const votesModel = new Schema({
  rate_point: { type: Number, required: true },
  user: { type: ObjectId, ref: 'users', required: true },
  show: { type: ObjectId, ref: 'shows', required: true },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default votesModel;
