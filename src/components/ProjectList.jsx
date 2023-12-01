import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import React, { useEffect } from 'react';
import { Collection } from '@aws-amplify/ui-react';
import { DummyCard } from './Home';

const ProjectList = () => {
    const client = generateClient();
    const [data, setData] = React.useState([]);

    const getAllProjects = async () => {
        const allProjects = await client.graphql({query: queries.listProjects});
        console.log("******** allProjects....", allProjects);
        if(allProjects && allProjects.data && allProjects.data.listProjects) setData(allProjects.data.listProjects.items);
    }

    const fetchProject = async () => {
        // Fetch a single record by its identifier
        const project = await client.graphql({
            query: queries.getProjects,
            variables: { id: 'some id' }
        });
    }
    
    useEffect(()=>{
        getAllProjects();
    },[]);
    
    return (
        <React.Fragment>
        <h1>Project List</h1>
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
        itemsPerPage={15}
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
          <DummyCard key={item.id} index={index} title={item.title} services={item.services_used} tags={item.tags} url={item.demourl} description={item.description} id={item.id}/>
        )}
      </Collection>
      </React.Fragment>
    );
}

export default ProjectList;