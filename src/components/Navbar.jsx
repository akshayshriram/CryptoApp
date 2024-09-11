import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar, Row, Grid } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import navLogo from "../images/CryptoApp.png";

const { useBreakpoint } = Grid;

const Navbar = () => {

  const screens = useBreakpoint(); // Get the current screen sizes

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);


  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    }
    else {
      setActiveMenu(true);
    }
  }, [screenSize])



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
    <div className="nav-container">
      <Row className="logo-container" justify="space-between">
        <Avatar src={navLogo} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoApp</Link>
        </Typography.Title>
        {!screens.md && (
          < Button className="main-control-container" onClick={() => setActiveMenu(!activeMenu)}>
            <MenuOutlined />
          </Button>
        )}
      </Row>
      {
        activeMenu && (
          <Menu theme="dark" mode="vertical" items={menuItems} />
        )
      }
    </div >
  );
};

export default Navbar;
