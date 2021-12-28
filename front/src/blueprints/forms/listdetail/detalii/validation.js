export const validate=(values)=>{

  var erori=[]

    if(values && !values.email){
      erori.push('Eroare:Nu ati completat rubrica: Email')
    }

    if(values && !values['role.id']){
      erori.push('Nu ati completat rubrica: Rol')
    }

    if(values && !values.Oras){
      erori.push('Eroare:Nu ati completat rubrica: Oras')
    }

    if(values && !values.Adresa){
      erori.push('Eroare:Nu ati completat rubrica: Adresa')
    }

   

    if(values && !values.Judet){
      erori.push('Eroare:Nu ati completat rubrica: Judet')
    }

    if(values && !values.id && !values.password){
      erori.push('Eroare:Nu ati completat rubrica: Parola')
    }

    if(values && !values.id && values.password!==values.confirmareParola ){
      erori.push('Eroare:Confirmarea parolei nu este corecta!')
    }

    if(values && 
        (
        (values.DiscountJV && values.DiscountJV>100) || 
        (values.DiscountRO && values.DiscountRO>100) || 
        (values.DiscountRE && values.DiscountRE>100) || 
        (values.DiscountUG && values.DiscountUG>100) || 
        (values.DiscountPI && values.DiscountPI>100) || 
        (values.DiscountJO && values.DiscountJO>100) || 
        (values.DiscountTR && values.DiscountTR>100) || 
        (values.DiscountCO && values.DiscountCO>100) || 
        (values.DiscountSR && values.DiscountSR>100)
        )
       ){
      erori.push('Eroare:Nu se pot acorda discount-uri mai mari de 100%')
    }

    if(values 
      && (
        (!values.DiscountJV && values.DiscountJV!==0)  || 
        (!values.DiscountRO && values.DiscountRO!==0)  || 
        (!values.DiscountRE && values.DiscountRE!==0)  || 
        (!values.DiscountUG && values.DiscountUG!==0)  || 
        (!values.DiscountPI && values.DiscountPI!==0)  || 
        (!values.DiscountJO && values.DiscountJO!==0)  || 
        (!values.DiscountTR && values.DiscountTR!==0)  || 
        (!values.DiscountCO && values.DiscountCO!==0)  || 
        (!values.DiscountSR && values.DiscountSR!==0)   
        )
      ){
      erori.push('Eroare:Nu se accepta discount-uri necompletate!')
    }

    var existaErori=erori.length>0?true:false

    return({erori:erori, existaErori:existaErori}) 
  
  }

  