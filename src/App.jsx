import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import App1 from "./projects/app1";
import AmplifyFilterFeeds from "./projects/amplify-filter-feeds";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="one" element={<App1 title="One" />} />
            <Route path="two" element={<App1 title="Two" />} />
            <Route path="amplify-filter-feeds" element={<AmplifyFilterFeeds />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const NoPage = () => {
  return <h1>404</h1>;
};
