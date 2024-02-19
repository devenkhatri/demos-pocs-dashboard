import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@aws-amplify/ui-react";
import config from './amplifyconfiguration.json';
import Header from './components/Header';
import Footer from './components/Footer';
import RoutesList from './RoutesList';
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
Amplify.configure(config);

function App( {user }) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header user={user} />
        <RoutesList />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

//export default withAuthenticator(App); //removing auth temporarily
export default App;
