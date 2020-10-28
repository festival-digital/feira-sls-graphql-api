export default `
  type Vote {
    id: ID
    user: User
    rate_point: Int
  }

  input VoteInput {
    id: ID
    user: String
    rate_point: Int
  }
`;
