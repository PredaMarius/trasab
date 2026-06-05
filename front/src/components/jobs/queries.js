import { gql } from '@apollo/client';

export const LIST_JOBS = gql`  
  query($idsectie:Int!) {
    trjobs(sort: "ordine:asc", where:{trsection:{id:$idsectie}}){
      id
      denumire
      descriere
      cod
      ordine
      finala
      afisarerand
      trsection{
        id
        denumire
        trdepartment{
          id
          denumire
        }
      }
    }
  }
`;