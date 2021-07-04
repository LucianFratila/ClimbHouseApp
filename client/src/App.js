
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './index.css'
import ClientList from "./components/ClientList.component";
import ActiveClientList from "./components/ActiveClientList.component";
import EditClient from "./components/EditClient.component";
import EditClientProvisional from "./components/EditClientProvisional.component";
import Settings from "./components/Settings.component";
import MainNavNoSuperAdmin from "./components/MainNavNoSuperAdmin.component";
import MainNavSuperAdmin from "./components/MainNavSuper.component";
import Container from 'react-bootstrap/Container'
import React, { useContext } from 'react';
import LoginAdmin from "./components/LoginAdmin.component";
import SignupAdmin from "./components/SignupAdmin.compnent";
import ClientSideRules from './components/ClientSideRules.component'
import ClientListSuper from "./components/ClientListSuper.component";
import EditAdmin from "./components/EditAdmin.component";
import AdminLogs from "./components/AdminLogs.component";
import PrivateRoute from "./PrivateRouter";
import SuperPrivateRouter from "./SuperPrivateRouter";
import { AuthContext } from "./Auth";





function App() {
  const {superUser} = useContext(AuthContext);
  


  return (
  
    <Router>
      {
      superUser===null
      ?
      null
      :
       superUser.roles==='super'? <SuperPrivateRouter component={MainNavSuperAdmin}/>:<PrivateRoute component={MainNavNoSuperAdmin}/> 
      }
      
      
      
    <Container fluid className="color_theme">
    
      
      <Switch>
      <PrivateRoute path = '/' exact component={ClientList}/>
      <SuperPrivateRouter path = '/cs' exact component={ClientListSuper}/>
      <PrivateRoute path = '/active' exact component={ActiveClientList}/>
      <PrivateRoute path = '/edit/:id' component={EditClientProvisional}/>
      <PrivateRoute path = '/settings' component={Settings} />
      <PrivateRoute path = '/admins/:firebaseID' component={EditAdmin} />
      <SuperPrivateRouter path = '/logs' component={AdminLogs} />
      <Route path = '/login' component={LoginAdmin} />
      <Route path='/rules' component={ClientSideRules}/>
      
      <SuperPrivateRouter path = '/signup' component={SignupAdmin} />
      </Switch>
    </Container> 

    
    
  </Router>
  
 
    
  );
}

export default App;
