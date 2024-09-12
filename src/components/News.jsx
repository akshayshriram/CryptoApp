import React, { useEffect, useState } from "react";
import {
  Typography,
  Select,
  Row,
  Col,
  Avatar,
  Card,
  Button,
  Input,
} from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNews";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    count: simplified ? 8 : 100,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [News, setNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!cryptoNews) return; // Check if cryptoNews exists before proceeding

    // Filter the data based on the search term
    const filterData = cryptoNews.filter((news) =>
      news.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If simplified is true, only keep the first 4 items
    if (simplified) {
      setNews(filterData.slice(0, 4));
    } else {
      setNews(filterData); // Otherwise, set all filtered data
    }
  }, [cryptoNews, searchTerm, simplified]);

  console.log(cryptoNews);

  return (
    <>
      <div className="search-crypto">
        {!simplified && (
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        )}
      </div>
      <Row gutter={[32, 32]} className="news-card-container">
        {News?.map((news, index) => (
          <Col xs={24} sm={12} lg={12} className="news-card" key={index}>
            <Card title={news.title}>
              <Link to={`${news.URL}`} target="_blank">
                <Title level={5}>{news.Title}</Title>
                <Button type="primary">Read More</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
