import React, {useEffect, useState, Fragment} from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import Truncate from "react-truncate";
import { ToastContainer, toast } from 'react-toastify';
import {dataFormatRO} from '../../../functii/functii';
import './style.css';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';



import {  useQuery} from '@apollo/client';
import {ORDER_CONTENT} from './queries';
import {CheckBoxGrid} from './checkboxgrid';
import 'react-toastify/dist/ReactToastify.css';



export const ListContinut=({idComanda, trjob, currentUser, echipa, status, updateStatus, setStatus, bif, setBif, cauta}) => {
  
 
  const [continut, setContinut]=useState([])
  const [inaltimeGrid, setInaltimeGrid]=useState(400)
  const gridStyle = { minHeight: inaltimeGrid };
  const [bifareTotala,setBifareTotala]=useState(false)

  const columns = [
    { name:'id', header:'ID', defaultFlex:1,sortable: false, defaultVisible:false },
    { name:'NrCrt', header:'NrCrt', defaultFlex:1,sortable: false, defaultVisible:true,  },
    { name: 'Reper', header: 'Reper', defaultFlex: 4, sortable: false, defaultVisible:true,   
      render:({data})=>
      <Truncate
        width={200}
        lines={10}
      >
        {data.Rand1?data.Rand1:"" + data.Supliment1?data.Supliment1:""+ data.Rand2? data.Rand2:""+ data.Supliment2?data.Supliment2:""}
      </Truncate>
    },
    { name: 'Executanti', header: 'Executanti', defaultFlex: 5, sortable: false, defaultVisible:true,  
      render:({data})=>
        <div className="center">
          <CheckBoxGrid key={data.tritemoperations[0].id} itempost={data.tritemoperations[0]} echipa={echipa} currentUser={currentUser} bifareTotala={bifareTotala} setBifareTotala={setBifareTotala} idComanda={idComanda} status={status} updateStatus={updateStatus} setStatus={setStatus} bif={bif} setBif={setBif} cauta={cauta} />
        </div>   
    }
  ];     
 
  // const rowStyle = ({ data }) => {
  //   const colorMap = {
  //     2: 'green',
  //     1: '#8B0000'
  //   }
  //   return {
  //     background: colorMap[data.tritemoperations[0].Finalizat?2:null],
  //   }
  // }

 
  //--------------------------------------------------------------------------------------------------------------------------------------
//extragere continut comanda
const {data, loading} = useQuery(ORDER_CONTENT,{
  onCompleted: (rasp) => {
    setContinut(rasp.trorder && rasp.trorder.trordercontents ?rasp.trorder.trordercontents:[])
    setInaltimeGrid(rasp.trorder && rasp.trorder.trordercontents ?(rasp.trorder.trordercontents.length * 200+100):400)
    console.log("ORDER_CONTENT")
  },
  variables:{id:idComanda, trjob:trjob}, 
  fetchPolicy: "cache-and-network",   // Used for first execution
  nextFetchPolicy: 'cache-first', // Used for subsequent executions
  onError: errorUpdateStatus => {
    toast.error(`Eroare schimbare status comanda! ${errorUpdateStatus.message}`, {
        toastId: 'EroareSalvareStatusComanda',
        autoClose:10000,
        hideProgressBar:true
        });
  }
});
  

 
//--------------------------------------------------------------------------
// functie de extragere a datelor din tritemoperation privind bifarea post item-urilor aferente comenzii curente
// rasp.toate.aggregate.count=== rasp.finalizate.aggregate.count => nr total item-uri comanda === nr total imte-uri bifate
//rasp.finaletoate.aggregate.count===rasp.finalefinalizate.aggregate.count => nr total intem-uri cu statut de operatie finala in reteta === nr total intem-uri cu statut de operatie finala in reteta, bifate

//---------------------------------------------------------------------------------------------------------------------------------------

const handleChange =()=>{
  setBifareTotala(true);
};
 
  return (
    <div style={{marginTop:"5px" }}>
    
      {/*-----------------------------------DATAGRID----------------------------------------*/}
      <div style={{ marginTop: 5, marginBottom: 5 }}> </div>
      <div style={{ height: inaltimeGrid, overflow: 'hidden', width: '100%' }} > 
      <div className='container1'>
        <div className='labelfiltru'>Bifeaza toate reperele nebifate:</div>
        <Button onClick={handleChange} color="primary" variant="contained" endIcon={<FactCheckIcon/>}/>
      </div>     
        <ReactDataGrid
          idProperty="id"
          loading={loading}
          columns={columns}
          dataSource={continut}
          style={gridStyle}
          rowHeight={200}
          theme='default-dark'
        />        
      </div> 
    </div>       
  )
}

export default ListContinut;
