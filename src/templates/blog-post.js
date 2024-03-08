import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import {
  CardContent,
  Typography,
  Button,
  Card,
  Grid,
  Divider,
  Badge,
  Box,
  Container
} from '@mui/material';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  let featuredImg = getImage(post.frontmatter?.postImage?.childImageSharp?.gatsbyImageData)
  return (
    <>
      <Layout location={location} title={siteTitle}>
      <Container maxWidth="lg">
        <Card>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {post.frontmatter.title}
          </Typography>
          <Typography style={{ justifyContent : 'center', display : 'flex', marginBottom : '2rem'}}>
            <GatsbyImage image={featuredImg} />
          </Typography>
          {post.frontmatter.demolink ?
            <section style={{ paddingLeft : '1rem', paddingRight: '1rem'}}>
              <a href={post.frontmatter.demolink} target="_blank">Demo Link</a>
            </section>
          : null}
          <Typography variant="body2" color="text.secondary">
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
              style={{ paddingLeft : '1rem', paddingRight: '1rem'}}
            />
          </Typography>
          <hr />
          <footer>
            <Bio />
          </footer>
          <nav className="blog-post-nav">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </CardContent>
        </Card>
        </Container>
      </Layout>
    
    {/* <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <div>
            <a href={post.frontmatter.demolink} target="_blank">Demo Link</a>
          </div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
    */}
    </>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        demolink
        postImage {
          childImageSharp {
            gatsbyImageData(placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
