import * as React from "react"
import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as MuiLink} from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <>
      <AppBar position="fixed" color="transparent">
          <Toolbar backgroundColor="white">
              <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  backgroundColor="white"
                  as ="a"
                  href={"/"}
              >
                 <img src="/assets/tcs_logo.png" height="60px"/>
              </Typography>   
          </Toolbar>
      </AppBar>
      
      {/* <header className="global-header">{header}</header> */}
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main className="main-container" style={{marginTop : '5rem'}}>{children}</main>
        {/*<footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
        */}
      </div>
      <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) => "black",
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2" color="white" style={{display:"flex", justifyContent:"center"}}>
              {new Date().getFullYear()}
              {' All Rights Reserved'}
            </Typography>
          </Container>
        </Box>
    </>
  )
}

export default Layout
