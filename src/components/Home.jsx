import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import { Link } from "react-router-dom";
import { Flex, Heading, Button, Text, Card, useTheme, Grid } from "@aws-amplify/ui-react";

const DummyCard = ({ title, url }) => {
  return (
    <Card variation="elevated">
      <Flex
        direction={{ base: "column", large: "row" }}
        // maxWidth="22rem"
        padding="1rem"
        width="100%"
      >
        <Flex justifyContent="space-between" direction="column">
          <Heading level={3}>{title}</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
            sed cras ornare arcu dui. Duis aute irure dolor in reprehenderit in
            voluptate velit esse.
          </Text>
          <Button variation="primary" onClick={() => (location.href = url)}>
            Visit Project
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

const Home = () => {
  const { tokens } = useTheme();
  return (
    <>
      <Flex justifyContent="center">
        <img
          src={viteLogo}
          className="logo"
          alt="Vite logo"
          style={{ display: "inline" }}
        />
        <Heading level={1} >Dashboard</Heading>
      </Flex>
      <Grid
        templateColumns={{ base: '1fr', large: '1fr 1fr 1fr' }}
        gap={tokens.space.small}
      >
        <DummyCard title="Ammplify Filter Feeds" url="/amplify-filter-feeds" />
        <DummyCard title="One" url="/one" />
        <DummyCard title="Two" url="/two" />
        <DummyCard title="Three" url="/three" />
        <DummyCard title="Five" url="/five" />
        <DummyCard title="Six" url="/six" />
        <DummyCard title="Seven" url="/seven" />
        <DummyCard title="Eight" url="/eight" />
      </Grid>
    </>
  );
};

export default Home;
