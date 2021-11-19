import React from "react";
import routes from "./config/routes";
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import "./App.css";

function App(){
  return(
      <Router>
        <Switch>
        {routes.map((route, index)=>(
          <RouterWithSubRouters key={index} {...route}/>
        ))} 
        </Switch>
      </Router>
  )
}
function RouterWithSubRouters(route){
  return(
    <Route 
      path={route.path}
      exact={route.exatc}
      render={props=><route.component routes={route.routes} {...props}/>}
    />
  );

}

export default App;