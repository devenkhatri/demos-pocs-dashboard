import { Link } from "react-router-dom";
import { dataList } from './../assets/dummy.js';
import { Badge, Flex, Heading, Button, Text, Card, View, Divider } from "@aws-amplify/ui-react";
import { FaArrowRight } from "react-icons/fa";


export const ProjectCard = ({ index, title, url, description, services, tags, id, updtedDate, searchItems }) => {
  //var date = updtedDate
  searchItems.push(index);
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
              {updtedDate.split("T")[0] }
            </Text>
            <Flex marginBottom="10px">
              {tags.map((badge) =>
                <Badge
                  size="small"
                  variation="info">
                  {badge}
                </Badge>
              )}
            </Flex>
            <Divider border="2px solid #e94184" width={"50px"} marginBottom="10px" />
            <Text style={{"text-align" : "left"}}>
              {description}
            </Text>
          </View>
          <Button className="custom_visti_project_btn" variation="link" onClick={() => (location.href = "project-details/"+id)}>
            Visit Project &nbsp; <FaArrowRight />
          </Button>
          
        </Flex>
      </Flex>
    </Card>
  );
};

