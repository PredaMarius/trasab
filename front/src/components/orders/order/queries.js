import { gql } from '@apollo/client';
export const  QUERY_NAME = "trorders";

export const ORDERS_LIST = gql`  
  query($finalizata:Int, $produs:String){
    trorders(sort: "NumarBon:desc", limit:1000, where:{ Finalizata_lt:$finalizata, Produs:$produs }){
      id
      NumarBon
      Data
      DenumireFirma
      Finalizata
      Produs
      DenumireCursa
  	} 
}
`;

