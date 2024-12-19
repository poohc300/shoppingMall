import React, { useEffect, useState } from 'react';
import OrdersProducts from './OrdersProducts';
import { useNavigate } from 'react-router-dom';
import * as styles from './Orders.module.css';
import Confirm from '../Common/Confirm';
import { getUserIdFromRefreshToken } from '../../utils/jwtUtils';

const OrderDetail = ({ productList = [] }) => {
  const navigate = useNavigate();
  const url = 'http://localhost:8081/orders/';

  const [ordersPrice, setOrdersPrice] = useState(0);
  const [ordersProducts, setOrdersProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = () => {
    navigate('/');
  };

  const handleOrdersProductsPrice = (ordersProductsPriceInfo) => {
    const isExist = ordersProducts.some(
      (product) => product.id === ordersProductsPriceInfo.id
    );
    let temp = [];

    if (isExist === true) {
      // 업데이트
      temp = ordersProducts.map((product) =>
        product.id === ordersProductsPriceInfo.id
          ? ordersProductsPriceInfo
          : product
      );
    } else {
      // 삽입
      temp = [...ordersProducts, ordersProductsPriceInfo];
    }

    setOrdersProducts(temp);
  };

  const handleOrderClick = () => {
    console.log('주문하기 클릭');
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    saveOrder();
  };

  const getUserId = () => {
    const userId = getUserIdFromRefreshToken();
    console.log('사용자 아이디', userId);
    return userId;
  };

  const saveOrder = () => {
    const data = {
      customer_id: getUserId(), // 하드코딩
      total_price: ordersPrice,
      ordersProducts: ordersProducts,
    };

    fetch(url + 'save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`주문번호 ${data}의 주문이 성공적으로 완료되었습니다 !!`);
        return data;
      })
      .then((data) =>
        navigate(`/customer/ordersHistory/${data}`, { state: data })
      )
      .catch((error) => console.log('error : ', error));
  };

  useEffect(() => {
    // 주문 총 가격 계산
    // const testProducts = [
    //   { id: 1, price: 1000, quantity: 10 },
    //   { id: 2, price: 2000, quantity: 10 },
    //   { id: 3, price: 100, quantity: 50 },
    // ];
    const totalPrice = ordersProducts.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);

    setOrdersPrice(totalPrice);
  }, [ordersProducts]);

  return (
    <div className={styles.orderDetail}>
      <div className={styles.orderForm}>
        {productList.map((product) => (
          <OrdersProducts
            key={product.id}
            product={product}
            onPriceChange={handleOrdersProductsPrice}
          />
        ))}
        <div className={styles.totalPrice}>
          <label>주문 금액: {ordersPrice}</label>
        </div>
        <div className={styles.orderButton}>
          <button onClick={handleOrderClick}>주문하기</button>
          <button onClick={handleCancel}>주문취소</button>
        </div>
      </div>
      {showConfirm && (
        <Confirm
          message='주문하시겠습니까'
          onConfirm={handleConfirm}
          onCancel={() => {
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
};
export default OrderDetail;
