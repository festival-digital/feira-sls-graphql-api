export default `
  type Event {
    id: ID
    name: String
    title_key: String
    sympla_id: String
    tickets: Ticket
    description: String
    image_url: String
    cover_url: String
    site_url: String
    ticket_url: String
    tags: [String]
    sympla_url: String
    start_date: String
    end_date: String
    is_free: Boolean
    status: String
    productor: User
    activities: [Activity]
  }

  input EventInput {
    id: ID
    name: String
    title_key: String
    sympla_id: String
    description: String
    image_url: String
    cover_url: String
    ticket_url: String
    site_url: String
    tags: [String]
    sympla_url: String
    start_date: String
    end_date: String
    is_free: Boolean
    status: String
    productor: String
  }
`;
