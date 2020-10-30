export default `
  type Vote {
    id: ID
    user: User
    show: Show
    rate_point: Int
  }

  input VoteInput {
    id: ID
    user: String
    rate_point: Int
    show: String
  }
`;
