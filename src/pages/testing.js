import * as React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Link as MuiLink} from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import DemoList from "../components/demoList"

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
            <Chip label={tag} color="primary" size="small" sx = {{mr :0.5, mb:0.5 }} />
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

const TestIndex = ({ data, location }) => {
  console.log("****** data",data)
  const siteTitle = data?.site?.siteMetadata?.title || `Title`
  const posts = data?.allMarkdownRemark?.nodes || [];
 
  return (
    <>
    {/*
    <Layout location={location} title={siteTitle}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <div>
                  <a href={post.frontmatter.demolink} target="_blank">Demo Link</a>
                </div>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
    */}
    {/*  posts.length ?
      <DemoList posts={posts}/>
    : <Layout location={location} title={siteTitle}>
        <Typography variant="body2" style={{display:"flex", justifyContent:"center", paddingTop : '10rem'}}>
          <Bio />
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
        </Typography>
      </Layout>
    */}
     {posts.length ?
      <Layout location={location} title={siteTitle}>
         <DemoList posts={posts} />
       </Layout> 
     :
      <Layout location={location} title={siteTitle}>
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

export default TestIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Dashboard" />

export const testPageQuery = graphql`
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
