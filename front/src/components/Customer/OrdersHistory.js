import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from './OrdersHistory.module.css';
import moment from 'moment';

const OrdersHistory = ({ customerId = 0}) => {
    console.log("주문내역 페이지: ",customerId);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const url = 'http://localhost:8081/';

    const handleOnClick = (order_id) => {
        navigate(`/orders/${order_id}`);
    };

    useEffect(() => {
        fetch(url + `orders/customer/${customerId}`)
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.log(error));
    }, [customerId]);

    return (
        <div className={styles.ordersHistory}>
            <p>주문 조회 내역 테이블</p>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>주문 번호</th>
                        <th>총 금액</th>
                        <th>주문 상태</th>
                        <th>주문 생성일</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <React.Fragment key={order.order_id}>
                            <tr onClick={() => handleOnClick(order.order_id)}>
                                <td>{order.order_id}</td>
                                <td>{order.total_price}</td>
                                <td>{order.status}</td>
                                <td>{order.created_at}</td>
                            </tr>
                            {order.ordersProduct && order.ordersProduct.length > 0 && (
                            <tr>
                                <td colSpan="4">
                                    <table className={styles.subTable}>
                                        <thead>
                                            <tr>
                                                <th>상품</th>
                                                <th>상품 금액</th>
                                                <th>상품 수량</th>
                                                <th>상품 이미지</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.ordersProducts.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td><img src={product.image_url} alt={product.name} width="50" /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersHistory;
