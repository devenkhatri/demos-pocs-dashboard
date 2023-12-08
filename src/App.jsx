import { Amplify } from 'aws-amplify';
import { withAuthenticator, View } from '@aws-amplify/ui-react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import App1 from "./projects/app1";
import AmplifyFilterFeeds from "./projects/amplify-filter-feeds";
import config from './amplifyconfiguration.json';
import ProjectDetails from "./components/ProjectDetails";
import Header from './components/Header';
import Footer from './components/Footer';
import AdminProjectList from './components/admin/AdminProjectList';
import AdminProjectEdit from './components/admin/AdminProjectEdit';
Amplify.configure(config);

function App( {user }) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header user={user} /> 
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="one" element={<App1 title="One" />} />
            <Route path="two" element={<App1 title="Two" />} />
            <Route path="amplify-filter-feeds" element={<AmplifyFilterFeeds />} />
            <Route path="project-details/:id" element={<ProjectDetails />}/>
            <Route path="rxc345" element={<AdminProjectList />}/>
            <Route path="rxc345-edit/:id" element={<AdminProjectEdit />}/>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const NoPage = () => {
  return (
    <View as="div" className="cus_401_div"> 
      <h1 className="cus_404_h1">404</h1>
    </View>
  );
};

export default withAuthenticator(App);
