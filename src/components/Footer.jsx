import { useTheme, View, Text, Divider } from "@aws-amplify/ui-react";

const Footer = () => {
    const { tokens } = useTheme();
    return (
        <View
            textAlign="center"
            // padding={tokens.space.xL}
            className="footer"
        >
            <Text color={tokens.colors.neutral[80]}>
                &copy; 2023 All Rights Reserved
            </Text>
        </View>
    )
}

export default Footer;