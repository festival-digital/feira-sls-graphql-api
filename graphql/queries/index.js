import user from './user.query';

export default `
  type Query {
    ${user}
  }
`;
