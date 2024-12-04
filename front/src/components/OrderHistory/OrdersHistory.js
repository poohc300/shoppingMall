import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from './OrdersHistory.module.css';

const OrdersHistory = () => {
  const location = useLocation();
  const orderId = location.state;
  const url = 'http://localhost:8081/';
  const [orders, setOrders] = useState(null); // 초기값을 null로 설정
  const [ordersProducts, setOrdersProducts] = useState([]); // 초기값을 빈 배열로 설정

  const fetchData = () => {
    console.log('가져온 주문번호 ', orderId);
    fetch(url + `orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setOrdersProducts(data.ordersProducts || []); // ordersProducts가 null일 경우 빈 배열로 설정
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  useEffect(() => {
    console.log('데이터 받아옴: ', orders);
  }, [orders]);

  useEffect(() => {
    console.log(ordersProducts);
  }, [ordersProducts]);

  return (
    <div className={styles.ordersHistory}>
      {orders ? (
        <>
          <div className={styles.status}>주문상태: {orders.status}</div>
          <div className={styles.productInfo}>
            <p>주문금액: {orders.total_price}</p>
            {ordersProducts.length > 0 ? (
              ordersProducts.map((product) => (
                <div key={product.id}>
                  <p>카테고리: {product.category}</p>
                  <p>상품이름: {product.product_name}</p>
                  <p>상품 가격: {product.price}</p>
                  <p>상품 수량: {product.quantity}</p>
                  <p>상품 설명: {product.description}</p>
                  <p>제조사 이름: {product.manufacturer_name}</p>
                  <p>제조사 주소: {product.manufacturer_address}</p>
                  <p>제조사 연락처: {product.manufacturer_contact_info}</p>
                  <img src={product.image_url} />
                </div>
              ))
            ) : (
              <p>주문된 상품이 없습니다.</p>
            )}
          </div>
          <div className={styles.orderButton}>
            {orders.status === '주문대기' && <button>결제</button>}
            {orders.status === '주문중' && <button>결제</button>}
            {orders.status === '주문완료' && <button>환불</button>}
            {orders.status === '주문실패' && <></>}
          </div>
        </>
      ) : (
        <div>주문 데이터를 불러오는 중입니다...</div>
      )}
    </div>
  );
};

export default OrdersHistory;
