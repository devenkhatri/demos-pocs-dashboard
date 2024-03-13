import * as React from "react"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {useState} from "react";
import CardDetail from "../pages/index.js";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Link as MuiLink} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';


const Test = ({posts}) =>{
   // const [searchFilter,setSearchFilter] = useState(posts);
    
    return(
        <Container>
        
          <Typography variant="body2" style={{display:"flex", justifyContent:"center", paddingTop : '10rem'}}>
            No Result Found
          </Typography>
        
      </Container>
        )
}

export default Test