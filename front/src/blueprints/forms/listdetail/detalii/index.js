import React, { Fragment,useEffect, useState} from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useFormik, getIn} from 'formik'; 
import { useQuery, useMutation} from '@apollo/client';
import {defaultvalues} from './defaultvalues';
import {validate} from './validation';
import {FIELDS} from './fields';
import './style.css';
import Butoane from '../butoane';
import { DETAIL_QUERY, ADD_MUTATION, UPDATE_MUTATION, DELETE_MUTATION, ADD_FRAGMENT, ROLE_QUERY, ADDIMAGE_MUTATION } from './queries';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import ModalYesNo from '../../common/modal_components/modal_yes_no';
import {getUser} from '../../../localstorage/localstorage';
import {dataFormatRO} from '../../../localstorage/functiiComune'
import moment from 'moment';
import userimg from '../../../assets/images/userimg.png';
import {strapiUrl} from '../../../config/strapi';
import { X } from 'react-feather';


//----------------------------SETTINGS-----------------------------

const QUERY_NAME = 'user'; //((((((((()))))))))setare specifica in caz de replicare
const taburi = ['Date','Discounturi','Adaosuri','Fotografie','Parola'];


const format ={
    label:'col-2 inputFormat',
    input:'form-control  col-9  inputFormat',
    media:'upload',
    labelMobile:'col-4 inputFormat',
    inputMobile:'form-control  col-8  inputFormat ',
    selectinput:'form-control form-control-sm col-9 inputListFormat',
    selectinputMobile:'form-control form-control-sm col-8 inputListFormat',
    checkinput:'form-control form-control-sm inputCheckFormat',
    checkinputMobile:'form-control form-control-sm col-1 inputCheckFormat',
    smalllabel:'col-3 inputFormat',
    smalllabelMobile:'col-6 inputFormat',
    smallinput:'form-control  col-2  inputFormat',
    smallmedia:'upload',
    smallinputMobile:'form-control  col-4  inputFormat',
    smallmediaMobile:'upload',
    div:'form-group row divFormat',
    smalldiv:'form-group row divFormat',
    button: 'btn btn-primary buttonFormat', 
    error:'error',
    loading:'loading'
}


export const Detalii=({id, handleListDisabled, handleListDeselect})=> {

    const dateUtilizator=getUser();// extragere informatii utilizator logat
    const USERNAME=dateUtilizator && dateUtilizator.username ? dateUtilizator.username:'necunoscut@necunoscut.ne' ;// extragere daor username din informatiile utilizatorului logat 
    const columns = FIELDS; // campurile formularului de detalii (importate din fisierul campuri)

    //--------------------------------------------STATE MANAGEMENT------------------------------------------------

        const [disabledFields, setDisabledFields] = useState(true); // setare activare campuri
        const [activAdauga, setActivAdauga] = useState(true);  // setare activare buton Adauga
        const [activSalveaza, setActivSalveaza] = useState(true); // setare activare buton Salveaza/Modifica
        const [activSterge, setActivSterge] = useState(true); // setare activare buton Sterge/Abnndon
        const [titleAdauga, setTitleAdauga] = useState('ADAUGA');  // setare titlu buton Adauga
        const [titleSalveaza, setTitleSalveaza] = useState('MODIFICA'); // setare titlu buton Salveaza/Modifica
        const [titleSterge, setTitleSterge] = useState('STERGE'); // setare titlu buton Sterge/Abandon
        const [openModal, setOpenModal] = useState(false); // setare deschidere mesaj atentionare(ex. la stergere)
        const [stare, setStare] = useState(''); // setare stare formula ('adauga' sau 'modifica' sau '')
        const [file, setFile]=useState('');
        const [dummyimg, setDummyimg]=useState(userimg);
    //---------------------------------------------FORMIK-----------------------------------------------------
        const formik = useFormik({   
            initialValues: defaultvalues,
            validateOnChange:false,
            validateOnBlur:false,
            onSubmit: (values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);
                },    
        });

    //---------------------------------------------MEDIA QUERY-----------------------------------------------------

        const isMobile = useMediaQuery({ query: '(max-width: 770px)' }); // interogare rezolutie dispozitiv

    //---------------------------------------QUERIES---------------------------------------------------------------

        const { loading, data, error } = useQuery(DETAIL_QUERY, {variables: {id: id}}); // extragere inregistrari pe baza id-ului inregitrarii selectate din lista => preluat din props       
        const {data:roleSource, loading:loadingRoleSource, error:errorRoleSource}=useQuery(ROLE_QUERY); //((((((((())))))))) extragere inregistrari pentru campul de tip select 'role.id'
        
       
    //--------------------------------------MUTATIONS--------------------------------------------------------------
        //.................................Adaugare ..............................................
            const [createx, {loading:loadingAdd, error:errorAdd}] = useMutation(ADD_MUTATION, 
                {
                    update: (cache, {data:{createUser}})=>{ //((((((((()))))))))setare specifica in caz de replicare
                        cache.modify({
                        fields: {
                            users(existing = []) {
                            const newRef = cache.writeFragment({
                                data: createUser.user, //((((((((()))))))))setare specifica in caz de replicare
                                fragment: ADD_FRAGMENT
                            });
                            formik.setFieldValue( "id",createUser.user.id) //((((((((()))))))))setare specifica in caz de replicare
                            return [...existing, newRef];
                            }
                        }
                        });
                    }
                }); 

        const [createImage, {loading:loadingImage, error:errorImage}] = useMutation(ADDIMAGE_MUTATION,
            {
                onCompleted:(rasp)=>{formik.setFieldValue( "['fotografie.url']", rasp.upload.url?rasp.upload.url:'')}
            }
            );             

                
        //.................................Modificare...............................................
            
            const [updatex, {loading:loadingUpdate, error:errorUpdate}]=useMutation(UPDATE_MUTATION);
           

        //.................................Stergere.................................................
        
            const [deletex , {loading:loadingRemove, error:errorRemove}]=useMutation(DELETE_MUTATION,
                {
                    update: (cache)=>{
                        cache.modify({
                            fields: {
                                users(existing = [], { readField }) {
                                    return existing.filter(ref=>(readField('id', ref)!==formik.values.id));
                                }
                            }        
                        })
                    
                    //reseteaza valorile campurilor la valorile default
                    columns.forEach(col => {
                        formik.setFieldValue(col.field, defaultvalues[col.field], false);
                    });
                    }
                });
    
    //---------------------------------------USE EFFECT-------------------------------
    useEffect(() => {
        
        const onCompleted = (data, imgData) => { 
            
            if (data && data[QUERY_NAME] && data[QUERY_NAME].id){
                columns.forEach(col => {
                    var campQuery = (col.field).toString().replace('.','[') + ']';
                    var campFormik="['"+col.field+"']";
                    var valoare= getIn(data[QUERY_NAME], campQuery) 
                    console.log(campFormik,valoare)
                    formik.setFieldValue( campFormik ,(moment.utc(valoare).isValid() && (valoare?valoare.toString().slice(-1)==='Z':false))? dataFormatRO(valoare):valoare, false);
                });
            } 
        };

        const onError = (error) => { /* magic */ };
            if (onCompleted || onError) {
                if (onCompleted && !loading && !error) {
                    onCompleted(data);
                } else if (onError && !loading && error) {
                    onError(error);
                }
            }
    },[data, roleSource]); //loading, data, error, roleSource, loadingRoleSource, errorRoleSource

    //((((((((()))))))))de adaugat sursa campurilor de tip select in []
    //--------------------------------------ACTIONS-----------------------------------------------------------
         //.................................Adaugare.................................................
            const handleAdauga=()=>{
                //reseteaza valorile campurilor la valorile default
                    columns.forEach(col => {
                        formik.setFieldValue(col.field, defaultvalues[col.field], false);
                    });
                // setare stare 'adauga'    
                    setStare('adauga');
                //no list selection
                    handleListDeselect();
                //disable list selection
                    handleListDisabled(true);
                //modifica become salveaza
                    setTitleSalveaza('SALVEAZA');
                //sterge become abandon
                    setTitleSterge('ABANDON');
                //disabled fields
                    setDisabledFields(false);
                //disabled button Adauga
                    setActivAdauga(false);
            }
        //.................................Modificare/Salvare.................................................
            const handleSalveaza = (e) => {
                if(titleSalveaza==='MODIFICA'){ //MODIFICA
                    if(formik.values.id){
                        // setare stare 'adauga'
                            setStare('modifica');
                        //activate fields  
                            setDisabledFields(false);
                        //disable list selection
                            handleListDisabled(true);
                        //modifica become salveaza    
                            setTitleSalveaza('SALVEAZA');
                        //sterge bacome abandon
                            setTitleSterge('ABANDON');
                        //disable button Adauga
                            setActivAdauga(false);
                    }
                }

                if(titleSalveaza==='SALVEAZA'){ // SALVEAZA
                   if(validate(formik.values).existaErori) {
                       validate(formik.values).erori.map(eroare=>toast.error(eroare))
                   }else{
                        if (formik.values.id) {
                            updatex({ variables: 
                                {...formik.values,
                                    username:formik.values.email, 
                                    updatedBy:USERNAME,
                                    role:formik.values['role.id'], //((((((((()))))))))setare specifica in caz de replicare
                                }}); 
                                
                        }else{ 
                            createx({ variables: {
                                ...formik.values,
                                createdBy:USERNAME,
                                username:formik.values.email, 
                                role:formik.values['role.id'] ////((((((((()))))))))setare specifica in caz de replicare
                            }}); 
                        }

                        if(!errorAdd && !errorUpdate && !loadingAdd && !loadingUpdate){
                            //setare stare ''
                                setStare('');
                            //disable fields
                                setDisabledFields(true);
                            //activate list selection
                                handleListDisabled(false);
                            //salveaza become modifica
                                setTitleSalveaza('MODIFICA');
                            //abandon become sterge
                                setTitleSterge('STERGE');
                            //activate Adauga
                                setActivAdauga(true);
                            //mesaj salvare cu succes
                            toast.success('Salvare cu succes!', {
                                toastId: 'SuccesSalvare',
                                autoClose:1500,
                                hideProgressBar:true
                                });

                        } 
                    }      
                }  
            };

        //.................................Stergere/Abandon.................................................
            const handleSterge = (e) => {
                if(titleSterge==='ABANDON'){ //ABANDON
                    if (data && data[QUERY_NAME] && data[QUERY_NAME].id){
                        columns.forEach(col => {
                            formik.setFieldValue(col.field, data[QUERY_NAME][col.field]? data[QUERY_NAME][col.field] : defaultvalues[col.field], false);
                        });  
                    }
                    //stare ''
                        setStare('');
                    //activate fields
                        setDisabledFields(true);
                    //activate list selection
                        handleListDisabled(false);
                    //salveaza become modifica
                        setTitleSalveaza('MODIFICA');
                    //abandon become sterge
                        setTitleSterge('STERGE');
                    //activate Adauga
                        setActivAdauga(true);
                }
        
                if(titleSterge==='STERGE'){ //STERGE
                    if (formik.values.id) {
                        deletex({ variables: {id:formik.values.id}});  
                    }else{  
                        toast.error('Nu ati selectat nici o inregistrare!', {
                            toastId: 'eroareStergere'
                          });
                    }
                    
                    if(!errorRemove && !loadingRemove){
                        // stare ''
                            setStare('');
                        //disable fileds
                            setDisabledFields(true);
                        // activate list selection
                            handleListDisabled(false);
                        // close delete window
                            setOpenModal(false);
                    }    
                }   
            };

    //---------------------------------MODAL--------------------------------------
        const onOpenModal = () => {
            if(titleSterge==='STERGE'){  
                setOpenModal(true);
            }
            if(titleSterge==='ABANDON'){  
                handleSterge();
            }
        };
        const onCloseModal = () => {
            setOpenModal(false);
        };
    //----------------------------SELECTSWITCH----------------------------------------------
    const selectSwitch=(selectField) =>{
        //console.log(roleSource)
        const defaultSource= [{id:0,name:''}]
        
        switch(selectField) {
          case 'role.id':
            return  errorRoleSource || loadingRoleSource ? defaultSource:roleSource.roles;
          default:
            return defaultSource;
        }
      }
      //((((((((()))))))))de adaugat sursa campurilor de tip select (vezi la QUERIES si la USE EFECT)


    //----------------------------HANDLE IMAGE CHANGE----------------------------------------------

        //image upload
        const handleSubmit=(e)=> {
            e.preventDefault();
        }
        //.........
      const handleImgChange=(e)=>{
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            const dummyimg = reader.result;
            createImage({ variables: {refId:id, ref:"plugins::users-permissions.user", field:'fotografie', file:file}}); //((((((((()))))))))setare specifica in caz de replicare
            

            // setFile(file);
            // setDummyimg(dummyimg)
        }
        reader.readAsDataURL(file)
    }
    

  if (loading) return (<ClipLoader color={'blue'} loading={loading} css={{position: 'absolute', left: '50%', top: '50%'}}  size={50} />);
  if (error) return (<h6>Loading error:{error.message}</h6>);

  return (     
        <Fragment>
                <Tabs>
                {/*----------------------------------TABS------------------------------------*/}
                    <TabList className="nav nav-tabs tab-coupon" >
                        {taburi && stare==='adauga' && taburi.map(tab => (
                            <Tab className={isMobile?"nav-link nav-link-mobile":"nav-link nav-link-desktop"} key={tab}>{tab}</Tab>
                        ))}

                        {taburi && stare!=='adauga' && taburi.filter(t=>t !== 'Parola').map(tab => ( //((((((((()))))))))setare specifica in caz de replicare
                            <Tab className={isMobile?"nav-link nav-link-mobile":"nav-link nav-link-desktop"} key={tab}>{tab}</Tab>
                        ))}
                    </TabList>
                {/*----------------------------------CONTINUT TABS------------------------------------*/}  
                    {/*generarea taburilor pe baza constantei taburi, de tip array, incarcata cu titlurile lor in coreltie cu valorile group din fields.js */}  
                        {taburi && taburi.map(tab => (
                            <TabPanel key={tab}>
                                <form className="needs-validation user-add" noValidate="">
                                {/*generare campurilor pe baza FIELDS din fisierul fields.js(incarcat in  const columns) daca au valoarea hide=false si in functie de 
                                     group= titlul tab-ului si a celorlate valori din fields.js*/}
                                    {columns.filter(col=>col.hide===false && col.group===tab).map(column => (
                                        <div className={format.div} key={column.headerName}>
                                                <label 
                                                    htmlFor={column.field} 
                                                    className={isMobile?(column.format==='small'?format.smalllabelMobile:format.labelMobile):(column.format==='small'?format.smalllabel:format.label)}
                                                >
                                                    {column.headerName} {column.required?<span>*</span>:''}
                                                </label>
                                            {/*----------------------------------Capuri de tip 'input'------------------------------------*/}
                                                {column.input==='input'?
                                                    <input 
                                                        className={isMobile?(column.format==='small'?format.smallinputMobile:format.inputMobile):(column.format==='small'?format.smallinput:format.input)} 
                                                        id={column.field} type={column.type} 
                                                        required={column.required} 
                                                        name={column.field} 
                                                        value={formik.values[column.field]} 
                                                        onChange={formik.handleChange} 
                                                        onBlur={formik.handleBlur}
                                                        disabled={disabledFields}
                                                    />
                                                :null}
                                            {/*----------------------------------Capuri de tip 'select'------------------------------------*/}
                                                {column.input==='select'?
                                                    <select
                                                        className={isMobile?format.selectinputMobile:format.selectinput} 
                                                        id={column.field} type={column.type} 
                                                        required={column.required} 
                                                        name={"['"+column.field+"']"} 
                                                        value={formik.values[column.field]} 
                                                        onChange={formik.handleChange} 
                                                        onBlur={formik.handleBlur}
                                                        disabled={disabledFields}
                                                    >
                                                        {selectSwitch(column.field).map(opt => (<option value={opt.id} key={opt.id}>{opt.name}</option>))}

                                                    </select>
                                                :null}
                                            {/*----------------------------------Capuri de tip 'checkbox'------------------------------------*/}
                                                {column.input==='checkbox'?
                                                    <input
                                                        className={isMobile?format.checkinputMobile:format.checkinput} 
                                                        id={column.field} type={column.type} 
                                                        required={column.required} 
                                                        name={column.field} 
                                                        checked={formik.values[column.field]} 
                                                        onChange={formik.handleChange} 
                                                        onBlur={formik.handleBlur}
                                                        disabled={disabledFields}
                                                        
                                                    /> 
                                                :null} 

                                            {/*----------------------------------Capuri de tip 'media'------------------------------------*/}
                                            {column.input==='media'?
                                                <div className="box-input-file" key={column.headerName}>
                                                    <input 
                                                        className={isMobile?(column.format==='small'?format.smallmediaMobile:format.mediaMobile):(column.format==='small'?format.smallmedia:format.media)} 
                                                        id={column.field} type={column.type} 
                                                        required={column.required} 
                                                        name={"['"+column.field+"']"} 
                                                        value={''} 
                                                        onChange={handleImgChange} 
                                                        onBlur={formik.handleBlur}
                                                        disabled={disabledFields}
                                                    />
                                                    <img src={formik.values[column.field]?strapiUrl+formik.values[column.field]:dummyimg} alt='fotografie' style={{ width: 100, height: 100 }} />
                                                    <a id="result1" onClick={handleSubmit}></a>
                                                </div>
                                                :null}
                                            
                                        </div>
                                    ))}
                                </form>
                            </TabPanel>
                        ))} 
                </Tabs>

                 {/*-----------------------------------BUTOANE-------------------------*/}                               
                    <Butoane 
                        stare={stare}
                        formikValues={formik.values} 
                        handleAdauga={handleAdauga}    
                        handleSalveaza={handleSalveaza}
                        handleSterge={onOpenModal}
                        titleAdauga={titleAdauga}
                        titleSalveaza={titleSalveaza}
                        titleSterge={titleSterge}
                        activAdauga={activAdauga}
                        activSalveaza={activSalveaza}
                        activSterge={activSterge}
                    />
                {/*-----------------------------------MESAJE LOADING-------------------------*/} 
                    {loadingAdd && <ClipLoader color={'blue'} loading={loading}   size={50} />}
                    {loadingUpdate && <ClipLoader color={'blue'} loading={loading}  size={50} />}
                    {loadingRemove && <ClipLoader color={'blue'} loading={loading}  size={50} /> }
                {/*-----------------------------------MESAJE EROARE-------------------------*/}                            
                    {errorAdd && toast.error(`Eroare: ${errorAdd.message}`, {
                        toastId: 'eroareadaugare'
                    })}
                    {errorUpdate && toast.error(`Eroare: ${errorUpdate.message}`, {
                        toastId: 'eroare.modificare'
                    })}
                    {errorRemove && toast.error(`Eroare: ${errorRemove.message}`, {
                        toastId: 'eroareastergere'
                    })}

                    {errorImage && toast.error(`Eroare: ${errorImage.message}`, {
                        toastId: 'eroareasImagine'
                    })}
                 {/*-----------------------------------MESAJ CONFIRMARE STERGERE-------------------------*/}
                    <ModalYesNo 
                        open={openModal} 
                        onClose={onCloseModal} 
                        onClickNo={onCloseModal} 
                        onClickYes={handleSterge}  
                        title={'Atentie!'} 
                        message={'Sigur doriti sa stergeti inregistrarea selectata?'}
                    />   
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
        </Fragment>
  );
}

export default Detalii