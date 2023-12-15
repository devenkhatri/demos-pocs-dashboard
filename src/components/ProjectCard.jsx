import { Link } from "react-router-dom";
import { dataList } from './../assets/dummy.js';
import { Badge, Flex, Heading, Button, Text, Card, View, Divider } from "@aws-amplify/ui-react";
import { FaArrowRight } from "react-icons/fa";
import _ from "lodash";
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export const ProjectCard = ({ index, title, url, description, services, tags, id, updatedDate }) => {
  //var date = updtedDate
  // searchItems.push(title);
  const navigate = useNavigate();
  const [redirectToEdit, setRedirectToEdit] = useState("");
  const [redirectToDemo, setRedirectToDemo] = useState("");
  
  useEffect(() => {
     if (redirectToEdit){
        return navigate("/project-details/"+redirectToEdit);
     }
  },[redirectToEdit]); 
  
  useEffect(() => {
     if (redirectToDemo){
        return navigate(url);
     }
  },[redirectToDemo]); 
 
 
  return (
    <Card
      key={index}
      width="100%"
      variation="elevated"
    >
      <Flex
        direction={{ base: "column", large: "row" }}
        padding="0.5rem"
        width="100%"
        height="100%"
        className="custom_main_card_div"
      >
        <Flex justifyContent="space-around" direction="column" width="100%">
          <View className="custom_main_grid_div">
            <Heading style={{"wordBreak": "break-word" , "text-align" : "left"}} level={5} >{title}</Heading>
            <Text  style={{"text-align" : "left"}} className="custom_date">
              {new Date(updatedDate).toLocaleDateString()}
            </Text>
            {tags?.length > 0 && tags[0] !== "" ?
              <Flex marginBottom="10px">
                {tags.map((badge) =>
                  <Badge
                    size="small"
                    variation="info">
                    {badge}
                  </Badge>
                )}
              </Flex>
            : null}
            <Divider border="2px solid #e94184" width={"50px"} marginBottom="10px" />
            <Text style={{"text-align" : "left"}}>
              <Markdown remarkPlugins={[remarkGfm]}>
                {_.truncate( 
                  description, { 
                     'length': 140, 
                     'omission': '...'
                   }
                  )
                }
              </Markdown>
            </Text>
          </View>
          <Flex>
          {url &&
            <Button  className="custom_visti_project_btn"  onClick={() => setRedirectToDemo(id)}>
                Visit Demo &nbsp; <FaArrowRight />
            </Button>
          }
           <Button className="custom_visti_project_btn" variation="link" onClick={() => setRedirectToEdit(id)}>
               Visit Project &nbsp; <FaArrowRight />
          </Button>
          </Flex>
          
        </Flex>
      </Flex>
    </Card>
  );
};

