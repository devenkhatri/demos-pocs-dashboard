import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import { Link } from "react-router-dom";
import { dataList } from './../assets/dummy.js';
import { Collection, Image, Divider, View, Badge, Flex, Heading, Button, Text, Card, useTheme, Grid } from "@aws-amplify/ui-react";
import ProjectList from "./ProjectList.jsx";


const Home = () => {
  const { tokens } = useTheme();
  return (
     <ProjectList />
  );
};

export default Home;
