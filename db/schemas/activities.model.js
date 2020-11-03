
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const activitiesModel = new Schema({
  title: { type: String },
  title_key: { type: String },
  description: { type: String },
  image_url: { type: String },
  tags: [{ type: String }],
  end_date: { type: Date },
  start_date: { type: Date },
  subscription_start_date: { type: Date },
  subscription_end_date: { type: Date },
  has_subscription: { type: Boolean },
  subscription_url: { type: Boolean },
  subscribeds: [{ type: ObjectId, ref: 'users' }],
  type: { type: String },
  streaming_url: { type: String },
  shows: [{ type: ObjectId, ref: 'shows' }],
  event: { type: ObjectId, ref: 'Events' },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default activitiesModel;
