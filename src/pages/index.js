import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Link as MuiLink} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {useState} from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const CardDetail = ({ title, desc, detailUrl, demoUrl, postImage, tags }) => {
  let featuredImg = getImage(postImage)

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/*postImage && <CardMedia
        component="img"
        alt="green iguana"
        image={postImage}
        
      />*/}
      <GatsbyImage image={featuredImg} />
      <CardContent>
        <Typography as="a" variant="body2" href={detailUrl} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
        {tags && tags.map((tag) => {
          <Chip label={tag} color="primary" variant="outlined" />
        })}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          <p style={{marginBottom : 0}}>{desc}</p>
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  float:'right',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes;
  
  const [searchFilter,setSearchFilter] = useState(posts);
  const setSearchField = (e) =>{
      const keyword = e?.target?.value || ""
      if (keyword) {
        const filterPosts = posts.filter((listItem) =>{
          return listItem?.frontmatter?.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.description?.toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.demolink.toLowerCase().includes(keyword.toLowerCase())
        })
        setSearchFilter(filterPosts);
        console.log(filterPosts)
        
      } else {
        setSearchFilter(posts)
      }
  }

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
    {posts.length ?
      <Layout location={location} title={siteTitle}>
      <Container>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e)=>setSearchField(e)}
          />
        </Search>
        {searchFilter?.length ?
        <Box my={4} sx={{ flexGrow: 2 }}>
          <Grid container spacing={2}>
            {searchFilter?.map(post => {
              return (
                <Grid item xs={4}>
                  <CardDetail postImage={post.frontmatter?.postImage?.childImageSharp?.gatsbyImageData || ""} demoUrl={post.frontmatter.demolink || ""} detailUrl={post.fields.slug} title={post.frontmatter.title || post.fields.slug} desc={post.frontmatter.description || post.excerpt}/>
                </Grid>
              )})
            }
          </Grid>
        </Box>
        : 
          <Typography variant="body2" style={{display:"flex", justifyContent:"center", paddingTop : '10rem'}}>
            No Result Found
          </Typography>
        }
      </Container>
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
        }
      }
    }
  }
`
