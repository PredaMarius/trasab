import React from 'react';
import { useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import List from '@mui/material/List';
import { useQuery } from '@apollo/client';
import { LIST_SECTIONS } from './queries';
import {Sectie} from './section/section';
import './style.css';   


    export const Sectii=props=>{
        const location = useLocation();
        const { departament, currentUser } = location.state
        const { data, loading, error } = useQuery(LIST_SECTIONS, {variables: {iddepartament:JSON.parse(departament.id)}});
                

        if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
        if (error) return (<h6>Loading error:{error.message}</h6>);

        return (
            <div className="col-xl-6 col-md-12 xl-50">
                <small className="align-self-center text-center margine ">DEPARTAMENT: {departament.denumire}</small>
                <h5 className="align-self-center text-center margine titlul">SECTII</h5>
                <List sx={{ width: '100%' }} component="nav">
                    {data && data.trsections && data.trsections.map((sectie, index)=>(
                        <Sectie  key={sectie.id} sectie={sectie} index={index} currentUser={currentUser} sef={sectie.users_permissions_user? departament.users_permissions_user.nume:""}/> 
                    )) }  
                </List>
                <small>Nota. Sefii de departamente/sectii se introduc in Devco.</small>
            </div>
        )
}

export default Sectii
