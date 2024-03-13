import React from "react"
import PropTypes from "prop-types"
import DemoList from "../components/demoList"
import Layout from "../components/layout"
import {  graphql } from "gatsby"
import {Container,Box,Typography} from '@mui/material';
const Services = ({ pageContext, data, location }) => {
  const { service } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges;
  const siteTitle = data.allMarkdownRemark.edges.node?.frontmatter?.title
   console.log(">>>tags posts", posts)
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with Service: "${service}"`

  return (
    
         <Layout location={location} title={siteTitle}>
          <Container>
           <Box
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
           >
            
             <Typography as="h5" gutterBottom variant="h5" component="h5"  sx = {{mt :0, textAlign:"center"}}>
               {tagHeader}
             </Typography>
           <DemoList posts={posts} />
         </Box>
         </Container>
       </Layout> 
  )
}

Services.propTypes = {
  pageContext: PropTypes.shape({
    service: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Services

export const pageQuery = graphql`
  query($service: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC }}
      filter: { frontmatter: { services: { in: [$service] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              demolink
              isDisable
              postImage {
                childImageSharp {
                   gatsbyImageData(placeholder: DOMINANT_COLOR)
                }
              }
              tags
              services
          }
        }
      }
    }
  }`