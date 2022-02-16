import { gql } from '@apollo/client';
export const  QUERY_NAME = "trorders";

export const ORDERS_LIST = gql`  
 query($finalizata:Int, $produs:String, $trjob:ID){
    trorders(sort: "NumarBon:desc", limit:1000, where:{ Finalizata_lt:$finalizata, Produs:$produs}){
      id
      NumarBon
      Data
      DenumireFirma
      Finalizata
      Produs
      DenumireCursa
      DenumireRuta
      trstatuses(where:{trjob:{id:$trjob}}){
        trjob{
          id
        }
        NrRepere
        NrRepereBifate
      }
  	} 
}
`;


