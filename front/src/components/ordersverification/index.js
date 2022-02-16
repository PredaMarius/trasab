import React, {Fragment, useState} from 'react';

import { useLocation } from 'react-router-dom';
import {List} from './order/index';
import './style.css';


export const Comenzi=(props) =>{
    const {match}=props
    const location = useLocation()
    const { echipa,  currentUser } = location.state

    
    return (
        <Fragment>
            <div>
                <div className='col margine' >
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

                <h5 className="align-self-center text-center titlul">COMENZI-VERIFICARE</h5>
            </div>
            <div className={"col-12 desktopList"}>
                <List echipa={echipa} currentUser={currentUser} />
            </div>
        </Fragment>
    )
}

export default Comenzi
