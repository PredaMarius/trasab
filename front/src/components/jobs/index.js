import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClipLoader from "react-spinners/ClipLoader";
import List from '@mui/material/List';

//necesare interogare date
import { useQuery } from '@apollo/client';
import { LIST_JOBS} from './queries';
import {Post} from './job/job';
import './style.css';   
 

    export const Posturi= props =>{
        const location = useLocation();
        let history = useHistory();
        const { sectie, currentUser } = location.state
        const { data, loading, error } = useQuery(LIST_JOBS, { variables: { idsectie:JSON.parse(sectie.id) } } );
    
        if (loading) return (<ClipLoader color={ 'blue' } loading={ loading } css={{ position: 'absolute', left: '50%', top: '50%' }}  size={ 50 } />);
        if (error) return (<h6>Loading error:{error.message}</h6>);

        return (
            <div className="col-xl-6 col-md-12 xl-50">
            <small className="align-self-center text-center margine ">DEPARTAMENT: { sectie.trdepartment.denumire }</small>
            <br/>
            <small className="align-self-center text-center margine ">SECTIE: { sectie.denumire }</small>
                <h5 className="align-self-center text-center margine titlul">POSTURI DE LUCRU</h5>
                <List sx={{ width: '100%' }} component="nav">
                    {data && data.trjobs && data.trjobs.map((post, index)=>(
                       <Post key={post.id} post={ post } index={ index }  sectie={ sectie } currentUser={ currentUser }/>
                    ))}  
                </List>
                <div style={{display: 'flex' ,justifyContent:'flex-end'}}>
                    <Button onClick={() => history.goBack()} color="primary" variant="contained" endIcon={<ArrowBackIcon/>}>Back</Button>
                </div>
            </div>
        )
}

export default Posturi
