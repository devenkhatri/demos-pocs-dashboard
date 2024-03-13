import React from "react";
import CardList from "../components/cardList";
import Layout from "../components/layout";
// Components
import { graphql } from "gatsby";

import { Container, Box, Typography } from "@mui/material";

const Tags = ({ pageContext, data, location }) => {
  console.log(">>>tags data", data);
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const siteTitle = data.allMarkdownRemark.nodes?.frontmatter?.title;
  console.log(">>>tags posts", posts);
  const tagHeader = `${totalCount} projects${
    totalCount === 1 ? "" : "s"
  } tagged with tag: "${tag}"`;

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <Container>
          <Box
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography
              as="h5"
              gutterBottom
              variant="h5"
              component="h5"
              sx={{ mt: 0, textAlign: "center" }}
            >
              {tagHeader}
            </Typography>
            <CardList posts={posts} />
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
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
`;
