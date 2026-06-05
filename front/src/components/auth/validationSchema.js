import * as yup from 'yup'
import { EMAIL, PASSWORD, EMAILRESETARE } from './fieldsNames'

const MIN_PASSWORD_LENGTH = 4

const REQUIRED_MESSAGE = 'Acest camp este bligatoriu!'
const INVALID_EMAIL_FORMAT = 'Email invalid!'
const PASSWORD_TOO_SHOWRT = `Parola trebuie sa contina cel putin ${MIN_PASSWORD_LENGTH} caractere!`

// export default yup.object({
//   [EMAIL]: yup
//     .string()
//     .required(REQUIRED_MESSAGE)
//     .email(INVALID_EMAIL_FORMAT),
  
//   [PASSWORD]: yup
//     .string()
//     .required(REQUIRED_MESSAGE)
//     .min(MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHOWRT),

// })


export default yup.object({

  [EMAIL]: yup
      .string()
      .test(
        'oneOfRequired',
        REQUIRED_MESSAGE,
        function(item) {
          return (this.parent[EMAIL] || this.parent[EMAILRESETARE])
        })
        // .email(INVALID_EMAIL_FORMAT)  
   ,
  
  [PASSWORD]:yup
        .string()
        .test(
          'oneOfRequired',
          REQUIRED_MESSAGE,
          function(item) {
            return (this.parent[PASSWORD] || this.parent[EMAILRESETARE])
          })
        .min(MIN_PASSWORD_LENGTH, PASSWORD_TOO_SHOWRT),

  [EMAILRESETARE]:yup
          .string()
          .email(INVALID_EMAIL_FORMAT)
})