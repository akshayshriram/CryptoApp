import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Card, Flex } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
// import { LineChart } from './LineChart'
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  // Handle time period change
  const handleTimePeriodChange = (value) => {
    setTimePeriod(value);
  };

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },

    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching)
    return (
      <>
        <div className="loader">
          <iframe
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            }}
            src="https://lottie.host/embed/8d3879a1-d32d-4536-b720-9599e4e1c545/ibqFsnoevg.json"
          ></iframe>
        </div>
      </>
    );

  console.log(cryptoDetails);

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={7} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>
            {cryptoDetails.name} live price in US Dollars. view value
            statistics, market cap and supply.
          </p>
          <Select
            defaultValue="7d"
            className="select-timeperiod"
            placeholder="Select Time Period"
            onChange={handleTimePeriodChange}
          >
            {time.map((time) => (
              <Option key={time}>{time}</Option>
            ))}
          </Select>
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price)}
            coinName={cryptoDetails?.name}
          />
          <Col className="stats-container">
            <Flex className="" vertical>
              <Title level={3} className="coin-details-heading">
                What is {cryptoDetails.name}?
              </Title>
              {HTMLReactParser(cryptoDetails.description)}
            </Flex>
            <Flex gap="large" className="flex-container">
              <Card className="coin-value-statistics">
                <Col className="coin-value-statistics-heading">
                  <Title level={3} className="coin-details-heading">
                    {cryptoDetails.name} value statistics
                  </Title>
                  <p>An overview showing the stats of {cryptoDetails.name}</p>
                </Col>
                {stats.map(({ icon, title, value }) => (
                  <Col key={title} className="coin-stats">
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                  </Col>
                ))}
                <Col className="coin-value-statistics-heading">
                  <Title level={3} className="coin-details-heading">
                    Other statistics
                  </Title>
                  <p>An overview showing the stats of all cryptoCurrencies</p>
                </Col>
                {genericStats.map(({ icon, title, value }) => (
                  <Col key={title} className="coin-stats">
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">{value}</Text>
                  </Col>
                ))}
              </Card>
              <Col className="others-statistics-info "></Col>
              <Card className="coin-links">
                <Title level={3} className="coin-details-heading">
                  {cryptoDetails.name} Links
                </Title>
                {cryptoDetails.links?.map((link) => (
                  <Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                      {link.type}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </Row>
                ))}
              </Card>
            </Flex>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
