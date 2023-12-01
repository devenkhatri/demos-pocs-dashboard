import {
  Flex,
  Heading,
  Button,
  Text,
  Card,
  Grid,
  Divider,
  Badge,
  View,
  Image,
  Loader
} from "@aws-amplify/ui-react";
import { dataList } from "../assets/dummy";
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    fetchProject()

  }, []);

  const client = generateClient();
  const fetchProject = async () => {
    // Fetch a single record by its identifier
    setIsLoading(true)
    const project = await client.graphql({
      query: queries.getProjects,
      variables: { id: id }
    });
    setProjectData(project.data.getProjects)
    setIsLoading(false);
  }


  return (
    <>
      {isLoading ?
        <Flex  direction="column" alignItems="center">
          <Loader size="large"  width="5rem" height="5rem"/>
        </Flex>
        :
        <Flex justifyContent="center">

          <Card
            variation="elevated"
            paddingLeft={{ base: "1rem", large: "2.5rem" }}
            paddingRight={{ base: "1rem", large: "2.5rem" }}
          >
            <Flex
              direction="column"
              alignContent="flex-start"
              justifyContent="flex-start"
            >
              <Heading level={3} alignSelf={"flex-start"}>
                {projectData.title}
              </Heading>
              <Flex>
                {projectData.tags?.map((tag, i) => {
                  return (
                    <Badge
                      variation="success"
                      size={{ base: "small", large: "large" }}
                      key={i}
                    >
                      {tag}
                    </Badge>
                  );
                })}

              </Flex>
              <Divider />
              <Text textAlign={"left"}>{projectData.description}</Text>
              <Heading level={5} alignSelf={"flex-start"} marginTop={"20px"}>
                Services Tags
              </Heading>
              <Divider border="2px solid #e94184" width={"50px"} />
              <Grid
                templateColumns={{ base: "1fr 1fr", large: "1fr 1fr 1fr 1fr 1fr" }}
                columnGap="0.5rem"
                rowGap="1rem"
              >
                {projectData.services_used?.map((service, i) => {
                  return (
                    <View
                      as="div"
                      boxShadow="0px 0px 10px 2px #f2f2f2"
                      height="35px"
                      width="170px"
                      lineHeight={"36px"}
                      key={i}
                    >
                      {service}
                    </View>
                  );
                })}

              </Grid>
              <Heading level={5} alignSelf={"flex-start"} marginTop={"20px"}>
                Problem Statement
              </Heading>
              <Divider border="2px solid #e94184" width={"50px"} />
              <Text textAlign={"left"}>{projectData.problem_statement}</Text>
              <Heading level={5} alignSelf={"flex-start"} marginTop={"20px"}>
                Solution
              </Heading>
              <Divider border="2px solid #e94184" width={"50px"} />

              <Grid
                templateColumns={{ base: "1fr", large: "1fr 1fr" }}
                columnGap="5rem"
                rowGap="1rem"
                alignItems={"center"}
              >
                <Image
                  src={projectData?.solution_diagram}
                  alt="Solution diagram image."
                />
                <Text textAlign={"left"}>{projectData.solution}</Text>
              </Grid>
              <Button
                marginTop={"20px"}
                variation="primary"
                isDisabled={projectData.demourl ? false : true}
                onClick={() => (location.href = projectData.demourl)}
              >
                Visit Project
              </Button>
            </Flex>
          </Card>
        </Flex>
      }
    </>

  );

};

export default ProjectDetails;
