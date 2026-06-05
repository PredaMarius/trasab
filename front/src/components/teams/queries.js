import { gql } from '@apollo/client';

export const LIST_TEAMS = gql`  
 query($idjob:Int!) {
    trteams(sort: "denumire:asc", where:{ trjob:{id:$idjob}}){
      id
      denumire
      salariat1{
        id
        nume
      }
      salariat2{
        id
        nume
      }
      salariat3{
        id
        nume
      }
      salariat4{
        id
        nume
      }
      salariat5{
        id
        nume
      }
      iduser{
        id
        nume
        role{
          id
          name
          type
        }
      }
      trjob{
        id
        denumire
        trsection{
          id
          users_permissions_user{
            id
            nume
          }
          trdepartment{
            id
            users_permissions_user{
              id
              nume
            }
          }
        }
      }
    }
  }
`;


//------------------------------------------------------------------------------------------------
export const UPDATE_MUTATION =gql`
mutation (
$id:ID!,
$iduser:ID,
$idsalariat1:ID,
$idsalariat2:ID,
$idsalariat3:ID,
$idsalariat4:ID,
$idsalariat5:ID
) {
  updateTrteam(input:{where:{id:$id}, data:{
    salariat1: $idsalariat1,
    salariat2: $idsalariat2,
    salariat3: $idsalariat3,
    salariat4: $idsalariat4,
    salariat5: $idsalariat5,
    iduser:$iduser
  }}){
    trteam{
      id
  }
 }
}
`;

//------------------------------------------------------------------------------------------------
export const USER_QUERY = gql`
  query  {
    users(sort: "nume:asc"){
      id
      nume 
    }
  }
`;