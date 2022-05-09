import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";

import { createTheme, ThemeProvider } from "@mui/material";
import { blueGrey, green, grey, indigo, red } from "@mui/material/colors";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

//To override the default theme values, search default theme in mui and
//import createTheme and ThemeProvider from mui-material

const theme = createTheme({
  palette: {
    primary: {
      main: "#348586",
    },
    secondary: grey,
    
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>

          {/* <Layout/> component is added at last and switch was wwrapped around*/}
          <Layout>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/notebook">
              <Notes />
            </Route>
          </Layout>
        </Switch>
      </Router>
     </ThemeProvider>
  );
}

export default App;
