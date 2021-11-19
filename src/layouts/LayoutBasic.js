import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';


export default function LayoutsBasic({routes}){
    const { Footer, Content} =Layout;
    return(
        <Layout>
            <Layout>
            <Content>
                <LoadRouters routes={routes}/>
            </Content>
            <Footer>Footeeer...</Footer>
            </Layout>
        </Layout>
    )
}

function LoadRouters({routes}){
   
    return(
    <Switch>
    { routes.map((route, index)=>(
        <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact}
        />
    ))}
    </Switch>
    );
}