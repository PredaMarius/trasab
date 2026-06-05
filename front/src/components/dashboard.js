import React, { Fragment, useEffect } from 'react';
import {PosturiComenzi} from '../components/dashboard/index';
import {getUser, setUser, getToken} from '../localstorage/localstorage';
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery} from '@apollo/client';
import { USER_QUERY} from './queries'
import './style.css';

export const Dashboard= props =>{
    const currentUser=getUser();
    const jwt=getToken();
    const { loading, error, data } = useQuery(USER_QUERY, {variables: {id: getUser()&&getUser().id? getUser().id:0}});

    useEffect(() => {
        if(!currentUser ){
            props.history.push(`${process.env.PUBLIC_URL}/auth/login`);  
        }else{
            if(!loading && jwt && data && data.user) {
                setUser(data.user);
            }
        }
      },[currentUser, props.history, data, jwt, loading])

      if (loading) return (<ClipLoader color={'blue'} loading={loading } css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
      if (error) return (<h6>Loading error:{error.message }</h6>);
  
    return (  
        <Fragment>
            {currentUser && <PosturiComenzi currentUser={data.user}/>}
        </Fragment>
    ) 
}

export default Dashboard
