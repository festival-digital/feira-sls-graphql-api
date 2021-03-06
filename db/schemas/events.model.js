
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const eventsModel = new Schema({
  name: { type: String, required: true },
  title_key: { type: String, required: true },
  sympla_id: { type: String, required: true, unique: true },
  tickets: [{ type: ObjectId, ref: 'Tickets' }],
  description: { type: String },
  image_url: { type: String },
  cover_url: { type: String },
  site_url: { type: String },
  tags: [{ type: String }],
  sympla_url: { type: String },
  end_date: { type: Date },
  start_date: { type: Date },
  is_free: { type: Boolean, default: false },
  status: { type: String, defualt: 'ACTIVE' },
  productor: { type: ObjectId, ref: 'Users' },
  ticket_url: { type: String },
  activities: [{ type: ObjectId, ref: 'activities' }],
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default eventsModel;
