import { Outlet } from "react-router-dom";
import Fab from "./Fab";
import { View } from "@aws-amplify/ui-react";

const Layout = () => {
  return (
    <View as="div">
      <Outlet />
      <Fab />
    </View>
  );
};

export default Layout;
