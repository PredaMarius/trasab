import React, {Fragment, useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useLazyQuery } from '@apollo/client';
import { ORDER_CONTENT} from './queries';
import {dataFormatRO} from '../../functii/functii';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';


export const Fisa=(props) =>{
    const [inputValues,setInputValues]=useState({comanda:0, produs:"JV"})

    const [query, {data,loading,error}]=useLazyQuery(ORDER_CONTENT,
        {
            onCompleted: (rasp) => {
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

    const handleOnClick=()=>{
        console.log(inputValues)
        query({
            variables:{NumarBon:JSON.parse(inputValues.comanda), Produs:inputValues.produs}, 
            fetchPolicy: "network-only",   // Used for first execution
          });
    }

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value});
    }; 


      if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
      if (error) return (<h6>Loading error:{error.message}</h6>);
    
      return (
        <Fragment>
            <div className='container'  style={{marginLeft:"15px"}} >
                <div className="row" style={{marginTop:"100px"}}>
                    <label style={{width:"120px"}}>Numar comanda:</label>
                    <input name="comanda" style={{width:"200px"}} onChange={handleChange}></input>
                </div>
                <div className='row' style={{marginTop:"5px"}} >
                    <label style={{width:"120px"}}>Tip produs:</label>
                    <select name="produs" id="produs-select" style={{width:"200px"}} onChange={handleChange}>
                        <option value="JV">Jaluzele verticale</option>
                        <option value="RO">Rolete panza</option>
                        <option value="RE">Rulouri exterioare</option>
                        <option value="UG">Usi de garaj</option>
                        <option value="PI">Plase insecte</option>
                        <option value="JO">Jaluzele orizontale</option>
                        <option value="SV">Servicii</option>
                    </select>    
                </div>
                <div className="row" style={{marginTop:"10px"}}>
                    <button onClick={handleOnClick}>Genereaza Fisa</button>
                </div>
            </div>
           <div style={{paddingTop:"15px"}}>
           <TreeView
                aria-label="file system navigator"
                orientation="vertical"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 800, flexGrow: 1, width:"100%", overflowY: 'auto' }}
                >
                {data && data.trorders.map((comanda, index)=>
                    <TreeItem nodeId={"id"+ index} label={comanda.NumarBon + '/' + dataFormatRO(comanda.Data).substring(0, 10) + ' '+ comanda.DenumireFirma}>
                    { comanda && comanda.trordercontents && comanda.trordercontents.map((reper,index)=>
                        <TreeItem nodeId={"idreper"+ index} label={'Reper: '+reper.NrCrt }>
                            <TreeItem nodeId={"idrepercontinut"+ index} label={"Continut reper: " + (reper.Rand1?reper.Rand1:"") + (reper.Supliment1?reper.Supliment1:"") + (reper.Rand2?reper.Rand2:"")  + (reper.Supliment2?reper.Supliment2:"") + (reper.Rand3?reper.Rand3:"")  + (reper.Supliment3?reper.Supliment3:"")}>
                                { reper && reper.tritemoperations && reper.tritemoperations.map((operatie,index)=>
                                    <TreeItem nodeId={"idoperatie"+ index} label={'Operatie: '+ operatie.trjob.denumire }>
                                        <TreeItem nodeId={"idexecutanti"+ index} label={'Executanti: '+ (operatie.salariat1?operatie.salariat1.nume:"") +  (operatie.salariat2?' ,'+ operatie.salariat2.nume:"")+  (operatie.salariat3?' ,'+ operatie.salariat3.nume:"")+  (operatie.salariat4?' ,'+ operatie.salariat4.nume:"")+  (operatie.salariat5?' ,'+ operatie.salariat5.nume:"") }>
                                        </TreeItem>
                                    </TreeItem>
                                )}
                            </TreeItem>
                        </TreeItem>
                        )

                    }
                    
                    </TreeItem>
                    )} 
                </TreeView>
            </div>

           
        </Fragment>
    )
}

export default Fisa
