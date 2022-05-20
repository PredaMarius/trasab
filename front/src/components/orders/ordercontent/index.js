import React, {useEffect, useState, Fragment} from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css'
import Truncate from "react-truncate";
import {dataFormatRO} from '../../../functii/functii';
import './style.css';




export const ListContinut=({continut}) => {
  const gridStyle = { minHeight: 450 };
  const [id, setId]=useState(0)

  

  const columns = [
    { name:'id', header:'ID', defaultFlex:1,sortable: false, defaultVisible:false },
    { name:'NrCrt', header:'NrCrt', defaultFlex:1,sortable: false, defaultVisible:true,  },
    { name: 'Reper', header: 'Reper', defaultFlex: 7, sortable: false, defaultVisible:true,   
      render:({data})=>
      <Truncate
        width={300}
        lines={7}
      >
        {data.Rand1 + data.Supliment1+data.Rand2+data.Supliment2}
      </Truncate>
    
    },
    { name: 'Executanti', header: 'Executanti', defaultFlex: 4, sortable: false, defaultVisible:true,  
      render:({data})=>
        <div className="center">
          <form className="" noValidate="">
            <input type="checkbox" className='checkbox' name={'finalizat'} value={data.tritemoperations[0].finalizat} checked={data.tritemoperations[0].finalizat}  />
          </form>
          <Truncate
            width={150}
            lines={7}
          >
            {data.tritemoperations[0]? 
              (data.tritemoperations[0].salariat1?data.tritemoperations[0].salariat1.nume:"")
              + " " +
              (data.tritemoperations[0].salariat2?","+ data.tritemoperations[0].salariat2.nume:"")
              + " " +
              (data.tritemoperations[0].salariat3?","+data.tritemoperations[0].salariat3.nume:"")
              + " " +
              (data.tritemoperations[0].salariat4?","+data.tritemoperations[0].salariat4.nume:"")
              + " " +
              (data.tritemoperations[0].salariat5?","+data.tritemoperations[0].salariat5.nume:"")
              :" " }
          </Truncate>
          <div>
            <small className='green'>{`${data.tritemoperations[0].salariat1? "Bifat de: ":""} ${data.tritemoperations[0].salariat1?data.tritemoperations[0].utilizator :""}`}</small>
          <br></br>
          <small className='green'>{`${data.tritemoperations[0].salariat1 && data.tritemoperations[0]?dataFormatRO(data.tritemoperations[0].datamodificare):""}`}</small>
          </div>
      
        </div>
        
       
    }
  ];     
 
  const rowStyle = ({ data }) => {
    const colorMap = {
      2: 'green',
      1: '#8B0000'
    }
    return {
      background: colorMap[data.Finalizat],
      overflowWrap: 'break-word'
    }
  }

  const scrollProps = Object.assign({}, ReactDataGrid.defaultProps.scrollProps, {
    autoHide: false,
    alwaysShowTrack: true
  });
  

  const handleListRowSelection = (e) => {
    setId(e.data.id);
  };
 
  return (
    <div style={{marginTop:"5px" }}>
    
      {/*-----------------------------------DATAGRID----------------------------------------*/}
      <div style={{ marginTop: 5, marginBottom: 5 }}> </div>
      <div style={{ height: '450', width: '100%' }} >      
        <ReactDataGrid
          idProperty="id"
          selected={id}
          onSelectionChange={handleListRowSelection}
          columns={columns}
          dataSource={continut}
          style={gridStyle}
          rowStyle={rowStyle}
          rowHeight={200}
          scrollProps={scrollProps}
          theme='default-dark'
        />        
      </div> 
    </div>       
  )
}

export default ListContinut;
