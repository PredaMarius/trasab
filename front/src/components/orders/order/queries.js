import { gql } from '@apollo/client';
export const  QUERY_NAME = "trorders";

export const ORDERS_LIST = gql`  
query( $produs:String, $trjob:ID, $numarBon:Int){
    trorders(sort: "NumarBon:desc", limit:1000, where:{ NumarBon:$numarBon,Produs:$produs, trstatuses:{trjob:{id:$trjob}}}){
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
        trjob{
          id
        }
        NrRepere
        NrRepereBifate
      }
      trordercontents{
        NrCrt
        id
        Rand1
        Supliment1
        Rand2
        Supliment2
        Rand3
        Supliment3
        Rand4
        Supliment4
        Rand5
        Supliment5
        Produs
        tritemoperations(where:{trjob:{id:$trjob}}){
          id
        	trjob{
            id
            denumire
            finala
          }
          Finalizat
          utilizator
          datamodificare
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
        }
      }
    }

  	 
}

`;


