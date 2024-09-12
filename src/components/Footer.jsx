// import React from 'react'
import { Link } from "react-router-dom";
import { Button, Menu, Typography, Avatar, Row, Grid } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const menuItems = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      key: "cryptocurrencies",
      icon: <FundOutlined />,
    },
    {
      label: <Link to="/news">News</Link>,
      key: "news",
      icon: <BulbOutlined />,
    },
  ];

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{
          display: "flex",
          justifyContent: "space-around",
          minWidth: "350px",
        }}
      />
    </>
  );
};

export default Footer;
