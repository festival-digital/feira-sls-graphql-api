export default `
  type Event {
    id: ID
    name: String
    sympla_id: String
    tickets: Ticket
    productor: User
    activities: [Activity]
  }

  input EventInput {
    id: ID
    sympla_id: String
    productor: String
    name: String
  }
`;
