export default `
  oneUser( 
    id: String
    email: String
  ): User

  allUsers( 
    user: UserInput
  ): [User]
`;
