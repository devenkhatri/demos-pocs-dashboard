import { View } from '@aws-amplify/ui-react';
import { Route, Routes } from "react-router-dom";
import App1 from "./projects/app1";
import AmplifyFilterFeeds from "./projects/amplify-filter-feeds";
import BootstrapFilterFeeds from './projects/bootstrap-filter-feeds'
import ProjectDetails from "./components/ProjectDetails";
import AdminProjectList from './components/admin/AdminProjectList';
import AdminProjectAdd from './components/admin/AdminProjectAdd';
import AdminProjectEdit from './components/admin/AdminProjectEdit';
import Layout from "./components/Layout";
import Home from "./components/Home";

function RoutesList() {
  return ( 
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="one" element={<App1 title="One" />} />
        <Route path="two" element={<App1 title="Two" />} />
        <Route path="amplify-filter-feeds" element={<AmplifyFilterFeeds />} />
        <Route path="bootstrap-filter-feeds" element={<BootstrapFilterFeeds />} />
        <Route path="project-details/:id" element={<ProjectDetails />}/>
        <Route path="rxc345" element={<AdminProjectList />}/>
        <Route path="rxc345-add" element={<AdminProjectAdd />}/>
        <Route path="rxc345-edit/:id" element={<AdminProjectEdit />}/>
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

const NoPage = () => {
  return (
    <View as="div" className="cus_401_div"> 
      <h1 className="cus_404_h1">404</h1>
    </View>
  );
};

export default RoutesList