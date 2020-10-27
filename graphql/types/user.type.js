export default `
  type User {
    id: ID
    ida: String
    first_name: String
    last_name: String
    display_name: String
    birth_date: String
    old: Int
    tickets: [Ticket]
    my_events: [Event]
    city: String
    state: String
    gender: String
    other_gender: String
    skin_color: String
    other_skin_color: String
    has_disability: Boolean
    disability: String
    status: String
  }

  input UserInput {
    id: ID
    ida: String
    first_name: String
    last_name: String
    display_name: String
    birth_date: String
    old: Int
    city: String
    state: String
    gender: String
    other_gender: String
    skin_color: String
    other_skin_color: String
    has_disability: Boolean
    disability: String
    status: String
  }
`;
