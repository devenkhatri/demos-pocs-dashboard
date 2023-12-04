import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import React, { useEffect } from 'react';
import { DummyCard } from './Home';
import _ from "lodash";
import { Collection,Loader, Image, Divider, View, Badge, Flex, Heading, Button, Text, Card, useTheme, Grid } from "@aws-amplify/ui-react";

const ProjectList = () => {
  const client = generateClient();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getAllProjects = async () => {
    const allProjects = await client.graphql({
      query: queries.listProjects,
      variables: {
        filter: {
          isdisabled: {
            ne: true
          }
        }
      }
    });
    console.log("******** allProjects....", allProjects);
    setLoading(false)
    if (allProjects?.data?.listProjects?.items) {
      const filteredData = _.orderBy(allProjects.data.listProjects.items, ['updatedAt'], ['desc']);
      console.log("filteredData >", filteredData)
      setData(filteredData);
    }
  }


  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <React.Fragment>
      {/* <Flex justifyContent="center">
        <Heading level={1}>Projects List</Heading>
      </Flex> */}
      <Collection
        items={data}
        type="grid"
        templateColumns="1fr 1fr 1fr"
        direction="row"
        gap="20px"
        wrap="nowrap"
        width={"100%"}
        marginTop={"2rem"}
        isSearchable
        isPaginated
        searchNoResultsFound={
          !loading? 
            <Flex justifyContent="center">
              <Text color="purple.80" fontSize="1rem">
                Nothing found, please try again
              </Text>
            </Flex>
            : <Flex justifyContent="center">
              <Flex  direction="column" alignItems="center">
                  <Loader size="large"  width="5rem" height="5rem"/>
              </Flex>
          </Flex>
        }
        itemsPerPage={15}
        searchPlaceholder="Type to search..."
        searchFilter={(listItem, keyword) =>
          listItem?.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.description?.toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.tags?.toString().toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.services_used?.toString().toLowerCase().includes(keyword.toLowerCase()) ||
          listItem?.demourl?.toLowerCase().includes(keyword.toLowerCase())
        }
      >
        {(item, index) => (
          <DummyCard key={item.id} index={index} title={item.title} services={item.services_used} tags={item.tags} url={item.demourl} description={item.description} id={item.id} updtedDate={item.updatedAt}/>
        )}
      </Collection>
    </React.Fragment>
  );
}

export default ProjectList;