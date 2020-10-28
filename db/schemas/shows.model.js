
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const showsModel = new Schema({
  title: { type: String },
  url: { type: String },
  activity: { type: ObjectId, ref: 'activities' },
  type: { type: String, default: 'video' },
  votes: { type: ObjectId, ref: 'votes' },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default showsModel;
