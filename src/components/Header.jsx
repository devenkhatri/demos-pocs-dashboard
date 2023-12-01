import { Image, MenuItem, Menu, Divider, View, Flex, Text, Link, Icon, Input, Label, CheckboxField, useTheme, Button } from "@aws-amplify/ui-react";
import brandLogo from "../assets/tcs_logo.png";
import { FaHome, FaPowerOff } from "react-icons/fa";
const IconSave = () => {
    return (
        <Icon
            ariaLabel=""
            pathData="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM19 19H5V5H16.17L19 7.83V19ZM12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12ZM6 6H15V10H6V6Z"
        />
    );
};
const Header = ({ signOut, user }) => {
    const { tokens } = useTheme();
    return (
        <View className="header">
            <Link href="/" className="logo">
                <Image src={brandLogo} height={"58px"}/>
            </Link>
            {/* <Input className="menu-btn" type="checkbox" id="menu-btn" />
            <Label className="menu-icon" for="menu-btn"><span className="navicon"></span></Label> */}
            <View className="menu">
                <Text className="menu-item user-text">Welcome, {user?.username}</Text>
                <Text className="menu-item home-text" ><Link href="/" className="home-link"><FaHome /></Link></Text>
                <Button variation="link" className="cus_signout_btn" >
                    <FaPowerOff />
                </Button>
            </View>
        </View>

    )
}

export default Header;