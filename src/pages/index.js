import * as React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Typography from '@mui/material/Typography';
import DemoList from "../components/demoList"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes;
  return (
    <>
    {posts.length ?
      <Layout location={location} title={siteTitle}>
        <DemoList posts = {posts} />
      </Layout>
    : <Layout location={location} title={siteTitle}>
        <Typography variant="body2" style={{display:"flex", justifyContent:"center", paddingTop : '10rem'}}>
          <Bio />
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
        </Typography>
     
     
      </Layout>
    }
    
    </>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Dashboard" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } },  filter: {frontmatter: { isDisable : {eq: false}}}) {
      nodes {
        excerpt
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
`
