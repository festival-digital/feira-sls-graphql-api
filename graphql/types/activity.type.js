export default `
  type Activity {
    id: ID
    title: String
    title_key: String
    description: String
    tags: [String]
    end_date: String
    start_date: String
    subscription_start_date: String
    subscription_end_date: String
    has_subscription: Boolean
    subscription_url: String
    subscribeds: [User]
    type: String
    streaming_url: String
    shows: [Show]
    event: Event
  }

  input ActivityInput {
    id: ID
    title: String
    title_key: String
    description: String
    tags: [String]
    end_date: String
    start_date: String
    subscription_start_date: String
    subscription_end_date: String
    has_subscription: Boolean
    subscription_url: String
    type: String
    streaming_url: String
    event: String
  }
`;
