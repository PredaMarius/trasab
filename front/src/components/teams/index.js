import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClipLoader from "react-spinners/ClipLoader";
import List from '@mui/material/List';
import { useQuery } from '@apollo/client';
import { LIST_TEAMS} from './queries';
import { Echipa } from './team/team';
import './style.css';   


    export const Echipe= props =>{
        const location = useLocation();
        let history = useHistory();
        const { post, currentUser } = location.state
        const { data, loading, error } = useQuery(LIST_TEAMS, {
            variables: {idjob:JSON.parse(post.id)},
            fetchPolicy: "cache-and-network",
            notifyOnNetworkStatusChange: true,
        });
        
        if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
        if (error) return (<h6>Loading error:{error.message}</h6>);

        return (
            <div className="col-xl-6 col-md-12 xl-50">
                <small className="align-self-center text-center margine ">DEPARTAMENT: {post.trsection.trdepartment.denumire}</small>
                <br/>
                <small className="align-self-center text-center margine ">SECTIE: {post.trsection.denumire}</small>
                <br/>
                <small className="align-self-center text-center margine ">POST LUCRU: {post.denumire}</small>
                <h5 className="align-self-center text-center margine titlul">ECHIPE DE LUCRU</h5>
                <List sx={{ width: '100%' }} component="nav">
                    {data && data.trteams && data.trteams.map((echipa, index)=>(
                        <Echipa key={echipa.id} echipa={echipa} index={index} post={post} currentUser={currentUser}/>
                    )) }  
                </List>
            
                <small>Atentie! Seful de echipa NU face automat si parte din echipa. Trebuie trecut ca membru daca intr-adevar face parte din echipa.</small>
                <br/>
                <small>Nota. Acces la setarea echipelor il au : seful de departament, seful de sectie si seful de echipa.</small>
                <div style={{display: 'flex' ,justifyContent:'flex-end'}}>
                    <Button onClick={() => history.goBack()} color="primary" variant="contained" endIcon={<ArrowBackIcon/>}>Back</Button>
                </div>
            </div>
        )
}

export default Echipe
