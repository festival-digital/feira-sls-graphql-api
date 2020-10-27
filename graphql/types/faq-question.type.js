export default `
  type FAQQuestion {
    id: ID
    name: String
    email: String
    phone: String
    message: String
    user: User
  }

  input FAQQuestionInput {
    id: ID
    name: String
    email: String
    phone: String
    message: String
    user: String
  }
`;
