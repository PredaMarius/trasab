export  const dataFormatRO=(timestamp)=>{
    var data= new Date(Date.parse(timestamp)*1)
    return data.toLocaleString('ro-RO')
  }