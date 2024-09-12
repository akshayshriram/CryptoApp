import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Row, Col, Card, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 8 : 100;
  const [searchTerm, setSearchTerm] = useState("");

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCyrptos] = useState([]);

  // console.log(cryptos);

  useEffect(() => {
    const filterData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCyrptos(filterData);
  }, [cryptosList, searchTerm]);

  if (isFetching) {
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
  }

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
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>price: ${millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
