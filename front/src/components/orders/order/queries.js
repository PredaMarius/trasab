import { gql } from '@apollo/client';
export const  QUERY_NAME = "trorders";

export const ORDERS_LIST = gql`  
query( $produs:String, $trjob:ID, $numarBon:Int){
    trorders(sort: "NumarBon:desc", limit:5, where:{ NumarBon:$numarBon,Produs:$produs, trstatuses:{trjob:{id:$trjob}}}){
      id
      NumarBon
      Data
      DenumireFirma
      Finalizata
      Produs
      DenumireCursa
      DenumireRuta
      Serviciu
      trstatuses(where:{trjob:{id:$trjob}}){
        NrRepere
        NrRepereBifate
      }
    }  	 
}

`;


