import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ComponentaEchipa from './componentaechipa';
import {colors} from '../../../constants/colors';
import '../style.css';


export const Echipa=({ echipa, index, currentUser }) =>{

    const [open, setOpen] = React.useState(false);

    const handleClick = (e) => {
        setOpen(!open);
      };
    
    return(
        <div  key={echipa.id} className="card o-hidden widget-cards" >
            <ListItemButton  sx={{ width: '100%', backgroundColor: colors[index],'&:hover, &:focus': {backgroundColor: colors[index] }, }} onClick={handleClick} >
                <ListItemIcon >
                    <PeopleOutlineIcon/>
                </ListItemIcon>
                <ListItemText  primary={echipa.denumire} primaryTypographyProps={{fontWeight: 'bold', color:'white'}} />
                {open ? <ExpandLess  /> : <ExpandMore  />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ backgroundColor: colors[index] }}>
                <List component="div" disablePadding >
                    <ListItemButton sx={{ pl: 4}}>
                        <ComponentaEchipa 
                            echipa={echipa} 
                            currentUser={currentUser}                            
                        />
                    </ListItemButton>
                </List>
            </Collapse>
        </div>
    );
}

export default Echipa;
