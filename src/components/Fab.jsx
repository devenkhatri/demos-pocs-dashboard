import { useTheme } from "@aws-amplify/ui-react";
import {
  Container,
  lightColors,
  //   darkColors,
  Link,
} from "react-floating-action-button";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Fab = () => {
  const { tokens } = useTheme();
  return (
    <Container>
      <Link
        href="/"
        tooltip="Back to Dashboard"
        styles={{
          backgroundColor: tokens.colors.secondary[80],
          color: lightColors.white,
          opacity: 0.7,
          width: "40px",
          height: "40px",
        }}
      >
        <FaArrowRightFromBracket />
      </Link>
    </Container>
  );
};
export default Fab;
