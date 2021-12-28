import React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import {colors} from '../../../constants/colors';
import '../style.css';


export const Sectie=({ sectie, index, currentUser, sef }) =>{

    return(
       
        <div  key={ sectie.id } className="card o-hidden widget-cards"  sx={{ width: '100%', backgroundColor:colors[index], '&:hover, &:focus':{ backgroundColor: colors[index] } }}>
            <Link
                to={{ pathname:`${process.env.PUBLIC_URL}/posturi/${sectie.id}`, state:{sectie:sectie, currentUser:currentUser} }}
                key={sectie.id}
            >
                <ListItemButton sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] } }}>
                    <ListItemIcon >
                        <GpsFixedIcon/>
                    </ListItemIcon>
                    <ListItemText  
                        primary={ sectie.denumire } 
                        secondary={`Sef sectie: ${sef}`} 
                        primaryTypographyProps={{fontWeight: 'bold', color:'white'}} 
                        secondaryTypographyProps={{fontSize:'10px !important', color:'white'}} 
                    />                
                </ListItemButton>
            </Link>  
        </div>
    );
}

export default Sectie;
