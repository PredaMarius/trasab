import { gql } from '@apollo/client';

export const LIST_SECTIONS = gql`  
 query($iddepartament:Int!) {
    trsections(sort: "denumire:asc", where:{trdepartment:{id:$iddepartament}}){
      id
      denumire
      descriere
      users_permissions_user{
        id
        nume
      }
      trdepartment{
        id
        denumire
      }
    }
  }
`;
