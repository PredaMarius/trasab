import React, {useEffect, useState, Fragment, useRef} from 'react';
import  Modal from 'react-responsive-modal';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { ToastContainer, toast } from 'react-toastify';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import ComboBox from '@inovua/reactdatagrid-community/packages/ComboBox';
import '@inovua/reactdatagrid-community/theme/default-dark.css'

import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import { useQuery } from '@apollo/client';
import {QuickSearchToolbar,escapeRegExp } from '../../common/quicksearch/index';
import { ORDERS_LIST, QUERY_NAME } from './queries';
import {dataFormatRO} from '../../../functii/functii';
import './style.css';



export const List=({ echipa, currentUser}) => {
  const gridStyle = { minHeight: 450 };
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);  
  const columns = [
    { name:'id', header:'ID', defaultFlex:1,sortable: false, defaultVisible:false,  },
    { name: 'NumarBon', header: 'Numar', defaultFlex: 2, sortable: false, defaultVisible:true },
    { name: 'Data', header: 'Data', defaultFlex: 3, defaultVisible:true, render: ({ value }) => dataFormatRO(value).substring(0, 10)},
    { name: 'DenumireFirma', header: 'Client', flex: 4,sortable: false, defaultVisible:true },
    { name: 'Finalizata', header: 'Finalizata', flex: 1,sortable: false, defaultVisible:false }
  ];     
  const [idComanda, setIdComanda] = useState(0);
  const [filtruFinalizate,setFiltruFinalizate]=useState(true)
  const [initialRender, setInitialRender] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [theme, setTheme] = useState('default-dark')
  
  
  const rowStyle = ({ data }) => {
    const colorMap = {
      2: 'green',
      1: 'red'
    }
    return {
      color: colorMap[data.Finalizata]
    }
  }

  const scrollProps = Object.assign({}, ReactDataGrid.defaultProps.scrollProps, {
    autoHide: false,
    alwaysShowTrack: true
  });

  const themeDataSource = [
    { id: 'default-dark', label: 'Dark theme' },
    { id: 'default-light', label: 'Light theme' }
  ]

  const handleChangeFiltruFinalizate=(e)=>{       
      setFiltruFinalizate(!filtruFinalizate)
  };


  const { data, loading, error, refetch } = useQuery(ORDERS_LIST,{
    variables:{idjob:echipa.trjob.id, finalizata:(filtruFinalizate?2:3), produs:echipa.trjob.trsection.trdepartment.cod}, 
    fetchPolicy: "network-only",
    //notifyOnNetworkStatusChange: true,
    onCompleted:()=>setRows(data && data[QUERY_NAME]?data[QUERY_NAME]:[])
  });

  const [rows, setRows] = useState(data && data[QUERY_NAME]?data[QUERY_NAME]:[]);

  const openModalRef = useRef(openModal);// necesar deoarece in cadrul setTimeOut valoarea openModal nu este cea curenta
  openModalRef.current = openModal;

  const onTimeExpire =()=>{
      if(openModalRef.current){
        setOpenModal(false);
        toast.warning(`Nu s-a putut citi codul de bare in timpul alocat(20 sec).`, {
          toastId: 'EroareCitireCodBare',
          autoClose:5000,
          hideProgressBar:true
        });
    }
  }

  const onOpenModal = () => {
    setOpenModal(true);
    setTimeout(() => onTimeExpire(), 20000);
  };

  const onCloseModal = () => setOpenModal(false);

  const onUpdateScanner = (err, result) => {
    if (result) {
     if(data && rows.filter(comanda=>comanda.NumarBon.toString() === result.text)[0]){
      onCloseModal();
      setIdComanda(rows.filter(comanda=>comanda.NumarBon.toString() === result.text)[0].id);
     }else{
      onCloseModal();
      toast.warning(`Nu am gasit nici o comanda ${filtruFinalizate?"NEFINALIZATA":""} in lista cu numarul: ${result.text}.`, {
        toastId: 'EroareCitireCodBare',
        autoClose:5000,
        hideProgressBar:true
      });
     }
    }
  };

  
  const handleListRowSelection = (e) => {
    setIdComanda(e.data.id);
  };

  useEffect(() => {
    
    if (!initialRender) {
      history.push({
        pathname: `${process.env.PUBLIC_URL}/continutcomanda/:${idComanda}`,
        state: { comanda: rows && rows.filter(comanda=>(comanda.id===idComanda))[0], echipa:echipa, currentUser:currentUser, idComanda:idComanda }
      });
    } else {
      setInitialRender(false);
    }
  },[idComanda]);


  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data && data[QUERY_NAME] && data[QUERY_NAME].filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };
   
  
  if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
  if (error) return (<h6>Loading error:{error.message}</h6>);

  return (
    <Fragment>
     
       {/*-----------------------------------CAMP CAUTARE/FILTRU/REFRESH----------------------------------------*/}
       <QuickSearchToolbar value={searchText} onChange={(event) => requestSearch(event.target.value)} clearSearch={()=>requestSearch('')}/>
      <div className='container1'>
         
          <IconButton onClick={() => {refetch();setSearchText('')}} color="primary" component="div">
            <CachedIcon />
          </IconButton>
        
          <div className='labelfiltru'>Nefinalizate:</div>
          <input type="checkbox" className="filtruNefinalizate" name={'filtrunefinalizate'} value={filtruFinalizate} checked={filtruFinalizate} onChange={handleChangeFiltruFinalizate} />
      </div>
       {/*-----------------------------------DATAGRID----------------------------------------*/}
       <div style={{ marginTop: 5, marginBottom: 5 }}>
     
     </div>
      <div style={{ height: '500', width: '100%' }} >      
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
       {/*-----------------------------------BUTON SCANARE----------------------------------------*/}
      <div className='container1 margineTop' style={{ marginBottom: 20 }}>
        <div >
          Theme:{' '}
          <ComboBox
            style={{ width: 120}}
            inlineFlex
            collapseOnSelect
            clearIcon={false}
            searchable={false}
            changeValueOnNavigation
            dataSource={themeDataSource}
            value={theme}
            onChange={setTheme}
          />
        </div>
        <button className="butonCodBare" onClick={onOpenModal}>Scaneaza</button>
      </div>
      {/*-----------------------------------MODAL SCANARE----------------------------------------*/}
      <Modal open={openModal} onClose={onCloseModal} center>
          <BarcodeScannerComponent
              width={350}
              height={350}
              onUpdate={(err, result) => onUpdateScanner(err, result)}
            />
      </Modal>
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
    </Fragment>       
  )
}

export default List;
