import React, { useEffect, useState } from 'react';
import OrdersProducts from './OrdersProducts';
import { useNavigate } from 'react-router-dom';
import * as styles from './Orders.module.css';
import Confirm from '../Common/Confirm';

const OrderDetail = ({ productList = [] }) => {
  /**
   * 여기 주문하기 클릭 누르면 밑에 콘솔로그 2번뜸
   * 이유 : setShowConfrim 변경하면서 리렌더링
   *
   */
  console.log('주문화면 : ', productList);
  const navigate = useNavigate();
  const url = 'http://localhost:8081/orders/';

  const [ordersPrice, setOrdersPrice] = useState(0);
  const [ordersProducts, setOrdersProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = () => {
    navigate('/');
  };

  const handleOrdersProductsPrice = (ordersProductsPriceInfo) => {
    console.log('상품 수량 변동: ', ordersProductsPriceInfo);
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

  const saveOrder = () => {
    const data = {
      customer_id: 1, // 하드코딩
      total_price: ordersPrice,
      ordersProducts: ordersProducts,
    };

    fetch(url + 'save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`주문번호 ${data}의 주문이 성공적으로 완료되었습니다 !!`);
        return data;
      })
      .then((data) => navigate(`/orderHistory/${data}`, { state: data }))
      .catch((error) => console.log('error : ', error));
  };

  useEffect(() => {
    console.log(ordersProducts);
    // 주문 총 가격 계산
    const testProducts = [
      { id: 1, price: 1000, quantity: 10 },
      { id: 2, price: 2000, quantity: 10 },
      { id: 3, price: 100, quantity: 50 },
    ];
    const totalPrice = ordersProducts.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);

    setOrdersPrice(totalPrice);
  }, [ordersProducts]);

  useEffect(() => {
    console.log('## 컨펌창 변경', showConfirm);
  }, [showConfirm]);

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
          <p>주문 금액: {ordersPrice}</p>
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
