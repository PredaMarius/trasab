import LZString from 'lz-string';

const TOKEN_KEY='jwt';
const USER='user';
const RUTA='ruta';
const CURSA='cursa';
const CAUTA='cauta';


export const setToken=(value, tokenKey=TOKEN_KEY)=>{
    if(localStorage){
        localStorage.setItem(tokenKey,LZString.compress(JSON.stringify(value)))
        //localStorage.setItem(user,(JSON.stringify(value)))
    }
}

export const clearToken=(tokenKey=TOKEN_KEY)=>{
    if(localStorage){
        localStorage.clear()
    }
}

export  const getToken=(tokenKey=TOKEN_KEY)=> {
    if(localStorage && localStorage.getItem(tokenKey)){
        return JSON.parse(LZString.decompress(localStorage.getItem(tokenKey)));
        //return JSON.parse(localStorage.getItem(user));
    }    
  }


export const setUser=(value,user=USER)=>{
    if(localStorage){
        localStorage.setItem(user,LZString.compress(JSON.stringify(value)))
        //localStorage.setItem(user,(JSON.stringify(value)))
    }
}

export const getUser= (user=USER)=>{
    if(localStorage && localStorage.getItem(user)){
        return JSON.parse(LZString.decompress(localStorage.getItem(user)));
        //return JSON.parse(localStorage.getItem(user));
    }
    return null;
}

//-----------------------------------------------------
export const setLSRuta=(value,ruta=RUTA)=>{
    if(localStorage){
        localStorage.setItem(ruta,(JSON.stringify(value)))
    }
}

export const getLSRuta=(ruta=RUTA)=>{
    if(localStorage && localStorage.getItem(ruta)){
        return JSON.parse(localStorage.getItem(ruta));
    }
    return null;
}

//-----------------------------------------------------
export const setLSCursa=(value,cursa=CURSA)=>{
    if(localStorage){
        localStorage.setItem(cursa,(JSON.stringify(value)))
    }
}

export const getLSCursa=(cursa=CURSA)=>{
    if(localStorage && localStorage.getItem(cursa)){
        return JSON.parse(localStorage.getItem(cursa));
    }
    return null;
}

//-----------------------------------------------------
export const setLSCauta=(value,cauta=CAUTA)=>{
    if(localStorage){
        localStorage.setItem(cauta,(JSON.stringify(value)))
    }
}

export const getLSCauta=(cauta=CAUTA)=>{
    if(localStorage && localStorage.getItem(cauta)){
        return JSON.parse(localStorage.getItem(cauta));
    }
    return null;
}

