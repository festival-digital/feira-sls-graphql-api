export default `
  type Activity {
    id: ID
    event: Event
    skills: [String]
  }

  input ActivityInput {
    id: ID
    event: String
  }
`;
