import { Outlet } from "react-router-dom";
import Fab from "./Fab";
import { View } from "@aws-amplify/ui-react";

const Layout = ({  user }) => {
  return (
    <View className="main_container">
      <Outlet />
      <Fab />
    </View>
  );
};

export default Layout;
