import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './OrdersHistory.module.css';
import moment from 'moment';

const OrdersHistoryTable = ({ customerId = 0 }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const url = 'http://localhost:8081/';

  const handleOnClick = (orders_id) => {
    navigate(`/customer/ordersHistory/${orders_id}`, { state: orders_id });
  };

  useEffect(() => {
    fetch(url + `orders/customer/${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.log(error));
  }, [customerId]);

  return (
    <div className={styles.ordersHistory}>
      <p>주문 내역 테이블</p>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>주문 번호</th>
            <th>총 금액</th>
            <th>주문 상태</th>
            <th>주문생성 시간</th>
            <th>주문최종수정 시간</th>
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.length > 0 &&
            orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr onClick={() => handleOnClick(order.order_id)}>
                  <td>{order.order_id}</td>
                  <td>{order.total_price}</td>
                  <td>{order.status_name}</td>
                  <td>
                    {moment(order.created_at).format('YYYY-MM-DD A hh:mm ')}
                  </td>
                  <td>
                    {moment(order.updated_at).format('YYYY-MM-DD A hh:mm ')}
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersHistoryTable;
