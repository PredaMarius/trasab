import React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StreamIcon from '@mui/icons-material/Stream';
import {colors} from '../../../constants/colors';
import '../style.css';


export const PostComenzi=({echipa, index,  currentUser}) =>{
      
    return(
        <div  key={echipa.id} className="card o-hidden widget-cards"  sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] }}}>
            <Link
                to={{pathname:`${process.env.PUBLIC_URL}/comenzi/${echipa.trjob.id}`, state:{ echipa: echipa , currentUser:currentUser} }}
                key={echipa.id}
            >
                <ListItemButton sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] }, }}  >
                    <ListItemIcon >
                        <StreamIcon/>
                    </ListItemIcon>
                    <ListItemText  
                        primary={echipa.trjob.denumire} 
                        secondary={`${echipa.salariat1 ||echipa.salariat2 || echipa.salariat3 || echipa.salariat4 || echipa.salariat5? "":""} ${echipa.salariat1?echipa.salariat1.nume:""} ${echipa.salariat2?", " + echipa.salariat2.nume:""} ${echipa.salariat3?", " + echipa.salariat3.nume:""} ${echipa.salariat4?", " + echipa.salariat4.nume:""} ${echipa.salariat5?", " + echipa.salariat5.nume:""}`} 
                        primaryTypographyProps={{fontWeight: 'bold',fontSize:'18px !important', color:'white'}} 
                        secondaryTypographyProps={{fontSize:'14px !important',fontStyle: 'italic', color:'white'}} 
                    />
                </ListItemButton>
            </Link>  
        </div>
    );
}

export default PostComenzi;
