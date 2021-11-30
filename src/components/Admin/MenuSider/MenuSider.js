import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu ,} from "antd";
import "./MenuSider.scss";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";

export default function MenuSider(props) {
  const { Sider } = Layout;
  const { menuCollapsed } = props;
  return (

  <Sider className="admin-sider"  collapsed={menuCollapsed}>
      <Menu
      theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1" icon={<HomeOutlined/>} >
          <Link to={"/admin"}>
          <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/admin/menu-web"}>
            <MenuOutlined />
            <span className="nav-text">Menu Web</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
