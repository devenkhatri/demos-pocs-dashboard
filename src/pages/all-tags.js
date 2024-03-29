import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
// Utilities
import kebabCase from "lodash/kebabCase"
import {Chip,Container,Box,Typography} from '@mui/material';

// Components
import { Link, graphql } from "gatsby"

const TagsPage = ({
  data,
  location
}) =>{

    const siteTitle = data.site.siteMetadata.title;
    const group = data.allMarkdownRemark.group;
 return(
    <Layout location={location} title={siteTitle}>
    <Container>
        <Box
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          className="main_border_box"
        >
         <Typography as="h5" gutterBottom variant="h5" component="h5"  sx = {{mt :0}}>
           Tags
         </Typography>
            {group.map(tag => {
              return(
               <Link key={tag.fieldValue} to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  <Chip label={tag.fieldValue} color="primary"  sx = {{mr :1, mb:1}} />
                </Link>
                )
            })}
        </Box>    
    </Container>
     </Layout >  
)
}
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT }}) {
        fieldValue
        totalCount
      }
    }
  }
`