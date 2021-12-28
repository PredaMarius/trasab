import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useLazyQuery} from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import {dataFormatRO} from '../../../functii/functii';
import {UPDATE_MUTATION, OPERATIONS_COUNT_ALL, UPDATE_STATUS_ORDER} from '../queries';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { X } from 'react-feather';



export const CheckBox=({itempost, echipa, currentUser, bifareTotala, idComanda}) =>{


    const [updateStatusComanda]=useMutation(UPDATE_STATUS_ORDER, 
        {
            onCompleted: (rasp) => { console.log("update status")},
            onError: errorUpdateStatus => {
                toast.error(`Eroare schimbare status comanda! ${errorUpdateStatus.message}`, {
                    toastId: 'EroareSalvareStatusComanda',
                    autoClose:10000,
                    hideProgressBar:true
                    });
            }
        }
    );


    const [datav]=useLazyQuery(OPERATIONS_COUNT_ALL,
            {
                onCompleted: (rasp) => {
                    if (rasp.toate.aggregate.count=== rasp.finalizate.aggregate.count && rasp.trorder.Finalizata<2){
                       updateStatusComanda({ variables:{idComanda:idComanda, Finalizata:2}})
                    }else{
                        if(itempost.final===1 && rasp.toate.aggregate.count!== rasp.finalizate.aggregate.count){
                            updateStatusComanda({ variables:{idComanda:idComanda, Finalizata:1}}) 
                        }
                    }
                },
                onError: error => {
                    toast.error(`Eroare schimbare status comanda! ${error.message}`, {
                        toastId: 'EroareSalvareXX',
                        autoClose:10000,
                        hideProgressBar:true
                        });
                }
            }
        );

    const [inputValues, setInputValues]=useState({
        id:JSON.parse(itempost.id), 
        finalizat:itempost.Finalizat,
        utilizator:itempost? itempost.utilizator:"", 
        idsalariat1:itempost.salariat1? itempost.salariat1.id : null,
        idsalariat2:itempost.salariat2? itempost.salariat2.id : null,
        idsalariat3:itempost.salariat3? itempost.salariat3.id : null,
        idsalariat4:itempost.salariat4? itempost.salariat4.id : null,
        idsalariat5:itempost.salariat5? itempost.salariat5.id : null,
        trteam:itempost.trteam?itempost.trteam.id:null,
        numesalariat1:itempost.salariat1? itempost.salariat1.nume : "",
        numesalariat2:itempost.salariat2? itempost.salariat2.nume : "",
        numesalariat3:itempost.salariat3? itempost.salariat3.nume : "",
        numesalariat4:itempost.salariat4? itempost.salariat4.nume : "",
        numesalariat5:itempost.salariat5? itempost.salariat5.nume : "",
        numetrteam:itempost.trteam?itempost.trteam.denumire:"",
    });
    
    const [primaIncarcare, setPrimaIncarcare]=useState(true);
      
    const [update]=useMutation(UPDATE_MUTATION, 
        {
            onCompleted: (rasp) => {
                console.log(rasp,"update");
                datav({
                    variables:{idComanda:idComanda}, 
                    fetchPolicy: "network-only",   // Used for first execution
                    //nextFetchPolicy: "network-only", // Used for subsequent executions
                  });
                toast.success('Salvare cu succes!', {
                    toastId: 'SuccesSalvare',
                    autoClose:1500,
                    hideProgressBar:true
                    });
            },
            onError: errorUpdate => {
                toast.error(`Eroare salvare! ${errorUpdate.message}`, {
                    toastId: 'EroareSalvare',
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

    useEffect(() => { 
        if(bifareTotala===true){
            if (inputValues.finalizat!==true){
                setInputValues({ 
                    ...inputValues, 
                    finalizat:true, 
                    idsalariat1:echipa.salariat1?echipa.salariat1.id:null,
                    idsalariat2:echipa.salariat2?echipa.salariat2.id:null,
                    idsalariat3:echipa.salariat3?echipa.salariat3.id:null,
                    idsalariat4:echipa.salariat4?echipa.salariat4.id:null,
                    idsalariat5:echipa.salariat5?echipa.salariat5.id:null,
                    trteam:echipa.id?echipa.id:null,
                    utilizator:currentUser? currentUser.nume :"",
                    numesalariat1:echipa.salariat1? echipa.salariat1.nume : "",
                    numesalariat2:echipa.salariat2? echipa.salariat2.nume : "",
                    numesalariat3:echipa.salariat3? echipa.salariat3.nume : "",
                    numesalariat4:echipa.salariat4? echipa.salariat4.nume : "",
                    numesalariat5:echipa.salariat5? echipa.salariat5.nume : "",
                    numetrteam:echipa.denumire?echipa.denumire:""
                });
                
            }
        }   
    },[bifareTotala]);
    
    
    const handleChange=(e)=>{       
        if (inputValues.finalizat!==true){
            setInputValues({ 
                ...inputValues, 
                finalizat:true, 
                idsalariat1:echipa.salariat1?echipa.salariat1.id:null,
                idsalariat2:echipa.salariat2?echipa.salariat2.id:null,
                idsalariat3:echipa.salariat3?echipa.salariat3.id:null,
                idsalariat4:echipa.salariat4?echipa.salariat4.id:null,
                idsalariat5:echipa.salariat5?echipa.salariat5.id:null,
                trteam:echipa.id?echipa.id:null,
                utilizator:currentUser? currentUser.nume :"",
                numesalariat1:echipa.salariat1? echipa.salariat1.nume : "",
                numesalariat2:echipa.salariat2? echipa.salariat2.nume : "",
                numesalariat3:echipa.salariat3? echipa.salariat3.nume : "",
                numesalariat4:echipa.salariat4? echipa.salariat4.nume : "",
                numesalariat5:echipa.salariat5? echipa.salariat5.nume : "",
                numetrteam:echipa.denumire?echipa.denumire:null
            });
        }else{
            if (currentUser.id===(itempost.trteam?itempost.trteam.iduser.id:null) || (itempost.trteam?itempost.trteam.iduser.id:0)===0){
                setInputValues({ 
                    ...inputValues, 
                    finalizat:false,
                    idsalariat1:null,
                    idsalariat2:null,
                    idsalariat3:null,
                    idsalariat4:null,
                    idsalariat5:null,
                    trteam:null,
                    utilizator:currentUser? currentUser.nume :"",
                    numesalariat1: "",
                    numesalariat2: "",
                    numesalariat3: "",
                    numesalariat4: "",
                    numesalariat5: "",
                    numetrteam:""
                });
            }else{
                toast.error(`Doar seful echipei care a bifat pozitia o poate debifa. In acest mement, seful echipei care a bifat pozita este: ${itempost.trteam?itempost.trteam.iduser.nume:""}  `, {
                    toastId: 'EroareSalvare',
                    autoClose:5000,
                    hideProgressBar:true
                    }); 
            }  
        }
    }; 

    
  
    return(
        <div className="center">
            <form className="" noValidate="">
                <input type="checkbox" className='checkbox' name={'finalizat'} value={inputValues.finalizat} checked={inputValues.finalizat} onChange={handleChange} />
            </form>
            <small className='white'>{`${inputValues.idsalariat1 ||inputValues.idsalariat2 || inputValues.idsalariat3 || inputValues.idsalariat4 || inputValues.idsalariat5? "Echipa executanta: ":""} ${inputValues.trteam?inputValues.numetrteam:""}  ${inputValues.idsalariat1?inputValues.numesalariat1:""} ${inputValues.idsalariat2?", " + inputValues.numesalariat2:""} ${inputValues.idsalariat3?", " + inputValues.numesalariat3:""} ${inputValues.idsalariat4?", " + inputValues.numesalariat4:""} ${inputValues.idsalariat5?", " + inputValues.numesalariat5:""}`}</small>
            <br/>
            <small className='green'>{`${inputValues.idsalariat1? "Bifat de: ":""} ${inputValues.idsalariat1?inputValues.utilizator+" "+ (itempost?dataFormatRO(itempost.datamodificare):""):""}`}</small>
            
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

export default CheckBox;
