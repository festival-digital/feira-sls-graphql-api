
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const activitiesModel = new Schema({
  skills: [{ type: String }],
  event: { type: ObjectId, ref: 'Events' },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default activitiesModel;
