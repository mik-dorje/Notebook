import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'

import { createTheme, ThemeProvider } from '@mui/material'
import { blueGrey, indigo } from '@mui/material/colors'
import Layout from './components/Layout'




//To override the default theme values, search default theme in mui and
//import createTheme and ThemeProvider from mui-material

const theme = createTheme({
  palette: {
    primary: {
      main: '#1d6509'
    },
    secondary: blueGrey
  },
  typography:{
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,

  }
})

function App() {

 



  return (

    <ThemeProvider theme={theme}>
    <Router>

{/* <Layout/> component is added at last and switch was wwrapped around*/}
      <Layout>
      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
      </Switch>
      </Layout>
    </Router>
    </ThemeProvider>

  );
}

export default App;


