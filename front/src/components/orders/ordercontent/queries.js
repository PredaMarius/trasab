import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query  {
    users(sort: "nume:asc"){
      id
      nume 
    }
  }
`;
export const OPERATIONS_COUNT_ALL = gql`
query($idComanda:ID!){
  toate:tritemoperationsConnection(where:{trordercontent:{trorder:$idComanda}}) {
        aggregate {
          count
        }
      }
  finalizate:tritemoperationsConnection(where:{Finalizat:1, trordercontent:{trorder:$idComanda}}) {
    aggregate {
      count
    }
  }
  finaletoate:tritemoperationsConnection(where:{trordercontent:{trorder:$idComanda}, final:1}) {
        aggregate {
          count
        }
      }
  finalefinalizate:tritemoperationsConnection(where:{Finalizat:1, trordercontent:{trorder:$idComanda},final:1}) {
    aggregate {
      count
    }
  }
  trorder(id:$idComanda) {
    Finalizata
  } 
}
`;


export const ORDER_CONTENT = gql`  
  query( $id:ID!, $trjob:ID){
    trorder(id:$id){
      id
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
          DenumireJob
          id
        	trjob{
            id
            finala
          }
          Finalizat
          numeSalariat1
          numeSalariat2
          numeSalariat3
          numeSalariat4
          numeSalariat5
          utilizator
          datamodificare
          final
          denumireEchipa
          trteam{
            id
            iduser{
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
$finalizat:Boolean,
$utilizator:String,
$idsalariat1:ID,
$idsalariat2:ID,
$idsalariat3:ID,
$idsalariat4:ID,
$idsalariat5:ID,
$trteam:ID,
$numesalariat1:String,
$numesalariat2:String,
$numesalariat3:String,
$numesalariat4:String,
$numesalariat5:String
$numetrteam:String

) {
  updateTritemoperation(input:{where:{id:$id}, data:{
    Finalizat:$finalizat
    utilizator:$utilizator
    salariat1:$idsalariat1,
    salariat2:$idsalariat2,
    salariat3:$idsalariat3,
    salariat4:$idsalariat4,
    salariat5:$idsalariat5,
    trteam:$trteam,
    numeSalariat1:$numesalariat1,
    numeSalariat2:$numesalariat2,
    numeSalariat3:$numesalariat3,
    numeSalariat4:$numesalariat4,
    numeSalariat5:$numesalariat5,
    denumireEchipa:$numetrteam
  }}){
    tritemoperation{
      id
      Finalizat
      updated_at
      utilizator
      datamodificare
      final
      denumireEchipa
      numeSalariat1
      numeSalariat2
      numeSalariat3
      numeSalariat4
      numeSalariat5
  }
 }
}
`;


export const UPDATE_STATUS_ORDER =gql`
mutation (
  $idComanda:ID!,
  $Finalizata:Int,
) {
  updateTrorder(input:{where:{id:$idComanda}, data:{
    Finalizata:$Finalizata
  }}){
    trorder{
      id
      Finalizata
    }
  }
}
`;


export const STATUS_ID =gql`
query($idComanda:Int, $idOperatie:Int) {
  trstatuses(where:{trorder:{id:$idComanda}, trjob:{id:$idOperatie}})
  {
    id
    NrRepereBifate
  }
}
`;

export const STATUS_UPDATE =gql`
mutation (
  $id:ID!
  $NrRepereBifate:Int,
) {
  updateTrstatus(input:{where:{id:$id}, data:{ NrRepereBifate:$NrRepereBifate}}){
    trstatus{
      id
      NrRepere
      NrRepereBifate
    }
  }
}
`;

