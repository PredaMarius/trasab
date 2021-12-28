import { gql } from '@apollo/client';
// autentificare
export const LOGIN_MUTATION = gql`
 mutation Login($email:String!, $password:String!) {
  login(input: {
    identifier: $email,
    password: $password
  }){
    user{
      id
      username
      email
      confirmed
      blocked
      role{
        id
        name
        type
      }
    }
    jwt
  }
}
`;
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
//--------------------------------------------------------------------------------------------
export const RESETPASSWORD_MUTATION =gql`
mutation (
$code:String!,
$password: String!,
$passwordConfirmation:String!
) {
  resetPassword(input:{where:{id:$id}, data:{
    code: $code,
    password: $password,
    passwordConfirmation: $passwordConfirmation
}}){
  jwt
  user{
      id
    }
  }
 }
`;

//--------------------------------------------------------------------------------------------
export const FORGOTPASSWORD_MUTATION =gql`
mutation (
$email:String!
) {
  forgotPassword(
    email: $email
    ){
  ok
  }
 }
`;
