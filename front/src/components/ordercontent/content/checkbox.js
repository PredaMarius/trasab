import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useLazyQuery} from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import {dataFormatRO} from '../../../functii/functii';
import {UPDATE_MUTATION, OPERATIONS_COUNT_ALL, UPDATE_STATUS_ORDER, STATUS_ID, STATUS_UPDATE} from '../queries';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { X } from 'react-feather';



export const CheckBox=({itempost, echipa, currentUser, bifareTotala, idComanda, status, updateStatus, setStatus}) =>{
//--------------------------------------------------------------------------
//functie update status comanda in trorder
    const [updateStatusComanda]=useMutation(UPDATE_STATUS_ORDER, 
        {
            fetchPolicy: "no-cache",
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

//--------------------------------------------------------------------------
// functie de extragere a datelor din tritemoperation privind bifarea post item-urilor aferente comenzii curente
// rasp.toate.aggregate.count=== rasp.finalizate.aggregate.count => nr total item-uri comanda === nr total imte-uri bifate
//rasp.finaletoate.aggregate.count===rasp.finalefinalizate.aggregate.count => nr total intem-uri cu statut de operatie finala in reteta === nr total intem-uri cu statut de operatie finala in reteta, bifate
// Semnificatie valoare camp  in trorder : Finalizata: 0 - comanda nefinalizata , Finalizata:1 -comanda ce are bifate intem-urile finale dar are item-uri intermediare nebifate; Finalizata:2 -finalizata total
    const [datav]=useLazyQuery(OPERATIONS_COUNT_ALL,
            {
                fetchPolicy: "no-cache",
                onCompleted: (rasp) => {
                    if (rasp.toate.aggregate.count=== rasp.finalizate.aggregate.count){
                       updateStatusComanda({ variables:{idComanda:idComanda, Finalizata:2}})
                       console.log("comanda finalizata total(2)");
                    }else{
                        if(rasp.finaletoate.aggregate.count===rasp.finalefinalizate.aggregate.count){
                            updateStatusComanda({ variables:{idComanda:idComanda, Finalizata:1}})
                            console.log("comanda finalizata partial(1)"); 
                        }else{
                            updateStatusComanda({ variables:{idComanda:idComanda, Finalizata:0}})
                            console.log("comanda nefinalizata(0)"); 
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

    //--------------------------------------------------------------------------
    // declarare si incarcare initiala : inputValues cu datele din tritemoperations 
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

    //--------------------------------------------------------------------------
    // variabila ce ajuta la detectarea daca componenta Checkbox este la primul render;
    
    const [primaIncarcare, setPrimaIncarcare]=useState(true);

     //--------------------------------------------------------------------------
    // functia de update la bifarea sau debifarea unui item
      
    const [update]=useMutation(UPDATE_MUTATION, 
        {
            onCompleted: (rasp) => {
                console.log("update modificare bifare", rasp);
                //..............................update status in trorder
                datav({ 
                    variables:{idComanda:idComanda, x:Date()}, 
                    fetchPolicy: "no-cache",
                });
                //.................................update status in trstatus
                updateStatus({ variables:{id:status.id, NrRepereBifate:rasp.updateTritemoperation.tritemoperation.Finalizat?status.NrRepereBifate+1:status.NrRepereBifate-1}})
                setStatus([{...status, NrRepereBifate:rasp.updateTritemoperation.tritemoperation.Finalizat?status.NrRepereBifate+1:status.NrRepereBifate-1}])
                //............................................
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

    //---------------------------------------------------------------------------------------------------------------------------------------
    //declansare update item la bifare in cazul in care inputVlaues sunt modificate, mai putin la incarcarea initala a componentei checkbox.
    useEffect(() => { 
        if(primaIncarcare===false){
            update({ variables:inputValues
            });  
        } 
        setPrimaIncarcare(false)
    },[inputValues]);

     //---------------------------------------------------------------------------------------------------------------------------------------
    //declansare update total la actionarea butonului de bifare totala. Modificarea inputValues va declansa si rularea codului useEffect de mai sus
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
    
 //---------------------------------------------------------------------------------------------------------------------------------------
//functia atasata operatiei de bifare/debifare checkbox => modifica inputValues -> ce declanseaza primul useEffect
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

    //---------------------------------------------------------------------------------------------------------------------------------------
  
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
