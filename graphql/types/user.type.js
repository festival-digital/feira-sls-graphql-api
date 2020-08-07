export default `
  type User {
    id: ID
    first_name: String
    last_name: String
    email: String
  }

  input UserInput {
    id: ID
    first_name: String
    last_name: String
    email: String
  }
`;
