import React, { Fragment, useState } from 'react';
import Lista from './lista/index';
import Detalii from './detalii';
import { useMediaQuery } from 'react-responsive';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

// constante ce necesita setare in functie de formular
const TITLE ='Utilizatori'



export const Users=props => {
    const classes = useStyles();
    const [idList, setIdList] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [selectionModel, setSelectionModel]=useState([]);
    

      const handleListRowSelection = (e) => {
        setIdList(e.data.id);
        //console.log (e.data.id)
      };
    
      const handleListDisabled = (value) => {
        setDisabled(value);
      };

      const handleListDeselect = () => {
        setSelectionModel([]);
      };

      const isMobile = useMediaQuery({ query: '(max-width: 770px)' });
          
        return (
            <Fragment>
                <div className="card-header">
                    <h5>{TITLE}</h5>
                </div>
                <div className="container-fluid">
                    <div className="card">
                   
                        <div className="card-body" style={{ width: '100%', padding:'5px' }}>
                            <div className="clearfix"></div>
                            <div className= {isMobile? 'column mobile':'row desktop'} >
                               {isMobile?
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Selecteaza utilizator...</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className={isMobile?"col-12 mobileList":"col-5 desktopList"}>
                                            <Lista handleListRowSelection={handleListRowSelection} disabled={disabled} selectionModel={selectionModel} /> 
                                        </div>
                                        </AccordionDetails>
                                </Accordion>
                                :
                                    <div className={isMobile?"col-12 mobileList":"col-5 desktopList"}>
                                        <Lista handleListRowSelection={handleListRowSelection} disabled={disabled} selectionModel={selectionModel} /> 
                                    </div>}
                                
                                <div className={isMobile?"col-12 mobileDetail":"col-7 desktopDetail"}>
                                    <Detalii id={idList} handleListDisabled={handleListDisabled} handleListDeselect={handleListDeselect} />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }


export default Users
