export default `
  type Ticket {
    id: ID
    code: String
    event: Event
    user: User
    sympla_id: String
    sympla_order_id: String
    sympla_qr_code: String
    sympla_ticket_name: String
    sympla_sale_price: String
    sympla_buyer_first_name: String
    sympla_buyer_last_name: String
    sympla_buyer_email: String
  }

  input TicketInput {
    id: ID
    code: String
    event: String
    user: String
    sympla_id: String
    sympla_order_id: String
    sympla_qr_code: String
    sympla_ticket_name: String
    sympla_sale_price: String
    sympla_buyer_first_name: String
    sympla_buyer_last_name: String
    sympla_buyer_email: String
  }
`;
