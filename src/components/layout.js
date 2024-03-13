import * as React from "react"
import { Link } from "gatsby"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { StaticImage } from "gatsby-plugin-image"
import Bio from "./bio"

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
       <AppBar position="fixed" style={{"background": "white"}} >
          <Toolbar backgroundColor="white">
              <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  backgroundColor="white"
                  as ="a"
                  href={"/"}
              >
                <StaticImage src="../images/tcs_logo.png" alt="TCS" layout="fixed"height={60}/>
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
            <Typography variant="body2" color="white" style={{display:"flex", justifyContent:"center" }}>
              {new Date().getFullYear()}
              {` All Rights Reserved | `} <Bio />
            </Typography>
          </Container>
        </Box>
    </>
  )
}

export default Layout
