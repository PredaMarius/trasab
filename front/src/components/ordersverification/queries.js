import { gql } from '@apollo/client';

export const LIST_TEAMS_USER = gql`  
  query($iduser:Int, $idjob:Int!) {
    trteams( where:{ iduser:{id:$iduser}, trjob:{id:$idjob}}){
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
      }
      trjob{
        id
        denumire
        finala
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