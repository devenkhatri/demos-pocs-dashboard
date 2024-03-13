import React from "react";
import CardList from "../components/cardList";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { Container, Box, Typography } from "@mui/material";
const Services = ({ pageContext, data, location }) => {
  const { service } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const siteTitle = data.allMarkdownRemark.nodes?.frontmatter?.title;
  console.log(">>>tags posts", posts);
  const tagHeader = `${totalCount} projects${
    totalCount === 1 ? "" : "s"
  } tagged with Service: "${service}"`;

  return (
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
  );
};

export default Services;

export const pageQuery = graphql`
  query ($service: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { services: { in: [$service] } } }
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
