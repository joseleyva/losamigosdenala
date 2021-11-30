import React from "react";
import "./MenuTop.scss";
import NalaLogo from "../../../assets/img/png/IconNala.png";
import { Button } from "antd";
import {MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined } from "@ant-design/icons";

export default function MenuTop(props) {
  const {menuCollapsed, setMenuCollapsed}=props;
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={NalaLogo} alt="Nala" />

        <Button type="link"  onClick={()=>setMenuCollapsed(!menuCollapsed)} >
          {menuCollapsed ?    <MenuUnfoldOutlined/> :  <MenuFoldOutlined /> }
          
        </Button>
      </div>
      <div className="menu-top__right">
          <Button type="link"><PoweroffOutlined/></Button>
      </div>
    </div>
  );
}
