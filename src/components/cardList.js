import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import CardDetail from "./cardDetail";
import InputAdornment from "@mui/material/InputAdornment";

const CardList = ({ posts }) => {
  const [searchFilter, setSearchFilter] = useState(posts);
  const [searchValue, setsearchValue] = useState("");
  const setSearchField = (keyword) => {
    if (keyword) {
      setsearchValue(keyword);
      // console.log("keyword", keyword);
      // console.log("posts", posts);
      const filterPosts = posts.filter((listItem) => {
        return (
          listItem?.frontmatter?.title
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.description
            ?.toLowerCase()
            .includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.demolink
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.tags
            .toString()
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          listItem?.frontmatter?.tags.filter((item) =>
            item.toLowerCase().includes(keyword.toLowerCase())
          ).length > 0 ||
          listItem?.frontmatter?.services.filter((item) =>
            item.toLowerCase().includes(keyword.toLowerCase())
          ).length > 0
        );
      });
      setSearchFilter(filterPosts);
      // console.log(searchFilter);
    } else {
      setSearchFilter(posts);
      setsearchValue("");
    }
  };

  return (
    <Container>
      <Box
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        my={4}
        sx={{ flexGrow: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3} md={6}>
            <Typography sx={{ mt: "10px" }} className="custom_total">
              <strong>Total: </strong>
              {searchFilter?.length}
            </Typography>
          </Grid>
          <Grid item xs={9} md={6}>
            <TextField
              style={{ float: "right" }}
              value={searchValue}
              size="small"
              onChange={(e) => setSearchField(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      {searchFilter?.length ? (
        <Box my={4} sx={{ flexGrow: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {searchFilter?.map((post, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <CardDetail
                    postImage={
                      post.frontmatter?.postImage?.childImageSharp
                        ?.gatsbyImageData ||
                      "" ||
                      post?.node?.frontmatter?.postImage?.childImageSharp
                        ?.gatsbyImageData
                    }
                    demoUrl={
                      post.frontmatter?.demolink ||
                      "" ||
                      post?.node?.frontmatter?.demolink
                    }
                    detailUrl={post?.node?.fields?.slug || post?.fields?.slug}
                    title={
                      post.frontmatter?.title ||
                      post.fields?.slug ||
                      post?.node?.frontmatter?.title
                    }
                    desc={
                      post.frontmatter?.description ||
                      post?.excerpt ||
                      post?.node?.frontmatter?.description
                    }
                    tags={
                      post.frontmatter?.tags || post?.node?.frontmatter?.tags
                    }
                    services={
                      post.frontmatter?.services ||
                      post?.node?.frontmatter?.services
                    }
                    date={
                      post.frontmatter?.date || post?.node?.frontmatter?.date
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Typography
          variant="body2"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10rem",
          }}
        >
          No Result Found
        </Typography>
      )}
    </Container>
  );
};

export default CardList;
