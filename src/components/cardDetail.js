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
import { Link, graphql } from "gatsby"
const CardDetail = ({ title, desc, detailUrl, demoUrl, postImage, tags, services, date }) => {
  let featuredImg = getImage(postImage)
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/*postImage && <CardMedia
        component="img"
        alt="green iguana"
        image={postImage}
        
      />*/}
      <GatsbyImage image={featuredImg} style={{width:"100%", height: "200px", objectFit: "cover"}} />
      <CardContent>
        
        <Typography as="a" href={detailUrl} gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
           {date}
        </Typography>
        
        <Box sx={{ flexDirection: 'row'}} >
        {tags && tags.map((tag) => {
          return(
           <Link to={`/tags/${kebabCase(tag)}/`}>
              <Chip label={tag} color="primary" size="small" sx = {{mr :0.5, mb:0.5 }} />
            </Link>
            )
        })}
        {services && services.map((service) => {
          return(
            <Chip label={service} color="secondary" size="small" sx = {{mr :0.5, mb:0.5 }} />
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
        {/* <MuiLink
          href={detailUrl}
          underline="none"
          variant="body2"
        >
          View Detail
        </MuiLink>
        */}
      </CardActions>
    </Card>
  );
}

export default CardDetail
