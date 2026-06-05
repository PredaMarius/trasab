import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery, useMutation} from '@apollo/client';
import {UPDATE_MUTATION, USER_QUERY} from '../queries';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export const SalariatCurent=({ echipa, currentUser }) =>{
    
    const funcDezactivat =()=>{
        if (currentUser.role.type==="administrator"){
            return false
        };

        if (currentUser.id===echipa.trjob.trsection.trdepartment.users_permissions_user.id){
            return false
        };

        if (currentUser.id===echipa.trjob.trsection.users_permissions_user.id){
            return false
        };

        if (currentUser.id===echipa.iduser.id){
            return false
        };

        return true

    };

    const [dezactivat, setDezactivat]=useState(funcDezactivat())

    const [inputValues, setInputValues]=useState({
            id:JSON.parse(echipa.id), 
            iduser:echipa.iduser? echipa.iduser.id : null, 
            idsalariat1:echipa.salariat1? echipa.salariat1.id : null, 
            idsalariat2:echipa.salariat2? echipa.salariat2.id : null, 
            idsalariat3:echipa.salariat3? echipa.salariat3.id : null, 
            idsalariat4:echipa.salariat4? echipa.salariat4.id : null, 
            idsalariat5:echipa.salariat5? echipa.salariat5.id : null,
    });
    

    const [primaIncarcare, setPrimaIncarcare]=useState(true);

    const {data, loading, error}=useQuery(USER_QUERY);

    const [update, {loading:loadingUpdate, error:errorUpdate}]=useMutation(UPDATE_MUTATION, 
        {
            onCompleted: () => {
                toast.success('Salvare cu succes!', {
                    toastId: 'SuccesSalvare',
                    autoClose:1500,
                    hideProgressBar:true
                    });
            },
            onError: errorUpdate => {
                //console.log(errorUpdate)
                toast.error(`Eroare salvare! ${errorUpdate.message}`, {
                    toastId: 'SuccesSalvare',
                    autoClose:5000,
                    hideProgressBar:true
                    });
            }
        }
        
    );
    

    
    useEffect(() => { 
        if(primaIncarcare===false){
                update({ variables:inputValues});            
        } 
        setPrimaIncarcare(false)
    },[inputValues]);

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value?JSON.parse(value):null });
    }; 

    
    if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
    if (error) return (<h6>Loading error:{error.message}</h6>);

    return(
        <div>
            <form className="" noValidate="">
                {/*----------------SALARIAT 1------------------------- */}
                <div className='row'>
                    <label 
                        htmlFor={'idsalariat1'} 
                        className="labelx nav-link-desktop"   
                    >
                        Membru 1:
                    </label>
                    <select
                        className={'selectbox'} 
                        name='idsalariat1'
                        value={inputValues.idsalariat1?inputValues.idsalariat1:''} 
                        onChange={handleChange} 
                        disabled={dezactivat}
                    >
                        <option value='' key={null}></option>
                        { data && data.users && data.users.map(opt => (<option value={opt.id} key={opt.id}>{opt.nume}</option>))}
                    </select>
                </div>
                {/*----------------SALARIAT 2------------------------- */}
                <div className='row'>
                    <label 
                        htmlFor={'idsalariat2'} 
                        className="labelx nav-link-desktop"
                        
                    >
                        Membru 2:
                    </label>
                    <select
                        className={'selectbox'} 
                        name='idsalariat2'
                        value={inputValues.idsalariat2?inputValues.idsalariat2:''} 
                        onChange={handleChange} 
                        disabled={dezactivat}
                    >
                        <option value='' key={null}></option>
                        { data && data.users && data.users.map(opt => (<option value={opt.id} key={opt.id}>{opt.nume}</option>))}
                    </select>
                </div>
                {/*----------------SALARIAT 3------------------------- */}
                <div className='row'>
                    <label 
                        htmlFor={'idsalariat3'} 
                        className="labelx nav-link-desktop"
                        
                    >
                        Membru 3:
                    </label>
                    <select
                        className={'selectbox'} 
                        name='idsalariat3'
                        value={inputValues.idsalariat3?inputValues.idsalariat3:''} 
                        onChange={handleChange} 
                        disabled={dezactivat}
                    >
                        <option value='' key={null}></option>
                        { data && data.users && data.users.map(opt => (<option value={opt.id} key={opt.id}>{opt.nume}</option>))}
                    </select>
                </div>
                {/*----------------SALARIAT 4------------------------- */}
                <div className='row'>
                    <label 
                        htmlFor={'idsalariat4'} 
                        className="labelx nav-link-desktop"
                        
                    >
                        Membru 4:
                    </label>
                    <select
                        className={'selectbox'} 
                        name='idsalariat4'
                        value={inputValues.idsalariat4?inputValues.idsalariat4:''} 
                        onChange={handleChange} 
                        disabled={dezactivat}
                    >
                        <option value='' key={null}></option>
                        { data && data.users && data.users.map(opt => (<option value={opt.id} key={opt.id}>{opt.nume}</option>))}
                    </select>
                </div>
                {/*----------------SALARIAT 5------------------------- */}
                <div className='row'>
                    <label 
                        htmlFor={'idsalariat5'} 
                        className="labelx nav-link-desktop"
                        
                    >
                        Membru 5:
                    </label>
                    <select
                        className={'selectbox'} 
                        name='idsalariat5'
                        value={inputValues.idsalariat5?inputValues.idsalariat5:''} 
                        onChange={handleChange} 
                        disabled={dezactivat}
                    >
                        <option value='' key={null}></option>
                        { data && data.users && data.users.map(opt => (<option value={opt.id} key={opt.id}>{opt.nume}</option>))}
                    </select>
                </div>
                {/*----------------SEF ECHIPA------------------------- */}
                <div className='col center' >
                    <label 
                        htmlFor={'iduser'} 
                        className="labelx nav-link-desktop"
                        sx={{float: 'right'}}
                        
                    >
                        Sef echipa:
                    </label>
                    <select
                        className='selectbox bold' 
                        name='iduser'
                        value={inputValues.iduser?inputValues.iduser:''} 
                        onChange={handleChange} 
                        disabled={dezactivat}
                    >
                        <option value='' key={null}></option>
                        { data && data.users && data.users.map(opt => (<option value={opt.id} key={opt.id}>{opt.nume}</option>))}
                    </select>
                </div>
            </form>
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
    );
}

export default SalariatCurent;
