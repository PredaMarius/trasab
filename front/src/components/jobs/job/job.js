import React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StreamIcon from '@mui/icons-material/Stream';
import { colors } from '../../../constants/colors';
import '../style.css';


export const Post=({ post, index, sectie, currentUser }) =>{
    
    return(
        <div  key={ post.id } className="card o-hidden widget-cards"  sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] }}}>
            <Link
                to={{ pathname:`${process.env.PUBLIC_URL}/echipe/${post.id}`, state:{ post:post, currentUser:currentUser} }}
                key={ post.id }
            >
                <ListItemButton sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] } }}  >
                    <ListItemIcon >
                        <StreamIcon/>
                    </ListItemIcon>
                    <ListItemText  primary={post.denumire} primaryTypographyProps={{ fontWeight: 'bold', color:'white' }} />
                </ListItemButton>
            </Link>  
        </div>
    );
}

export default Post;
