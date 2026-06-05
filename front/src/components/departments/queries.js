import { gql } from '@apollo/client';

export const LIST_DEPARTMENTS = gql`  
  query {
    trdepartments(sort: "id:asc"){
      id
      denumire
      users_permissions_user{
        id
        nume
      }
    }
  }
`;

