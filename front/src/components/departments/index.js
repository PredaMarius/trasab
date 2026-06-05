import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import List from '@mui/material/List';
import { useQuery } from '@apollo/client';
import { LIST_DEPARTMENTS} from './queries';
import {Departament} from './department/department'
import './style.css'   


    export const Departamente=props =>{
        const { data, loading, error } = useQuery(LIST_DEPARTMENTS);
        
        if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
        if (error) return (<h6>Loading error:{error.message}</h6>);

        return (
            <div className="col-xl-6 col-md-12 xl-50">
                <h5 className="align-self-center text-center margine titlul">DEPARTAMENTE</h5>
                <List sx={{ width: '100%' }} component="nav">
                    {data && data.trdepartments && data.trdepartments.map((departament, index)=>(
                        <Departament key={departament.id} departament={departament} index={index} currentUser={props.currentUser}  sef={departament.users_permissions_user? departament.users_permissions_user.nume:""}/> 
                    )) }  
                </List>
                <small>Nota. Sefii de departamente/sectii se introduc in Devco.</small>
            </div>
        )
    }

export default Departamente
