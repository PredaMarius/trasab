import React, {  useState, useEffect } from 'react'
import man from '../../../assets/images/dashboard/man.png'
import {setUser, getUser, getToken} from '../../../localstorage/localstorage'
import { useQuery} from '@apollo/client';
import { USER_QUERY } from '../../auth/queries'
import { withRouter} from 'react-router-dom';
import {strapiUrl} from '../../../config/strapi';

const User_panel =(props)=> {
    
    const [username, setUserName]=useState('');
    const [photo, setPhoto]=useState('#');

    const { loading, error, data } = useQuery(USER_QUERY, {variables: {id: getUser()&&getUser().id? getUser().id:0}});

    const jwt=getToken();
      
    

    useEffect(() => {
      if(!loading){
        if(jwt && data && data.user && data.user.nume) {
          setUser(data.user);
          setUserName(data.user.nume);
          setPhoto(data.user.fotografie? strapiUrl+data.user.fotografie.url:man)
        }else{
          props.history.push(`${process.env.PUBLIC_URL}/auth/logout`);
        }
      }
      }, [data]);


  
      if (loading) {
        return <div>Loading...</div>
      }
      if (error) {
        return <div>Error! {error.message}</div>
      }
   
    return (
        <div>
            <div className="sidebar-user text-center">
                <div><img className="img-60 rounded-circle lazyloaded blur-up" src={photo} alt="#" />
                </div>
                <h6 className="mt-3 f-14">{username}</h6>
              
            </div>
        </div>
    )
}

export default withRouter(User_panel)

