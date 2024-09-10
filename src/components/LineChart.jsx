import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const [chartData, setChartData] = useState(null); // Initially null to handle loading state
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // Ensure that coinHistory and its nested properties exist
        if (!coinHistory || !coinHistory.data || !coinHistory.data.history) {
            return;
        }

        const coinPrice = [];
        const coinTimestamp = [];

        console.log(coinHistory);

        // Safely map the coin history data
        coinHistory.data.history.forEach((history) => {
            coinPrice.push(history.price);
            coinTimestamp.push(new Date(history.timestamp * 1000).toLocaleDateString());
        });

        setChartData({
            labels: coinTimestamp,
            datasets: [
                {
                    label: 'Price In USD',
                    data: coinPrice,
                    fill: false,
                    backgroundColor: '#0071bd',
                    borderColor: '#0071bd',
                },
            ],
        });

        setChartOptions({
            scales: {
                x: {
                    reverse: true, // Reverse the X-axis to have the latest data on the right side
                },
                y: {
                    beginAtZero: true,
                },
            },
        });
    }, [coinHistory]);

    // If chartData is still null, return a loader or empty state
    if (!chartData) {
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
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart</Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={chartData} options={chartOptions} />
        </>
    );
};

export default LineChart;
