export default `
  oneActivity( 
    id: String
    title_key: String
  ): Activity

  allActivities( 
    activity: ActivityInput
  ): [Activity]
`;
