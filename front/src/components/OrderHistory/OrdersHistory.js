import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from './OrdersHistory.module.css';

const OrdersHistory = () => {
  const location = useLocation();
  const orderId = location.state;
  const url = 'http://localhost:8081/';
  const [orders, setOrders] = useState({});

  const fetchData = () => {
    console.log('가져온 주문번호 ', orderId);
    fetch(url + `orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('데이터 받아옴: ', orders);
  }, [orders]);

  return <div className={styles.ordersHistory}></div>;
};
export default OrdersHistory;
