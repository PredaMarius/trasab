import React, {Fragment, useState} from 'react';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';
import {List} from './order/index';
import './style.css';


export const Comenzi=(props) =>{
    const {match}=props
    const location = useLocation()
    let history = useHistory();
    const { echipa,  currentUser } = location.state

    
    return (
        <Fragment>
            <div>
                <div className='col margine containerTop' >  
                    <div>
                        <div
                            className="selectboxy"
                            sx={{width:'100%'}}
                            name='echipaCurenta'
                        >
                            <div className="bold">Echipa: <span>{echipa ? echipa.denumire:""} </span></div>  
                        </div>
                            <small className="bold">Componenta: </small>
                            <small>{echipa.salariat1?echipa.salariat1.nume:""}</small>
                            <small>{ echipa.salariat2?", "+echipa.salariat2.nume:""}</small>
                            <small>{ echipa.salariat3?", "+echipa.salariat3.nume:""}</small>
                            <small>{echipa.salariat4?", "+ echipa.salariat4.nume:""}</small>
                            <small>{ echipa.salariat5?", "+echipa.salariat5.nume:""}</small>
                    </div>
                    <Button onClick={() => history.goBack()} color="primary" variant="contained" endIcon={<ArrowBackIcon/>}>Back</Button>
                </div>
                    
                <h5 className="align-self-center text-center titlul">COMENZI</h5>
            </div>
            <div className={"col-12"}>
                <List echipa={echipa} currentUser={currentUser} />
            </div>
        </Fragment>
    )
}

export default Comenzi
