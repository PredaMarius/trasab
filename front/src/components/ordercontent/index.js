import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ClipLoader from "react-spinners/ClipLoader";
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useHistory } from "react-router-dom";
import {dataFormatRO} from '../../functii/functii';
import { ORDER_CONTENT} from './queries';
import List from '@mui/material/List';
import {Reper} from './content/reper';
import './style.css';   


export const OrderContent= props =>{
    const location = useLocation();
    let history = useHistory();
    const { idComanda , currentUser, echipa } = location.state
    const [bifareTotala, setBifareTotala]=useState(false)

    const { data:comanda, loading, error} = useQuery(ORDER_CONTENT,{
        variables:{id:idComanda}, 
        fetchPolicy: "network-only",   // Used for first execution
        nextFetchPolicy: "network-only", // Used for subsequent executions
      });

    const handleChange =()=>{
        setBifareTotala(true);
    };

   
        
      if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
      if (error) return (<h6>Loading error:{error.message}</h6>);
    return (
        <div className="col-xl-6 col-md-12 xl-50">
            
            <small>Post de lucru: {echipa.trjob.denumire}</small>
            <br/>
            <small>Echipa:{`${echipa.salariat1 ||echipa.salariat2 || echipa.salariat3 || echipa.salariat4 || echipa.salariat5? echipa.denumire +":":""} ${echipa.salariat1?echipa.salariat1.nume:""} ${echipa.salariat2?", " + echipa.salariat2.nume:""} ${echipa.salariat3?", " + echipa.salariat3.nume:""} ${echipa.salariat4?", " + echipa.salariat4.nume:""} ${echipa.salariat5?", " + echipa.salariat5.nume:""}`} </small>
            <div className="container2">
                <h5 className="label">COMANDA: <span className="date"> {comanda.trorder.NumarBon +'/'+ dataFormatRO(comanda.trorder.Data).substring(0, 10)}</span></h5>
                <h5 className="label">CLIENT: <span className="date">{comanda.trorder.DenumireFirma}</span></h5>
            </div>
            <div className='container1 margineTop'>            
                <div className='labelfiltru'>Bifeaza toate reperele nebifate:</div>
                <Button onClick={handleChange} color="primary" variant="contained" endIcon={<FactCheckIcon/>}/>
            </div>
                <List sx={{ width: '100%', background:"#343a40", padding:'10px' }} component="nav">
                    {comanda && comanda.trorder && comanda.trorder.trordercontents &&  comanda.trorder.trordercontents.map((reper, index)=>(
                        <Reper key={reper.id} reper={reper} index={index} echipa={echipa} currentUser={currentUser} bifareTotala={bifareTotala}  idComanda={idComanda} />
                    )) }  
                </List>
                <div className='container1 margineTop' style={{ marginBottom: 20 }}>
                    <button onClick={() => history.goBack()}>Back</button>
                </div>
        </div>
    )
}

export default OrderContent
