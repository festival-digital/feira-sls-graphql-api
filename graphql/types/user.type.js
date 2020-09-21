export default `
  type User {
    id: ID
    ida: String
    first_name: String
    last_name: String
    birth_date: String
    email: String
    cpf: String
    isDeleted: Boolean
    tickets: [Ticket]
    my_events: [Event]
  }

  input UserInput {
    id: ID
    ida: String
    first_name: String
    birth_date: String
    cpf: String
    last_name: String
    email: String
    isDeleted: Boolean
  }
`;
