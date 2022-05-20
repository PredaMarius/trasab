import React, {Fragment, useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';
import {List} from './order/index';
import './style.css';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import {setSTNrBonuri, getSTNrBonuri} from '../../localstorage/sessionstorage';



export const Comenzi=(props) =>{
    const {match}=props
    const location = useLocation()
    let history = useHistory();
    const { echipa,  currentUser } = location.state

    const [cauta, setCauta] = useState("");
    const [numarBon, setNumarBon] = useState(getSTNrBonuri()?getSTNrBonuri():0);


    const handleChangeCauta=(e)=>{
        const { value } = e.target;
        setCauta(value);
    }; 

    useEffect(()=>{
        setSTNrBonuri(numarBon);
      },[numarBon])
    
    
      
    const handleCauta=(event)=>{
      event.preventDefault();
      setNumarBon( cauta?JSON.parse(cauta):0)
    }

    
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
            {/*-----------------------------------CAMP CAUTARE/FILTRU/REFRESH----------------------------------------*/}
            <div>
                <form  className="row" style={{marginTop:"10px", marginLeft:"5px"}} onSubmit={handleCauta}>
                    <TextField size='small' label="Numar comanda" type="search"  name="cauta" autoFocus style={{width:"200px"}} onChange={handleChangeCauta} value={cauta}/>
                    <Button style={{marginLeft:"5px"}} color="primary" variant="contained" type="submit">Cauta</Button>
                </form>
                
                <div className='container3'>
                    <div className='labelfiltru'>Goleste tabel:</div>
                    <IconButton onClick={()=>setNumarBon(0)} color="primary" component="div">
                    <CachedIcon />
                    </IconButton>
                </div>
            </div>
            {/*-------------------------------------------------------------------------------------------------------*/}
            <div className={"col-12"}>
                <List echipa={echipa} currentUser={currentUser} numarBon={numarBon}/>
            </div>
            <div className='margineTop'>
            <div>
              Legenda:
            </div>
            <div>
              {`✅-bifata integral pentru operatia:${echipa.trjob.denumire}`}
            </div>
            <div>
              {`⛏ -bifata partial pentru operatia:${echipa.trjob.denumire}`}
            </div>
            <div>
              {`👍 -comanda finalizata pentru toate operatiile`}
            </div>
            <div>
              {`🟥 - operatie finala bifata dar cu operatii intermediare nebifate.`}
            </div>
        </div>
             
        </Fragment>
    )
}

export default Comenzi
