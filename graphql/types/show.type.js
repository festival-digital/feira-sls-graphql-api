export default `
  type Show {
    id: ID
    title: String
    url: String
    activity: Activity
    type: String
    votes: [Vote]
  }

  input ShowInput {
    id: ID
    title: String
    url: String
    activity: String
    type: String
  }
`;
