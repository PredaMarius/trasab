import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Truncate from "react-truncate";

import Divider from '@material-ui/core/Divider';


import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@mui/material/ListItemText';

import CheckBox from './checkbox';
import './style.css';

//--------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      //maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));






export const Reper=({ reper, echipa, currentUser, bifareTotala, idComanda, handleReflow, lines}) =>{
    const classes = useStyles();
    const itempost = reper.tritemoperations.filter(item=>item.trjob.id===echipa.trjob.id)[0] 
    const [truncated, setTruncated]=useState(false)
    const [expanded, setExpanded]=useState(false)

    const handleTruncate=(trunc)=>{
        if (truncated !== trunc) {
          setTruncated(trunc);
        }
      }
    
      const toggleLines=(event)=> {
        event.preventDefault();
        setExpanded(!expanded);
      }

    return(
        <div  key={reper.id}  >
                <ListItem className='row' sx={{ width: '100%', backgroundColor: '#708090','&:hover, &:focus': {backgroundColor: '#666699' }, }} >
                    <ListItemText className='nrCrt center'
                        primary={reper.NrCrt}
                        primaryTypographyProps={{fontWeight: 'bold', color:'#9ba7b4', margin: '0px auto', width:'100%', noWrap:true}} 
                    />
                    <ListItemText 
                        primary={
                            <div>
                                <Truncate
                                    width={500}
                                    lines={!expanded?1:10}
                                    ellipsis={ 
                                        <span>
                                            <a href="#" onClick={toggleLines}>
                                                {'>>>'}
                                            </a>
                                        </span>
                                    }
                                    onTruncate={handleTruncate}
                                >
                                    {(reper.Rand1?reper.Rand1:"") + (reper.Supliment1?reper.Supliment1:"") + (reper.Rand2?reper.Rand2:"")  + (reper.Supliment2?reper.Supliment2:"") + (reper.Rand3?reper.Rand3:"")  + (reper.Supliment3?reper.Supliment3:"") + (reper.Rand4?reper.Rand4:"")  + (reper.Supliment4?reper.Supliment4:"")} 
                                </Truncate>
                                {!truncated && expanded && (
                                    <span>
                                    {" "}
                                    <a href="#" onClick={toggleLines}>
                                        {'<<<'}
                                    </a>
                                    </span>
                                )}
                            </div>}
                        primaryTypographyProps={{fontWeight: 'bold', color:'#9ba7b4', margin: '0px auto', width:'98%'}} 
                    />
                    <div className='row center'>
                        {itempost && itempost.id ?
                            <CheckBox 
                                itempost={itempost} 
                                currentUser={currentUser} 
                                echipa={echipa}
                                bifareTotala={bifareTotala}
                                idComanda={idComanda}
                            />
                        :
                            null
                        }
                    </div>
                </ListItem>
                <div className='devider'/>
             
        </div>
    );
}

export default Reper;
