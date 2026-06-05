import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import './style.css';

const format ={
    butonDiv: 'row butonDiv',
    containerX:'containerX',
    buttonsdiv: 'form-control footer col-sm-11',
}

const useStyles = makeStyles((theme) => ({
    buttonAdauga: {
      margin: theme.spacing(0),
      fontSize: '14px',
      background:'primary'
    },

    buttonAdaugaMobile:{
      margin: theme.spacing(0),
      fontSize: '8px',
      background:'primary'
    },

    buttonModifica: {
        margin: theme.spacing(0),
        fontSize: '14px',
        background:'success-color'
      },
    
    buttonModificaMobile:{
    margin: theme.spacing(0),
    fontSize: '8px',
    background:'success-color'
    },

    buttonSterge: {
        margin: theme.spacing(0),
        fontSize: '14px',
        background:'secondary'
      },
    
    buttonStergeMobile:{
    margin: theme.spacing(0),
    fontSize: '8px',
    background:'secondary'
    },
  }));

  
export const Butoane=props => {
    const { handleAdauga, handleSalveaza, handleSterge, titleAdauga, titleSalveaza, titleSterge, activAdauga, activSalveaza, activSterge}=props; 
    const classes = useStyles();
    const isMobile = useMediaQuery({ query: '(max-width: 770px)' }); // interogare rezolutie dispozitiv
    
    
        return (
            <Fragment>
                <div className='jurnal'>
                    <Button 
                        className={'butonjurnal'}
                        color="primary"
                        onClick={()=>toast.info(`Creat de: ${props.formikValues.createdBy} la data: ${props.formikValues.created_at}  ;  Modificat de: ${props.formikValues.updatedBy} la data: ${props.formikValues.updated_at}`, {
                            toastId: 'informarejurnal'
                        })} 
                        startIcon={<MoreHorizIcon/>}
                        size={isMobile?"small": "medium"}
                    >
                    </Button>
                </div>
                <div className={format.buttonsdiv}>
                    <div className={format.containerX}>
                        <div className={format.butonDiv}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    className={isMobile?classes.buttonAdaugaMobile:classes.buttonAdauga}
                                    onClick={handleAdauga} 
                                    disabled={!activAdauga}
                                    startIcon={<AddCircleIcon />}
                                    size={isMobile?"small": "medium"}
                                >
                                    {titleAdauga}
                                </Button>
                        </div>
                        <div className={format.butonDiv}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    className={isMobile?classes.buttonModificaMobile:classes.buttonModifica}
                                    onClick={handleSalveaza} 
                                    disabled={!activSalveaza}
                                    startIcon={props.stare==='adauga'?<SaveRoundedIcon/>:<EditRoundedIcon/> }
                                    size={isMobile?"small": "medium"}
                                >
                                    {titleSalveaza}
                                </Button>
                        </div>
                        <div className={format.butonDiv}> 
                            <Button 
                                variant="contained"
                                color="secondary"
                                className={isMobile?classes.buttonStergeMobile:classes.buttonSterge}
                                onClick={handleSterge} 
                                disabled={!activSterge}
                                startIcon={props.stare ==='adauga'?<CancelRoundedIcon/>:<DeleteForeverRoundedIcon/> }
                                size={isMobile?"small": "medium"}
                                >
                                    {titleSterge}
                            </Button>
                        </div>
                    </div> 
                </div>
            </Fragment> 
            
        )
    }

export default Butoane
