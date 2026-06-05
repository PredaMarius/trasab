import { gql } from '@apollo/client';



//interogare date utilizator dupa id
export const DETAIL_QUERY = gql`
 query ($id:ID!) {
   user(id:$id){
    id
    username
    email
    blocked
    provider
    Denumire
    CodFiscal
    AtributFiscal
    RegCom
    Oras
    Adresa
    Judet
    Telefon
    Cont
    Banca
    Observatii
    DiscountJV
    DiscountRO
    DiscountRE
    DiscountUG
    DiscountPI
    DiscountJO
    DiscountTR
    DiscountCO
    DiscountSR
    AdaosJV
  	AdaosRO
    AdaosRE
    AdaosUG
    AdaosPI
    AdaosJO
    AdaosTR
   	AdaosCO
    AdaosSR
    Mesaj
    CFG1
    CFG2
    CFG3
    idDevco
    role{
      id
    }
    fotografie{
      url
    }
    createdBy
    created_at
    updatedBy
    updated_at   
    }
  }
`;
//--------------------------------------------------------------------------------------------
export const ADD_MUTATION =gql`
mutation (
$username: String!,
$email:String!,
$provider: String,
$role:ID,
$password: String,
$blocked: Boolean,
$Denumire: String!,
$CodFiscal: String,
$AtributFiscal: String,
$RegCom: String,
$Oras: String!,
$Adresa: String!,
$Judet: String!,
$Telefon: String,
$Cont: String,
$Banca: String,
$Observatii: String,
$DiscountJV: Int,
$DiscountRO: Int,
$DiscountRE: Int,
$DiscountUG: Int,
$DiscountPI: Int,
$DiscountJO: Int,
$DiscountTR: Int,
$DiscountCO: Int,
$DiscountSR: Int,
$AdaosJV: Int,
$AdaosRO: Int,
$AdaosRE: Int,
$AdaosUG: Int,
$AdaosPI: Int,
$AdaosJO: Int,
$AdaosTR: Int,
$AdaosCO: Int,
$AdaosSR: Int,
$Mesaj: String,
$CFG1: String,
$CFG2: String,
$CFG3: String,
$idDevco: Int,
$createdBy:String,
) {
  createUser(input:{data:{
   username: $username,
    email: $email,
    blocked: $blocked,
    provider: $provider,
    role:$role,
    Denumire: $Denumire,
    CodFiscal:$CodFiscal,
    AtributFiscal:$AtributFiscal,
    RegCom:$RegCom,
    Oras:$Oras,
    Adresa:$Adresa,
    Judet:$Judet,
    Telefon:$Telefon,
    Cont:$Cont,
    Banca:$Banca,
    Observatii:$Observatii,
    DiscountJV:$DiscountJV,
    DiscountRO:$DiscountRO,
    DiscountRE:$DiscountRE,
    DiscountUG:$DiscountUG,
    DiscountPI:$DiscountPI,
    DiscountJO:$DiscountJO,
    DiscountTR:$DiscountTR,
    DiscountCO:$DiscountCO,
    DiscountSR:$DiscountSR,
    AdaosJV:$AdaosJV,
  	AdaosRO:$AdaosRO,
    AdaosRE:$AdaosRE,
    AdaosUG:$AdaosUG,
    AdaosPI:$AdaosPI,
    AdaosJO:$AdaosJO,
    AdaosTR:$AdaosTR,
   	AdaosCO:$AdaosCO,
    AdaosSR:$AdaosSR,
    Mesaj:$Mesaj,
    CFG1:$CFG1,
    CFG2:$CFG2,
    CFG3:$CFG3,
    idDevco:$idDevco,
    password:$password,
    createdBy:$createdBy,
  }}) {
    user{
      id
      username
      email
      blocked
      provider
      Denumire
      CodFiscal
      AtributFiscal
      RegCom
      Oras
      Adresa
      Judet
      Telefon
      Cont
      Banca
      Observatii
      DiscountJV
      DiscountRO
      DiscountRE
      DiscountUG
      DiscountPI
      DiscountJO
      DiscountTR
      DiscountCO
      DiscountSR
      AdaosJV
      AdaosRO
      AdaosRE
      AdaosUG
      AdaosPI
      AdaosJO
      AdaosTR
      AdaosCO
      AdaosSR
      Mesaj
      CFG1
      CFG2
      CFG3
      idDevco
      role{
        id
      }
      fotografie{
        url
      }
      createdBy
      created_at
      updatedBy
      updated_at 
    }
  }
 }
`;
//--------------------------------------------------------------------------------------------
export const ADD_FRAGMENT= gql`
  fragment NewFragment on users {
    id
    email
  }
`;


//--------------------------------------------------------------------------------------------

export const UPDATE_MUTATION =gql`
mutation (
$id:ID!,
$username: String!,
$email:String!,
$provider: String,
$role:ID,
$blocked: Boolean,
$Denumire: String!,
$CodFiscal: String,
$AtributFiscal: String,
$RegCom: String,
$Oras: String!,
$Adresa: String!,
$Judet: String!,
$Telefon: String,
$Cont: String,
$Banca: String,
$Observatii: String,
$DiscountJV: Int,
$DiscountRO: Int,
$DiscountRE: Int,
$DiscountUG: Int,
$DiscountPI: Int,
$DiscountJO: Int,
$DiscountTR: Int,
$DiscountCO: Int,
$DiscountSR: Int,
$AdaosJV: Int,
$AdaosRO: Int,
$AdaosRE: Int,
$AdaosUG: Int,
$AdaosPI: Int,
$AdaosJO: Int,
$AdaosTR: Int,
$AdaosCO: Int,
$AdaosSR: Int,
$Mesaj: String,
$CFG1: String,
$CFG2: String,
$CFG3: String,
$idDevco: Int,
$updatedBy:String,
) {
  updateUser(input:{where:{id:$id}, data:{
    username: $username,
    email: $email,
    blocked: $blocked,
    provider: $provider,
    role:$role,
    Denumire: $Denumire,
    CodFiscal:$CodFiscal,
    AtributFiscal:$AtributFiscal,
    RegCom:$RegCom,
    Oras:$Oras,
    Adresa:$Adresa,
    Judet:$Judet,
    Telefon:$Telefon,
    Cont:$Cont,
    Banca:$Banca,
    Observatii:$Observatii,
    DiscountJV:$DiscountJV,
    DiscountRO:$DiscountRO,
    DiscountRE:$DiscountRE,
    DiscountUG:$DiscountUG,
    DiscountPI:$DiscountPI,
    DiscountJO:$DiscountJO,
    DiscountTR:$DiscountTR,
    DiscountCO:$DiscountCO,
    DiscountSR:$DiscountSR,
    AdaosJV:$AdaosJV,
  	AdaosRO:$AdaosRO,
    AdaosRE:$AdaosRE,
    AdaosUG:$AdaosUG,
    AdaosPI:$AdaosPI,
    AdaosJO:$AdaosJO,
    AdaosTR:$AdaosTR,
   	AdaosCO:$AdaosCO,
    AdaosSR:$AdaosSR,
    Mesaj:$Mesaj,
    CFG1:$CFG1,
    CFG2:$CFG2,
    CFG3:$CFG3,
    idDevco:$idDevco,
    updatedBy:$updatedBy,
  }}){
    user{
      id
      username
      email
      blocked
      provider
      Denumire
      CodFiscal
      AtributFiscal
      RegCom
      Oras
      Adresa
      Judet
      Telefon
      Cont
      Banca
      Observatii
      DiscountJV
      DiscountRO
      DiscountRE
      DiscountUG
      DiscountPI
      DiscountJO
      DiscountTR
      DiscountCO
      DiscountSR
      AdaosJV
      AdaosRO
      AdaosRE
      AdaosUG
      AdaosPI
      AdaosJO
      AdaosTR
      AdaosCO
      AdaosSR
      Mesaj
      CFG1
      CFG2
      CFG3
      idDevco
      role{
        id
      }
      fotografie{
        url
      }
      createdBy
      created_at
      updatedBy
      updated_at 
    }
  }
 }
`;

//--------------------------------------------------------------------------------------------

export const DELETE_MUTATION =gql`
mutation ($id:ID!) {
  deleteUser(input: { where: { id: $id } }){
    user {
        username
        email
      }
    }
  }
`;

//-------------------------------------------------roleSource-------------------------------------------
export const ROLE_QUERY = gql`
  query  {
    roles{
      id
      name  
    }
  }
`;

//-------------------------------------------------UPLOAD FOTOGRAFIE-------------------------------------------
export const ADDIMAGE_MUTATION = gql`
 mutation ($refId:ID, $ref:String, $field:String, $file:Upload!) {
  upload(refId: $refId, ref: $ref, field: $field, file: $file) {
    url
  }
}
`;

