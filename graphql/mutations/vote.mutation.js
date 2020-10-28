export default `
  vote (
    vote: VoteInput!
  ): Vote

  unvote (
    vote_id: ID!
  ): Vote
`;
