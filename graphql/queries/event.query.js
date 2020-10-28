export default `
  oneEvent( 
    id: String
    title_key: String
  ): Event

  allEvents( 
    Event: EventInput
  ): [Event]
`;
