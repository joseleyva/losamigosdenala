import React,{useState} from "react";
import { Layout } from "antd";
import {Redirect, Route, Switch } from "react-router-dom";
import './LayoutAdmin.scss';
import MenuTop from '../components/MenuTop';
import MenuSider from '../components/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';

export default function LayoutsAdmin({routes}) {
  const { Header, Content, Footer} = Layout;
  const [menuCollapsed, setMenuCollapsed] =useState(true);
  const user= null;
  if(!user){
    return(
      <>
      <Route path="/admin/login" component={AdminSignIn}/>
      <Redirect to="/admin/login"/>
      </>
      )
  }
  return (
    <Layout>
     <MenuSider menuCollapsed={menuCollapsed}/>
      <Layout className="layout-admin" style={{marginLeft: menuCollapsed ? "80px" : "200px" }}>
        <Header className="layout-admin__header">
          <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
        </Header>
       
        <Content className="layout-admin__content"> 
       
          <LoadRoutes routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">Footer....</Footer>
      </Layout>
    </Layout>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
     { routes.map((route, index)=>(
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
      ))}
    </Switch>
  );
}
