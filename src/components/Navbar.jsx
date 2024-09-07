import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import navLogo from "../images/CryptoApp.png";

const Navbar = () => {
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
      label: <Link to="/exchanges">Exchanges</Link>,
      key: "exchanges",
      icon: <MoneyCollectOutlined />,
    },
    {
      label: <Link to="/news">News</Link>,
      key: "news",
      icon: <BulbOutlined />,
    },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={navLogo} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoApp</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark" mode="vertical" items={menuItems} />
    </div>
  );
};

export default Navbar;
