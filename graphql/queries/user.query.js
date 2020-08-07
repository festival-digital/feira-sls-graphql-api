export default `
  user( 
    id: String
    email: String
  ): User

  allUsers( 
    user: UserInput
  ): [User]
`;
