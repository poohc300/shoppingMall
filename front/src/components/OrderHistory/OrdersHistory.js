import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from './OrdersHistory.module.css';

const OrdersHistory = () => {
  // 주문 수정이 이루어 지는 곳
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

  const handlePaymentClick = () => {
    console.log('결제 버튼 클릭'); // 결제 로직 추가
  };
  const handleGoToPaymentClick = () => {
    console.log('결제페이지로 이동 버튼 클릭'); // 결제 페이지로 이동하는 로직 추가
  };

  const handleEditClick = () => {};

  const handleCancelClick = () => {};

  const handleRefundClick = () => {};

  useEffect(() => {
    if (orderId) {
      fetchData();
    }
  }, [orderId]);

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
            {orders.status === '주문대기' && (
              <>
                <button id='btn-payment' onClick={handlePaymentClick}>
                  결제
                </button>
                <button id='btn-edit' onClick={handleEditClick}>
                  수정
                </button>
                <button id='btn-cancel' onClick={handleCancelClick}>
                  주문취소
                </button>
              </>
            )}
            {orders.status === '주문중' && (
              <button id='btn-payment' onClick={handleCancelClick}>
                주문취소
              </button>
            )}
            {orders.status === '주문완료' && (
              <button id='btn-go-to-payment' onClick={handleRefundClick}>
                환불
              </button>
            )}
            {orders.status === '주문취소' && <></>}
          </div>
        </>
      ) : (
        <div>주문 데이터를 불러오는 중입니다...</div>
      )}
    </div>
  );
};

export default OrdersHistory;
