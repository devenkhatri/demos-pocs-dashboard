import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

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
Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <ThemeProvider>
      <Header signOut={signOut} user={user} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout signOut={signOut} user={user} />}>
            <Route index element={<Home />} />
            <Route path="one" element={<App1 title="One" />} />
            <Route path="two" element={<App1 title="Two" />} />
            <Route path="amplify-filter-feeds" element={<AmplifyFilterFeeds />} />
            <Route path="project-details/:id" element={<ProjectDetails />}/>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

const NoPage = () => {
  return <h1>404</h1>;
};

export default withAuthenticator(App);
