
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../../graphql/queries';
import React, { useEffect } from 'react';
import { ProjectCard } from '../ProjectCard';
import _ from "lodash";
import { Collection,Loader, Button, Table, TableCell,  TableBody,  TableHead,  TableRow, SwitchField} from "@aws-amplify/ui-react";
import { FaPencilAlt } from "react-icons/fa";

const AdminProjectList = ({  user }) => {

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
       
        setData(allProjects.data.listProjects.items);
         console.log("filteredData >", data)
      }
    }
  
//   const setDisabled =async  (_id,val) => {await client.graphql({
//   query: updateProjects,
//   variables: {
//     input: {
//       id: _id,
//       isdisabled: val
//     }
//   }
// })}
  
    useEffect(() => {
      getAllProjects();
    }, []);
  

  return (
   
  
    <Table
    style ={{"max-width": "50rem", "margin": "0 auto"}}
    >
      <TableHead>
        <TableRow>
          <TableCell as="th">Title</TableCell>
          <TableCell as="th">Enable</TableCell>
          <TableCell as="th">Action</TableCell>
        </TableRow>
      </TableHead>
    <TableBody>
   
       {
         data.map(item=>{
         return(
             <TableRow>
          <TableCell>{item.title}</TableCell>
          <TableCell><SwitchField  /></TableCell>
          <TableCell> <Button variation="link" style={{"border":"none"}} >
                   <FaPencilAlt />
                </Button></TableCell>
        </TableRow>
         )})
       }
       </TableBody>
  </Table>

  );
};

export default AdminProjectList;
