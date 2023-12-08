import { useEffect, useState } from 'react';
import { Image, MenuItem, Menu, Divider, View, Flex, Text, Icon, Input, Label, CheckboxField, useTheme, Button } from "@aws-amplify/ui-react";
import brandLogo from "../assets/tcs_logo.png";
import {Link} from "react-router-dom"
import { FaHome, FaPowerOff } from "react-icons/fa";
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
const IconSave = () => {
    return (
        <Icon
            ariaLabel=""
            pathData="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM19 19H5V5H16.17L19 7.83V19ZM12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12ZM6 6H15V10H6V6Z"
        />
    );
};

async function handleSignOut() {
    try {
      await signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
const Header = ({ user }) => {
    const { tokens } = useTheme();
    const [username, setUsername] = useState(user?.username);

    useEffect(()=>{
        fetchUserAttributes().then((userAttributes) => setUsername(userAttributes.name))
    },[]);
    
    return (
        <View className="header">
            <Link to="/" className="logo">
                <Image src={brandLogo} className="logoImg" />
            </Link>
            <View className="menu">
                <Text className="menu-item user-text" fontSize="0.8em">Welcome, <Text as="span" fontSize="1.5em">{username}</Text></Text>
                <Text className="menu-item home-text" ><Link to="/" className="home-link"><FaHome /></Link></Text>
                <Button variation="link" className="cus_signout_btn" onClick={handleSignOut}>
                    <FaPowerOff />
                </Button>
            </View>
             <View className="menu-mobile">
                <View className="menu-block-mobile left">
                    <Text className="menu-item user-text" fontSize="0.8em">Welcome, <Text as="span" fontSize="1.5em">{username}</Text></Text>
                </View>
                <View className="menu-block-mobile right">
                    <Text className="menu-item home-text" ><Link to="/" className="home-link"><FaHome /></Link></Text>
                    <Button variation="link" className="cus_signout_btn" onClick={handleSignOut}>
                        <FaPowerOff />
                    </Button>
                </View>
            </View>
        </View>

    )
}

export default Header;