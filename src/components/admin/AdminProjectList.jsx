
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../../graphql/queries';
import React, { useEffect,useState } from 'react';
import { ProjectCard } from '../ProjectCard';
import _ from "lodash";
import { Collection, Loader, Flex, Button, Table, TableCell,  TableBody,  TableHead,  TableRow, SwitchField} from "@aws-amplify/ui-react";
import { FaPencilAlt } from "react-icons/fa";
import { updateProjects } from '../../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const AdminProjectList = ({  user }) => {
    const navigate = useNavigate();
    const client = generateClient();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [editingItems, setEditingItems] = React.useState([]);
    const [redirectToEdit, setRedirect] = useState(false);
    const [redirectId,setRedirectId ] = useState();
   
     useEffect(() => {
      getAllProjects();
    }, []);
    
    useEffect(() => {
       if (redirectToEdit){
          return navigate("/rxc345-edit/"+redirectId);
       }
    },[redirectToEdit]);
  
    const getAllProjects = async () => {
      const allProjects = await client.graphql({
        query: queries.listProjects,
      });
      setLoading(false)
      if (allProjects?.data?.listProjects?.items) {
        const filteredData = _.orderBy(allProjects.data.listProjects.items, ['updatedAt'], ['desc']);
        setData(allProjects.data.listProjects.items);
      }
    }
    const editeNavigate = (id) => {
        setRedirectId(id)
        setRedirect(true)
    }
    
    const disableProcess = (disableprojectId, disableSwitch) => {
      let disabledItemsList = [...editingItems]
      if (disableprojectId && !disabledItemsList.includes(disableprojectId)) {
        disabledItemsList = [...disabledItemsList, disableprojectId]
        setEditingItems(disabledItemsList)
      }
      const updateProjectStatus = () => {
        if(disableprojectId && disableSwitch != null){
          client.graphql({
            query: updateProjects,
            variables: {
              input: {
                id: disableprojectId,
                isdisabled: !disableSwitch
              }
            }
          })
          .then(() => {
            toast(`🦄 Project Successfully ${disableSwitch ? "Enabled." : "Disabled."}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                // draggable: true,
                progress: undefined,
                theme: "light",
            });
            const editingItemIndex = disabledItemsList.indexOf(disableprojectId);
            if (editingItemIndex > -1) {
              const listeOfItems = [...disabledItemsList]
              listeOfItems.splice(editingItemIndex, 1);
              setEditingItems(listeOfItems)
            }
            getAllProjects();
          })
          .catch(() => {
            toast.error('Something Went Wrong!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                // draggable: true,
                progress: undefined,
                theme: "light",
            });
            const editingItemIndex = disabledItemsList.indexOf(disableprojectId);
            if (editingItemIndex > -1) {
              const listeOfItems = [...disabledItemsList]
              listeOfItems.splice(editingItemIndex, 1);
              setEditingItems(listeOfItems)
            }
          })
        }
      }
      updateProjectStatus();
    }
  return (
    <>
      <ToastContainer />
      {loading ?
          <Flex  direction="column" alignItems="center" className="cus_loader">
            <Loader size="large"  width="5rem" height="5rem"/>
          </Flex>
      :
        <Table style ={{"max-width": "50rem", "margin": "0 auto", "width": "100%"}} highlightOnHover={true}>
          <TableHead>
            <TableRow>
              <TableCell as="th" style={{"text-align":"left"}} >Title</TableCell>
              <TableCell as="th" >Enable</TableCell>
              <TableCell as="th">Action</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {data.map(item=>{
              return(
                 <TableRow key={item.id}>
                  <TableCell style={{"text-align":"left"}} >{item.title}</TableCell>
                  <TableCell>
                    <SwitchField isChecked={!item.isdisabled} isDisabled={editingItems.includes(item.id)} onChange={(e) => disableProcess(item.id, e.target.checked)}/>
                  </TableCell>
                  <TableCell> 
                    <Button variation="link" style={{"border":"none"}} onClick={() => editeNavigate(item.id)}>
                      <FaPencilAlt />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
         </TableBody>
    </Table>
    }
  </>
  );
};

export default AdminProjectList;
