export default `
  createUser(
    user: UserInput
  ): User

  updateUser(
    user: UserInput
  ): User
  
  addTicketIntoUser(
    code: String
    user_id: String
    sympla_event_id: String
  ): User

`;
