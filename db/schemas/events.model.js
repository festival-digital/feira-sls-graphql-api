
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const eventsModel = new Schema({
  name: { type: String, required: true },
  sympla_id: { type: String, required: true, unique: true },
  tickets: [{ type: ObjectId, ref: 'Tickets' }],
  productor: { type: ObjectId, ref: 'Users' },
  activities: [{ type: ObjectId, ref: 'Activities' }],
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default eventsModel;
