import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import { Link } from "react-router-dom";
import { dataList } from './../assets/dummy.js';
import { Collection, Image, Divider, View, Badge, Flex, Heading, Button, Text, Card, useTheme, Grid } from "@aws-amplify/ui-react";
import ProjectList from "./ProjectList.jsx";

export const DummyCard = ({ index, title, url, description, services, tags, id, updtedDate }) => {
  return (
    <Card
      key={index}
      borderRadius="medium"
      width="100%"
      variation="elevated"
    >
      <Flex
        direction={{ base: "column", large: "row" }}
        padding="0.5rem"
        width="100%"
        height="100%"
      >
        <Flex justifyContent="space-around" direction="column" width="100%">
          <Heading style={{"wordBreak": "break-word"}} level={3}>{title}</Heading>
          <Flex justifyContent="center">
            {tags.map((badge) =>
              <Badge
                size="small"
                variation="info">
                {badge}
              </Badge>
            )}
          </Flex>
          <Text>
            {description}
          </Text>
          <Text>
            {updtedDate}
          </Text>
          <Button variation="primary" style={{"marginTop": "auto"}} onClick={() => (location.href = "project-details/"+id)}>
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
      {/* <Flex justifyContent="center">
        <img
          src={viteLogo}
          className="logo"
          alt="Vite logo"
          style={{ display: "inline" }}
        />
        <Heading level={1} >Dashboard</Heading>
      </Flex>
      <Collection
        items={dataList}
        type="grid"
        templateColumns="1fr 1fr 1fr"
        direction="row"
        gap="20px"
        wrap="nowrap"
        width={"100%"}
        marginTop={"2rem"}
        isSearchable
        searchPlaceholder="Type to search..."
        searchFilter={(listItem, keyword) =>
          listItem?.title?.toLowerCase().includes(keyword.toLowerCase())  ||
          listItem?.description?.toLowerCase().includes(keyword.toLowerCase()) || 
          listItem?.tags?.toString().toLowerCase().includes(keyword.toLowerCase()) || 
          listItem?.services_used?.toString().toLowerCase().includes(keyword.toLowerCase())||
          listItem?.demourl?.toLowerCase().includes(keyword.toLowerCase())
        }
      >
        {(item, index) => (
          <DummyCard  key={item.id} index={index} title={item.title} services={item.services_used} tags={item.tags} url={item.demourl} description={item.description} id={item.id}/>
        )}
      </Collection> */}
      <ProjectList />
    </>
  );
};

export default Home;
