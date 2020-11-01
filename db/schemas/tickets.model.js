
import { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const ticketsModel = new Schema({
  code: { type: String, required: true, unique: true },
  event: { type: ObjectId, ref: 'events' },
  user: { type: ObjectId, ref: 'users' },
  sympla_id: { type: String },
  sympla_order_id: { type: String },
  sympla_ticket_number: { type: String },
  sympla_qr_code: { type: String },
  sympla_ticket_name: { type: String },
  sympla_sale_price: { type: String },
  sympla_buyer_first_name: { type: String },
  sympla_buyer_last_name: { type: String },
  sympla_buyer_email: { type: String },
}, {
  usePushEach: true,
  timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' },
});

export default ticketsModel;
