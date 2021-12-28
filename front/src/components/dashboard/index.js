import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import List from '@mui/material/List';
import { useQuery } from '@apollo/client';
import { LIST_TEAMS_USER} from './queries';
import {PostComenzi} from './postcomenzi/postcomenzi';
import './style.css';   

export const PosturiComenzi=({ currentUser }) =>{                
    const {data, loading, error}=useQuery(LIST_TEAMS_USER, {variables: {iduser: JSON.parse(currentUser?currentUser.id:0)}});

    if (loading) return (<ClipLoader color={'blue'} loading={loading } css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
    if (error) return (<h6>Loading error:{error.message }</h6>);

    return (
        <div className="col-xl-6 col-md-12 xl-50">
            <h5 className="align-self-center text-center margine titlul">COMENZI ECHIPE</h5>
            <p className="align-self-center text-center ">responsabil: {currentUser.nume}</p>
            <List sx={{ width: '100%' }} component="nav">
                {data.trteams && data.trteams.map((echipa, index)=>(
                    <PostComenzi echipa={echipa} index={index} currentUser={currentUser}/>
                )) } 
            </List>
        </div>
    )
}

export default PosturiComenzi
