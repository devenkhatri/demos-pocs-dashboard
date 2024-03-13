import * as React from "react"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Link as MuiLink} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import CardDetail from "./cardDetail"

const DemoList = ({posts}) =>{
  console.log(posts)
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

  const [searchFilter,setSearchFilter] = useState(posts);
  
  useEffect(()=>{
    setSearchFilter(posts)
  },[])
  
  const setSearchField = (e) =>{
      const keyword = e.target.value || ""
      if (keyword) {
        const filterPosts = posts.filter((listItem) =>{
          return listItem?.frontmatter?.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.description?.toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.demolink.toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.tags.toString().toLowerCase().includes(keyword.toLowerCase())
        })
        setSearchFilter(filterPosts);
        console.log(filterPosts)
      } else {
        setSearchFilter(posts)
      }
  }

    return(
        <Container>
        <Box
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
        <Typography sx = {{mt :'10px'}} className="custom_total">Total: {searchFilter?.length}</Typography>
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
        </Box>
        {searchFilter?.length ?
        <Box my={4} sx={{ flexGrow: 2 }}>
          <Grid container spacing={2}>
            {searchFilter?.map(post => {
              return (
                <Grid item xs={4}>
                  <CardDetail postImage={post.frontmatter?.postImage?.childImageSharp?.gatsbyImageData || "" || post?.node?.frontmatter?.postImage?.childImageSharp?.gatsbyImageData} demoUrl={post.frontmatter?.demolink || "" || post?.node?.frontmatter?.demolink} detailUrl={post?.node?.fields?.slug} title={post.frontmatter?.title || post.fields?.slug || post?.node?.frontmatter?.title } desc={post.frontmatter?.description || post?.excerpt || post?.node?.frontmatter?.description} tags={post.frontmatter?.tags || post?.node?.frontmatter?.tags} services={post.frontmatter?.services} date={post.frontmatter?.date || post?.node?.frontmatter?.date} />
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
    )
}

export default DemoList
