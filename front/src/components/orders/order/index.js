import React, {useState} from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import {dataFormatRO} from '../../../functii/functii';
import './style.css';


export const List=({ rows, echipa, currentUser, numarBon, setStatus, bif}) => {
  const gridStyle = { minHeight: 100 };

  const columns = [
    { name:'id', header:'ID', defaultFlex:1,sortable: false, defaultVisible:false,  },
    { name: 'NumarBon', header: 'Numar', defaultFlex: 2, sortable: false, defaultVisible:true,  render:({data})=>data.Serviciu + data.NumarBon},
    { name: 'Data', header: 'Data', defaultFlex: 2, defaultVisible:true, render: ({ value }) => dataFormatRO(value).substring(0, 10)},
    { name: 'DenumireFirma', header: 'Client', flex: 4,sortable: false, defaultVisible:true },
    { name: 'Finalizata', header: 'Finalizata', flex: 1,sortable: false, defaultVisible:false },
    { name: 'DenumireCursa', header: 'Cursa', flex: 3,sortable: false, defaultVisible:false },
    { id: 'stare', header: 'Rep.Bif.', defaultFlex: 2, 
    render: ({ data }) => data.trstatuses[0] && (bif + '/' + data.trstatuses[0].NrRepere +  (bif===data.trstatuses[0].NrRepere?" ✅ ":"" )+ (data.Finalizata===2?"👍":"") + (bif<data.trstatuses[0].NrRepere && bif>0?" ⛏ ":"") ),
    onRender: (cellProps, {data}) => {cellProps.style.color = data.trstatuses[0] && (bif===data.trstatuses[0].NrRepere? 'lightgreen': bif<data.trstatuses[0].NrRepere && bif>0?'orange':'inherit')}
    // render: ({ data }) => data.trstatuses[0] && (data.trstatuses[0].NrRepereBifate + '/' + data.trstatuses[0].NrRepere +  (data.trstatuses[0].NrRepereBifate===data.trstatuses[0].NrRepere?" ✅ ":"" )+ (data.Finalizata===2?"👍":"") + (data.trstatuses[0].NrRepereBifate<data.trstatuses[0].NrRepere && data.trstatuses[0].NrRepereBifate>0?" ⛏ ":"") ),
    // onRender: (cellProps, {data}) => {cellProps.style.color = data.trstatuses[0] && (data.trstatuses[0].NrRepereBifate===data.trstatuses[0].NrRepere? 'lightgreen': data.trstatuses[0].NrRepereBifate<data.trstatuses[0].NrRepere && data.trstatuses[0].NrRepereBifate>0?'orange':'inherit')}
  }
  ];     
  
  const rowStyle = ({ data }) => {
    const colorMap = {2: 'green',1: '#8B0000'}
    return {
      // background: colorMap[data.Finalizata]
    }
  }
  
 
  return (
    <div style={{marginTop:"5px" }}>
      <div style={{ height: '100', width: '100%', marginTop: 10 }} >      
        <ReactDataGrid
          idProperty="id"
          columns={columns}
          dataSource={rows}
          style={gridStyle}
          rowStyle={rowStyle}
          theme='default-dark'
        />        
      </div> 
    </div>       
  )
}

export default List;
