import {Button, TextAreaField,  Card, Input, Label, Fieldset, Flex, Loader} from "@aws-amplify/ui-react";
import { dataList } from "../../assets/dummy";
import { generateClient } from 'aws-amplify/api';
import * as queries from '../../graphql/queries';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateProjects } from '../../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AdminProjectEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDemoUrl, setProjectDemoUrl] = useState("");
    const [projectTags, setProjectTags] = useState("");
    const [projectServicesUsed, setProjectServicesUsed] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectProblemStatement, setProjectProblemStatement] = useState("");
    const [projectSolution, setProjectSolution] = useState("");
    const [projectSolutionDiagram, setProjectSolutionDiagram] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [redirectToList, setRedirect] = useState(false);
    useEffect(() => {
        fetchProject()
    }, []);
    useEffect(() => {
       if (redirectToList){
          return navigate("/rxc345");
       }
    },[redirectToList]);
    const client = generateClient();
    const fetchProject = async () => {
        setIsLoading(true)
        if (id) {
            const project = await client.graphql({
              query: queries.getProjects,
              variables: { id: id }
            });
            const projectDetail = project?.data?.getProjects;
            setProjectTitle(projectDetail?.title || "")
            setProjectDemoUrl(projectDetail?.demourl || "")
            if (projectDetail?.tags && projectDetail?.tags.length) {
                setProjectTags(projectDetail?.tags.join(",") || "")
            }
            if (projectDetail?.services_used && projectDetail?.services_used.length) {
                setProjectServicesUsed(projectDetail?.services_used.join(",") || "")
            }
            setProjectDescription(projectDetail?.description || "")
            setProjectProblemStatement(projectDetail?.problem_statement || "")
            setProjectSolution(projectDetail?.solution || "")
            setProjectSolutionDiagram(projectDetail?.solution_diagram || "")
        }
        setIsLoading(false);
    }
    const submitProjectData = () => {
        setIsLoading(true)
        client.graphql({
            query: updateProjects,
            variables: {
              input: {
                id: id,
                title: projectTitle,
                demourl: projectDemoUrl,
                tags: projectTags.split(","),
                services_used: projectServicesUsed.split(","),
                description: projectDescription,
                problem_statement: projectProblemStatement,
                solution: projectSolution,
                solution_diagram: projectSolutionDiagram
              }
            }
          })
          .then(() => {
            setIsLoading(false)
            toast('🦄 Project Successfully Updated.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "light",
            });
            setTimeout(() => {
                setRedirect(true)
            }, 3000)
          })
          .catch(() => {
            setIsLoading(false)
            toast.error('Something Went Wrong!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
            });
          })
    }
    const cancel = () => {
        setRedirect(true)
    }
    return(
        <>
        <ToastContainer />
        {isLoading ?
            <Flex  direction="column" alignItems="center" className="cus_loader">
              <Loader size="large"  width="5rem" height="5rem"/>
            </Flex>
        :
            <Flex justifyContent="center">
                <Card variation="elevated" paddingLeft={{ base: "1rem", large: "2.5rem" }} paddingRight={{ base: "1rem", large: "2.5rem" }} width="100%" maxWidth="800px">
                    <Flex direction="column" alignContent="flex-start" justifyContent="flex-start" style={{"text-align":"left"}}>
                        <Fieldset variation="plain" direction="column">
                            <>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" value={projectTitle} width="100%" onChange={(e) => setProjectTitle(e.target.value)} />
                            </>
                            <>
                                <Label htmlFor="demourl">Demo URL</Label>
                                <Input id="demourl" name="demourl" value={projectDemoUrl} width="100%" onChange={(e) => setProjectDemoUrl(e.target.value)}/>
                            </>
                            <>
                                <Label htmlFor="tags">Tags</Label>
                                <Input id="tags" name="tags" value={projectTags} width="100%" onChange={(e) => setProjectTags(e.target.value)}/>
                            </>
                            <>
                                <Label htmlFor="services_used">Services Used</Label>
                                <Input id="services_used" name="services_used" value={projectServicesUsed} width="100%" onChange={(e) => setProjectServicesUsed(e.target.value)} />
                            </>
                            <TextAreaField label="Description" defaultValue={projectDescription} id="description" name="description" onChange={(e) => setProjectDescription(e.target.value)} />
                            <TextAreaField label="Problem Statement" defaultValue={projectProblemStatement} id="problem_statement" name="problem_statement" onChange={(e) => setProjectProblemStatement(e.target.value)} />
                            <TextAreaField label="Solution" defaultValue={projectSolution} id="solution" name="solution" onChange={(e) => setProjectSolution(e.target.value)} />
                            <>
                                <Label htmlFor="solution_diagram">Solution Diagram URL</Label>
                                <Input id="solution_diagram" name="solution_diagram" value={projectSolutionDiagram} width="100%" onChange={(e) => setProjectSolutionDiagram(e.target.value)} />
                            </>
                        </Fieldset>
                        <Flex direction="row" alignContent="flex-end" justifyContent="flex-end">
                            <Button variation="primary" colorTheme="info" onClick={() => submitProjectData()}>Submit</Button>
                            <Button variation="primary" colorTheme="error" onClick={() => cancel()}>Cancel</Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        }
        </>
    );
};

export default AdminProjectEdit;