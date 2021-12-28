import LZString from 'lz-string';

const TOKEN_KEY='jwt';
const USER='user';

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




