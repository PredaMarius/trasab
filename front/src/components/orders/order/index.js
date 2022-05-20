import React, {useEffect, useState} from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { ORDERS_LIST, QUERY_NAME } from './queries';
import {dataFormatRO} from '../../../functii/functii';
import {ListContinut} from '../ordercontent/index';
import './style.css';



export const List=({ echipa, currentUser, numarBon}) => {
  const gridStyle = { minHeight: 100 };
  const history = useHistory();
  

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
  

  const { data } = useQuery(ORDERS_LIST,{
    variables:{numarBon:numarBon, idjob:echipa.trjob.id, produs:echipa.trjob.trsection.trdepartment.cod, trjob:echipa.trjob.id}, 
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted:()=>setRows(data && data[QUERY_NAME]?data[QUERY_NAME]:[])
  });

  const [rows, setRows] = useState(data && data[QUERY_NAME]?data[QUERY_NAME]:[]);
 
  
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

  
  return (
    <div style={{marginTop:"5px" }}>
    
      {/*-----------------------------------DATAGRID----------------------------------------*/}
      <div style={{ marginTop: 5, marginBottom: 5 }}> </div>
      <div style={{ height: '100', width: '100%' }} >      
        <ReactDataGrid
          idProperty="id"
          selected={idComanda}
          onSelectionChange={handleListRowSelection}
          columns={columns}
          dataSource={rows}
          style={gridStyle}
          rowStyle={rowStyle}
          scrollProps={scrollProps}
          theme='default-dark'
        />        
      </div> 
      <ListContinut continut={rows[0]?rows[0].trordercontents:[]}/>
    </div>       
  )
}

export default List;
