import { Outlet } from "react-router-dom";
import { View } from "@aws-amplify/ui-react";

const Layout = ({  user }) => {
  return (
    <View className="main_container">
      <Outlet />
    </View>
  );
};

export default Layout;
