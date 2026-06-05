import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useQuery } from '@apollo/client';
import { LIST_QUERY, QUERY_NAME } from './queries';
import {FIELDS} from './fields';
import './style.css';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";


export const List=props => {
  
  const {handleListRowSelection, disabled, selectionModel} =props
  const { loading, data, error } = useQuery(LIST_QUERY);
  const columns = FIELDS;

    

  if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
  if (error) return (<h6>Loading error:{error.message}</h6>);

  return ( 
  
      <DataGrid 
          rows={data && data[QUERY_NAME]?data[QUERY_NAME]:[]} 
          columns={columns} 
          rowHeight={20}
          hideFooterSelectedRowCount={true}
          headerHeight={25}
          disableMultipleSelection={true} 
          onRowSelected={handleListRowSelection}
          disableSelectionOnClick={disabled}
          selectionModel={selectionModel}
      />         
  
  )
}

export default List
