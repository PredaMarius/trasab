import { gql } from '@apollo/client';
//--------------------------------------------------------------------------------------------
//interogare date utilizator dupa id
export const USER_QUERY = gql`
 query ($id:ID!) {
   user(id:$id){
    id
    username
    email
    nume
    fotografie{
      url
    }
    role{
      name
      type
      description
    }
      
    }
  
  }
`;

export const LIST_JOBS = gql`  
  query {
    trjobs{
      id
      denumire
      descriere
      cod
      ordine
      finala
      afisarerand
      idsectie
    }
  }
`;

export const LIST_SECTIONS = gql`  
  query{
    trsections{
      id
      denumire
      descriere
      iduser
      iddepartament
    }
  }
  `;

export const LIST_DEPARTMENTS = gql`  
  query {
    trdepartments{
      id
      denumire
      iduser
    }
  }
`;