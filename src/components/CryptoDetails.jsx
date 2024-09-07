import React,{ useState} from 'react'
import HTMLReactParser from "html-react-parser"
import { useParams } from "react-router-dom"
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {  useGetCryptoDetailsQuery } from '../services/cryptoApi'

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  
  const { coinId } = useParams();
  const { data: cryptoDetails, isFetching} = useGetCryptoDetailsQuery('Qwsogvtv82FCd');
  const [timePeriod, setTimePeriod] = useState('7d')

  if(isFetching) return ( <>
    <div className="loader" >
      <iframe style={{position: "absolute", width: "100%", height: "100%", top: "0", left:"0"}} src="https://lottie.host/embed/8d3879a1-d32d-4536-b720-9599e4e1c545/ibqFsnoevg.json"></iframe>
      </div>    
    </>)

  console.log(cryptoDetails)


  return (
    <></>
  )
}

export default CryptoDetails