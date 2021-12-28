import React from 'react';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AllOutIcon from '@mui/icons-material/AllOut';

import {colors} from '../../../constants/colors';
import '../style.css';

export const Departament=({departament, index, currentUser, sef}) =>{
        
    return(
            <div  key={departament.id} className="card o-hidden widget-cards row"  sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] }}}>
                <Link
                    key={departament.id}
                    to={{pathname:`${process.env.PUBLIC_URL}/sectii/${departament.id}`, state:{ departament: departament, currentUser:currentUser} }}
                >
                    <ListItemButton  className="row" sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] }, }}  >
                        <ListItemIcon >
                            <AllOutIcon/>
                        </ListItemIcon>
                        <ListItemText  primary={departament.denumire} secondary={`Sef departament: ${sef}`} primaryTypographyProps={{fontWeight: 'bold', color:'white'}} secondaryTypographyProps={{fontSize:'10px !important', color:'white'}} />                
                    </ListItemButton>
                </Link>  
            </div>
    );
}

export default Departament;
