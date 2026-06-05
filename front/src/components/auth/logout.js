import React, { useEffect } from 'react'
import { withRouter} from 'react-router-dom';
import {clearToken} from '../../localstorage/localstorage';

export const Logout =props=> { 
    useEffect(() => {
      clearToken();
      props.history.push(`${process.env.PUBLIC_URL}/auth/login`);  
    })

    return(
     <div>Unloading....</div>   
    )
}
export default withRouter(Logout)
