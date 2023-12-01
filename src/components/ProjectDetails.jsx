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
  } from "@aws-amplify/ui-react";
  import { dataList } from "../assets/dummy";
  
  import { useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  const ProjectDetails = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState([]);
    const [demoUrl, setUrl] = useState("");
    useEffect(() => {
      dataList.map((data) => {
        if (data.id == id) {
          setProjectData(data);
          setUrl(projectData.demourl);
        }
      });
    }, [projectData]);
  
    return (
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
              onClick={() => (location.href = demoUrl)}
            >
              Visit Project
            </Button>
          </Flex>
        </Card>
      </Flex>
    );
  };
  
  export default ProjectDetails;
  