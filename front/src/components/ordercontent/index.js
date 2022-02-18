import React, {useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useHistory } from "react-router-dom";
import {dataFormatRO} from '../../functii/functii';
import { ORDER_CONTENT, STATUS_ID, STATUS_UPDATE} from './queries';
import List from '@mui/material/List';
import {Reper} from './content/reper';
import './style.css';   


export const OrderContent= props =>{
    const location = useLocation();
    let history = useHistory();
    const { idComanda , currentUser, echipa, tipscanare } = location.state
    const [bifareTotala, setBifareTotala]=useState(false) // declansator bifare toate reperele (transmis via porps in reper-checkbox)
    const [status, setStatus]=useState([])//status din trstatus

//--------------------------------------------------------------------------------------------------------------------------------------
//extragere continut comanda
    const { data:comanda, loading, error} = useQuery(ORDER_CONTENT,{
        variables:{id:idComanda}, 
        fetchPolicy: "network-only",   // Used for first execution
        nextFetchPolicy: "network-only", // Used for subsequent executions
      });

//--------------------------------------------------------------------------------------------------------------------------------------
//extragere status din trstatus pentru comanda selectata si job.id(tipul de operatie) aferent echipei selectate, necesar pentru extragerea id-ului inregistrari din trstatus ce urmeaza a fi updatata.
// datele extrase se transmit via props (status) catre reper -> checkbox

      const { data:dataStatus } = useQuery(STATUS_ID, {
        variables: {idComanda:JSON.parse(idComanda), idOperatie:JSON.parse(echipa.trjob.id)}, 
        fetchPolicy: "no-cache",
        onCompleted:  (rasp)=>setStatus(rasp.trstatuses),
        onError: errorStatus => {
            toast.error(`Eroare citire status! ${errorStatus.message}`, {
                toastId: 'EroareCitireStatus',
                autoClose:10000,
                hideProgressBar:true
                });
        }

    });

    //--------------------------------------------------------------------------------------------------------------------------------------
    // functia de update status pentru id-ul extras mai sus. Se transmite via props : reper-> checkbox
    
    const [updateStatus]=useMutation(STATUS_UPDATE, 
        {
            fetchPolicy: "no-cache",
            onCompleted: (rasp) => { console.log("update status status")},
            onError: errorUpdateStatus => {
                toast.error(`Eroare schimbare status ! ${errorUpdateStatus.message}`, {
                    toastId: 'EroareSalvareStatusComanda',
                    autoClose:10000,
                    hideProgressBar:true
                    });
            }
        }
    );

 //--------------------------------------------------------------------------------------------------------------------------------------
     const handleChange =()=>{
        setBifareTotala(true);
    };
//--------------------------------------------------------------------------------------------------------------------------------------
    
    useEffect(()=>{
        if(tipscanare==='scanarebifare'){
            setBifareTotala(true);
            setTimeout(()=>
            history.push( echipa.trjob.denumire.includes('FINALA')?
            {pathname:`${process.env.PUBLIC_URL}/comenziverificare/${echipa.trjob.id}`, state:{ echipa: echipa , currentUser:currentUser} }
            :{pathname:`${process.env.PUBLIC_URL}/comenzi/${echipa.trjob.id}`, state:{ echipa: echipa , currentUser:currentUser} }
            )
            ,  1000)
        }
    },[tipscanare, status])
   
   
//--------------------------------------------------------------------------------------------------------------------------------------    
      if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
      if (error) return (<h6>Loading error:{error.message}</h6>);
    return (
        <div className="col-xl-6 col-md-12 xl-50">
            {/*-----------------------------------ANTET-------------------------*/}
            <small>Post de lucru: {echipa.trjob.denumire}</small>
            <br/>
            <small>Echipa:{`${echipa.salariat1 ||echipa.salariat2 || echipa.salariat3 || echipa.salariat4 || echipa.salariat5? echipa.denumire +":":""} ${echipa.salariat1?echipa.salariat1.nume:""} ${echipa.salariat2?", " + echipa.salariat2.nume:""} ${echipa.salariat3?", " + echipa.salariat3.nume:""} ${echipa.salariat4?", " + echipa.salariat4.nume:""} ${echipa.salariat5?", " + echipa.salariat5.nume:""}`} </small>
            <div className="container2">
                <h5 className="label">COMANDA: <span className="date"> {comanda.trorder.NumarBon +'/'+ dataFormatRO(comanda.trorder.Data).substring(0, 10)}</span></h5>
                <h5 className="label">CLIENT: <span className="date">{comanda.trorder.DenumireFirma}</span></h5>
            </div>
            {/*-----------------------------------BUTON BIFARE TOTALA-------------------------*/}
            <div className='container1 margineTop'>            
                <div className='labelfiltru'>Bifeaza toate reperele nebifate:</div>
                <Button onClick={handleChange} color="primary" variant="contained" endIcon={<FactCheckIcon/>}/>
            </div>
            {/*-----------------------------------LISTA REPERE COMANDA-------------------------*/}
            <List sx={{ width: '100%', background:"#343a40", padding:'10px' }} component="nav">
                {comanda && comanda.trorder && comanda.trorder.trordercontents &&  comanda.trorder.trordercontents.map((reper, index)=>(
                <Reper key={reper.id} reper={reper} index={index} echipa={echipa} currentUser={currentUser} bifareTotala={bifareTotala}  idComanda={idComanda} status={status[0]} updateStatus={updateStatus} setStatus={setStatus} />
                )) }  
            </List>
            {/*-----------------------------------BUTON BACK-------------------------*/}
            <div className='container1 margineTop' style={{ marginBottom: 20 }}>
                <button onClick={() => history.goBack()}>Back</button>
            </div>
            {/*-----------------------------------MESAJE DE EROARE/ATENTIONARE-------------------------*/}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
            /> 
        </div>
    )
}

export default OrderContent
