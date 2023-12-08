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
import { useNavigate } from "react-router-dom";
const ProjectDetails = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [redirectToEdit, setRedirect] = useState("");
  const client = generateClient();
 
  useEffect(() => {
    fetchProject()
  }, []);
  useEffect(() => {
     if (redirectToEdit){
        return navigate(redirectToEdit);
     }
  },[redirectToEdit]); 
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
  console.log('asd >', projectData?.services_used, projectData?.tags)

  return (
    <>
      {isLoading ?
        <Flex  direction="column" alignItems="center" className="cus_loader">
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
                {projectData?.title || ""}
              </Heading>
              {projectData?.tags?.length && projectData?.tags[0] != "" ?
                <Flex>
                  {projectData?.tags?.map((tag, i) => {
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
              : null}
              <Divider />
              <Text textAlign={"left"}>{projectData?.description}</Text>
              {projectData?.services_used?.length > 0 && projectData?.services_used[0] !== "" ?
              <>
                <Heading level={5} alignSelf={"flex-start"} marginTop={"20px"}>
                  Services Tags
                </Heading>
                <Divider border="2px solid #e94184" width={"50px"} />
                <Grid
                  templateColumns={{ base: "1fr 1fr", large: "1fr 1fr 1fr 1fr 1fr" }}
                  columnGap="0.5rem"
                  rowGap="1rem"
                >
                  {projectData?.services_used?.map((service, i) => {
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
              </>
              : null}
              {projectData?.problem_statement?.length ?
              <>
                <Heading level={5} alignSelf={"flex-start"} marginTop={"20px"}>
                  Problem Statement
                </Heading>
                <Divider border="2px solid #e94184" width={"50px"} />
                <Text textAlign={"left"}>{projectData?.problem_statement}</Text>
              </>
              : null}
              {projectData?.solution || projectData?.solution_diagram ?
              <>
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
                  {projectData?.solution_diagram ?
                    <Image
                      src={projectData?.solution_diagram}
                      alt="Solution diagram image."
                    />
                  : null}
                  <Text textAlign={"left"}>{projectData?.solution || ""}</Text>
                </Grid>
              </>
              : null}
              <Button
                marginTop={"20px"}
                variation="primary"
                isDisabled={projectData?.demourl ? false : true}
                onClick={() =>  setRedirect(projectData?.demourl)}
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
