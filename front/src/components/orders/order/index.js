import React, {useEffect, useState, Fragment, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import { ToastContainer, toast } from 'react-toastify';


import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css'

import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import { useQuery } from '@apollo/client';
import { ORDERS_LIST, QUERY_NAME } from './queries';
import {dataFormatRO} from '../../../functii/functii';
import {setSTNrBonuri, getSTNrBonuri} from '../../../localstorage/sessionstorage';
import './style.css';




export const List=({ echipa, currentUser}) => {
  const gridStyle = { minHeight: 450 };
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [cauta, setCauta] = useState("");
  const [numarBonuri, setNumarBonuri] = useState(getSTNrBonuri()?getSTNrBonuri():[0]);

  const columns = [
    { name:'id', header:'ID', defaultFlex:1,sortable: false, defaultVisible:false,  },
    { name: 'NumarBon', header: 'Numar', defaultFlex: 2, sortable: false, defaultVisible:true,  render:({data})=>data.Serviciu + data.NumarBon},
    { name: 'Data', header: 'Data', defaultFlex: 2, defaultVisible:true, render: ({ value }) => dataFormatRO(value).substring(0, 10)},
    { name: 'DenumireFirma', header: 'Client', flex: 4,sortable: false, defaultVisible:true },
    { name: 'Finalizata', header: 'Finalizata', flex: 1,sortable: false, defaultVisible:false },
    { name: 'DenumireCursa', header: 'Cursa', flex: 3,sortable: false, defaultVisible:false },
    { id: 'stare', header: 'Rep.Bif.', defaultFlex: 2, 
    render: ({ data }) => data.trstatuses[0] && (data.trstatuses[0].NrRepereBifate + '/' + data.trstatuses[0].NrRepere +  (data.trstatuses[0].NrRepereBifate===data.trstatuses[0].NrRepere?" ✅ ":"" )+ (data.Finalizata===2?"👍":"") + (data.trstatuses[0].NrRepereBifate<data.trstatuses[0].NrRepere && data.trstatuses[0].NrRepereBifate>0?" ⛏ ":"") ),
    onRender: (cellProps, {data}) => {cellProps.style.color = data.trstatuses[0] && (data.trstatuses[0].NrRepereBifate===data.trstatuses[0].NrRepere? 'lightgreen': data.trstatuses[0].NrRepereBifate<data.trstatuses[0].NrRepere && data.trstatuses[0].NrRepereBifate>0?'orange':'inherit')}
  }
  ];     
  const [idComanda, setIdComanda] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  const [theme, setTheme] = useState('default-dark');
  const [tipscanare, setTipscanare]=useState('scanare');
  
  
  const rowStyle = ({ data }) => {
    const colorMap = {
      2: 'green',
      1: '#8B0000'
    }
    return {
      background: colorMap[data.Finalizata]
    }
  }

  const scrollProps = Object.assign({}, ReactDataGrid.defaultProps.scrollProps, {
    autoHide: false,
    alwaysShowTrack: true
  });
  
  const handleChangeCauta=(e)=>{
    const { value } = e.target;
    setCauta(value);
}; 


  const { data, loading, error, refetch } = useQuery(ORDERS_LIST,{
    variables:{numarBon:numarBonuri, idjob:echipa.trjob.id, produs:echipa.trjob.trsection.trdepartment.cod, trjob:echipa.trjob.id}, 
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted:()=>setRows(data && data[QUERY_NAME]?data[QUERY_NAME]:[])
  });

  const [rows, setRows] = useState(data && data[QUERY_NAME]?data[QUERY_NAME]:[]);

  const openModalRef = useRef(openModal);// necesar deoarece in cadrul setTimeOut valoarea openModal nu este cea curenta
  openModalRef.current = openModal;

  
  
  const handleListRowSelection = (e) => {
    setTipscanare('scanare');
    setIdComanda(e.data.id);
  };

  useEffect(() => {   
    if (!initialRender) {
      history.push({
        pathname: `${process.env.PUBLIC_URL}/continutcomanda/:${idComanda}`,
        state: { comanda: rows && rows.filter(comanda=>(comanda.id===idComanda))[0], echipa:echipa, currentUser:currentUser, idComanda:idComanda, tipscanare:tipscanare }
      });
    } else {
      setInitialRender(false);
    }
  },[idComanda]);

  useEffect(()=>{
    setSTNrBonuri(numarBonuri);
  },[numarBonuri])


  
const handleCauta=()=>{
  setNumarBonuri([...numarBonuri, cauta?JSON.parse(cauta):0])
  refetch()
}
  
   
  
  if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
  if (error) return (<h6>Loading error:{error.message}</h6>);

  return (
    <div style={{marginTop:"5px" }}>
    
       {/*-----------------------------------CAMP CAUTARE/FILTRU/REFRESH----------------------------------------*/}
          
      <form className="row" style={{marginTop:"100px", marginLeft:"5px"}} onSubmit={handleCauta}>
        <TextField size='small' label="Numar comanda" type="search"  name="cauta" autoFocus style={{width:"200px"}} onChange={handleChangeCauta} value={cauta}/>
        <Button style={{marginLeft:"5px"}} color="primary" variant="contained">Cauta</Button>
      </form>
      
      <div className='container3'>
        <div className='labelfiltru'>Goleste tabel:</div>
          <IconButton onClick={()=>setNumarBonuri([0])} color="primary" component="div">
            <CachedIcon />
          </IconButton>
      </div>
       {/*-----------------------------------DATAGRID----------------------------------------*/}
       <div style={{ marginTop: 5, marginBottom: 5 }}>
     
     </div>
      <div style={{ height: '700', width: '100%' }} >      
        <ReactDataGrid
          idProperty="id"
          selected={idComanda}
          onSelectionChange={handleListRowSelection}
          columns={columns}
          dataSource={rows}
          style={gridStyle}
          pagination
          defaultLimit={100}
          rowStyle={rowStyle}
          scrollProps={scrollProps}
          theme={theme}
        />        
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
     
       {/*-----------------------------------MESAJE DE EROARE/ATENTIONARE-------------------------*/}
      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default List;
