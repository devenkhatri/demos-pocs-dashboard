import * as React from "react"
import Box from '@mui/material/Box';
import {Link as MuiLink} from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import kebabCase from "lodash/kebabCase"
import { Link } from "gatsby"
import { createTheme, ThemeProvider } from '@mui/material/styles';
const CardDetail = ({ title, desc, detailUrl, demoUrl, postImage, tags, services, date }) => {
  const theme2 = createTheme();
  theme2.typography.h5 = {
    fontSize: '1rem',
    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
    [theme2.breakpoints.up('md')]: {
      fontSize: '1.3rem',
    },
  };
  let featuredImg = getImage(postImage)
  return (
    <Card>
      <GatsbyImage image={featuredImg} alt={title} style={{width:"100%", height: "200px", objectFit: "cover"}} />
      <CardContent>
        <ThemeProvider theme={theme2}>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={detailUrl} >{title}</Link>
          </Typography>
        </ThemeProvider>
        <Typography variant="overline" display="block" gutterBottom>
           {date}
        </Typography>
        <Box sx={{ flexDirection: 'row'}} >
        {tags && tags.map((tag) => {
          return(
           <Link key={tag} to={`/tags/${kebabCase(tag)}/`}>
              <Chip label={tag} color="primary" size="small" sx = {{mr :0.5, mb:0.5 }} />
            </Link>
            )
        })}
        {services && services.map((service) => {
          return(
          <Link key={service} to={`/services/${kebabCase(service)}/`}>
            <Chip label={service} color="secondary" size="small" sx = {{mr :0.5, mb:0.5 }} />
           </Link> 
            )
        })}
        </Box>
        <Typography variant="body2" color="text.secondary" style={{textAlign: "justify"}}>
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', float: 'right' }}>
        {demoUrl?
          <MuiLink
            href={demoUrl}
            target="_blank"
            underline="none"
            variant="body2"
          >
            View Demo
          </MuiLink>
        : null}
      </CardActions>
    </Card>
  );
}

export default CardDetail
