import { Outlet } from "react-router-dom";
import Fab from "./Fab";
import { View } from "@aws-amplify/ui-react";

const Layout = ({ signOut, user }) => {
  return (
    <View as="div">
      <h1>Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <Outlet />
      <Fab />
    </View>
  );
};

export default Layout;
