export default `
  oneUser( 
    id: String
    ida: String
    email: String
  ): User

  allUsers( 
    user: UserInput
  ): [User]
`;
