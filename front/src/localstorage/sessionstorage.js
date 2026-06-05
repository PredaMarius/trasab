const NRBONURI='nrBonuri';



//-----------------------------------------------------
export const setSTNrBonuri=(value,nrBonuri=NRBONURI)=>{
    if(localStorage){
        sessionStorage.setItem(nrBonuri,(JSON.stringify(value)))
    }
}

export const getSTNrBonuri=(nrBonuri=NRBONURI)=>{
    if(sessionStorage && sessionStorage.getItem(nrBonuri)){
        return JSON.parse(sessionStorage.getItem(nrBonuri));
    }
    return null;
}

export const removeSTNrBonuri=(nrBonuri=NRBONURI)=>{
    if(sessionStorage){
        sessionStorage.removeItem(nrBonuri)
    }
}