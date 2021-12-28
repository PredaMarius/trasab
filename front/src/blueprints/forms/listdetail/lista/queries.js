import { gql } from '@apollo/client';

//lista utilizatori => data.users[]

export const QUERY_NAME = 'users';

export const LIST_QUERY = gql`
  query  {
    users{
      id
      email,  
    }
  }
`;