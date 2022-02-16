import { gql } from '@apollo/client';
export const  QUERY_NAME = "trorders";

export const ORDERS_LIST = gql`  
  query($finalizata:Int, $produs:String, $cursa:String, $trjob:ID){
    trorders(sort: "NumarBon:desc", limit:1000, where:{ Finalizata_lt:$finalizata, Produs:$produs, DenumireCursa:$cursa }){
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

export const RUTE_LIST = gql`  
  query {
    trcursesConnection{
    groupBy{
      Ruta{
        key
      }
    }
  }
}
`;

export const CURSE_LIST = gql`  
  query( $ruta:String){
    trcurses(sort: "dataCursa:desc", limit:1000, where:{ Ruta:$ruta }){
      id
      idDevco
      NrCursa
      Ruta
      blocat
  	} 
}
`;


