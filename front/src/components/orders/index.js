import React, {Fragment, useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';
import {List} from './order/index';
import {ListContinut} from './ordercontent/index';
import { useQuery, useMutation } from '@apollo/client';
import { STATUS_UPDATE, STATUS_ID } from './ordercontent/queries';
import { ORDERS_LIST, QUERY_NAME } from './order/queries';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import {setSTNrBonuri, getSTNrBonuri} from '../../localstorage/sessionstorage';



export const Comenzi=(props) =>{
    const location = useLocation()
    let history = useHistory();
    const { echipa,  currentUser } = location.state
    const [cauta, setCauta] = useState("");
    const [numarBon, setNumarBon] = useState(getSTNrBonuri()?getSTNrBonuri():0);
    const [status, setStatus]=useState([])//status din trstatus transmis via porps ordercontent/index)
    const [bif, setBif]=useState(0) // declanasat la bifarea individuala pentru a actualiza "repere bifate/repere totale"
    const [rows, setRows]=useState([]);
   
    const { data } = useQuery(ORDERS_LIST,{
      variables:{ 
                  numarBon:numarBon, 
                  idjob:echipa.trjob.id, 
                  produs:echipa.trjob.trsection.trdepartment.cod, 
                  trjob:echipa.trjob.id
                }, 
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      onCompleted:(rasp)=>{
          setRows(data && data[QUERY_NAME]?data[QUERY_NAME]:[]);
          console.log("declansare ORDER_LIST");
          setBif(rasp.trorders[0]?(rasp.trorders[0].trstatuses[0].NrRepereBifate ?rasp.trorders[0].trstatuses[0].NrRepereBifate:0):0)
        }
      }
    );
  
    //de sters const [rows, setRows] = useState(data && data[QUERY_NAME]?data[QUERY_NAME]:[]);


    const handleChangeCauta=(e)=>{
      const { value } = e.target;
      setCauta(value);
    }; 

    useEffect(()=>{
      setSTNrBonuri(numarBon);
    },[numarBon])
    
    
    const handleCauta=(event)=>{
      event.preventDefault();
      setNumarBon( cauta!=="" && isNaN(cauta)?0:JSON.parse(cauta!==""?cauta:0))
    }

//--------------------------------------------------------------------------------------------------------------------------------------
// functia de update status pentru id-ul extras mai sus. Se transmite via props : reper-> checkbox

const [updateStatus]=useMutation(STATUS_UPDATE, 
  {
    onCompleted: (rasp) => { 
      setBif(rasp.updateTrstatus.trstatus?rasp.updateTrstatus.trstatus.NrRepereBifate:0)
    },
    onError: errorUpdateStatus => {
      toast.error(`Eroare schimbare status ! ${errorUpdateStatus.message}`, 
                    {
                      toastId: 'EroareSalvareStatusComanda',
                      autoClose:10000,
                      hideProgressBar:true
                    }
      );
    }
  }
);
//--------------------------------------------------------------------------------------------------------------------------------------
//extragere status din trstatus pentru comanda selectata si job.id(tipul de operatie) aferent echipei selectate, necesar pentru extragerea id-ului inregistrari din trstatus ce urmeaza a fi updatata.
// datele extrase se transmit via props (status) catre reper -> checkbox
// eslint-disable-next-line no-unused-vars
const { data:dataStatus } = useQuery(STATUS_ID, {
  variables:{
              idComanda:JSON.parse(rows[0]?rows[0].id:0), 
              idOperatie:JSON.parse(echipa.trjob.id)
            }, 
  fetchPolicy: "cache-and-network",
  notifyOnNetworkStatusChange: true,
  onCompleted:  (rasp)=>{
    setStatus(rasp.trstatuses); 
    console.log("declansare STATUS_ID");
  },
  onError: errorStatus => {
    toast.error(`Eroare citire status! ${errorStatus.message}`, 
        {
          toastId: 'EroareCitireStatus',
          autoClose:10000,
          hideProgressBar:true
        }
    );
  }
});

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
                    <TextField size='small' label="Numar comanda" type="search"  name="cauta" autoFocus style={{width:"200px"}} inputProps={{ inputMode: 'tel', pattern:"[0-9]*" }} onChange={handleChangeCauta} value={cauta}/>
                    <Button style={{marginLeft:"5px"}} color="primary" variant="contained" type="submit">Cauta</Button>
                </form>
                
                <div className='container3'>
                    <div className='labelfiltru'>Goleste tabel:</div>
                    <IconButton onClick={()=>setNumarBon(0)} color="primary" component="div">
                    <CachedIcon />
                    </IconButton>
                </div>
            </div>
            {/*---------------------------------LIST SI LISTCONTINUT---------------------------------------------------*/}
            <div className={"col-12"}>
              <List rows={rows} echipa={echipa} currentUser={currentUser} numarBon={numarBon} bif={bif} />
            </div>
            <div className={"col-12"}>
              <ListContinut idComanda={rows[0]?rows[0].id:0} status={status[0]} updateStatus={updateStatus} setStatus={setStatus} echipa={echipa} currentUser={currentUser} trjob={echipa.trjob.id} bif={bif} setBif={setBif} cauta={cauta} />
            </div>
            {/*---------------------------------LEGENDA-------------------------------------------------------------*/}
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
        </Fragment>
    )
}

export default Comenzi
