import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as styles from './OrdersHistory.module.css';
import Confirm from '../Common/Confirm';

const OrdersHistory = () => {
  const location = useLocation();
  const orderId = location.state;
  const url = 'http://localhost:8081/';
  const [orders, setOrders] = useState({
    status: '',
    total_price: '',
  });
  const [initialOrders, setInitialOrders] = useState({
    status: '',
    total_price: ''
  })
  const [isDifferent, setIsDifferent] = useState(false);

  const [ordersProducts, setOrdersProducts] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const fetchData = () => {
    console.log('가져온 주문번호 ', orderId);
    fetch(url + `orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders({
          status: data.status,
          total_price: data.total_price,
        });
        setOrdersProducts(data.ordersProducts || []);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  useEffect(() => {
    if(orders.status === '주문대기') {
      setDisabled(false)
    }
  }, [orders.status])

  useEffect(() => {
    const areDifferent = orders.status !== initialOrders.status || orders.total_price !== initialOrders.total_price
  }, [orders, initialOrders])

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    if(value > 0) {
      setOrdersProducts((prevProducts) =>
        prevProducts.map((product) =>
        product.id === id ? { ...product, [name]: value } : product
      )
    );
    }
  };

  const handlePaymentClick = () => {
    console.log('결제 버튼 클릭');
    // 결제 로직 추가
  };

  const handleEditClick = () => {
    console.log('수정 버튼 클릭');
    // 주문 수정 로직 추가
    
  };

  const handleCancelClick = () => {
    console.log('주문 취소 버튼 클릭');
    // 주문 취소 로직 추가
  };

  const handleRefundClick = () => {
    console.log('환불 버튼 클릭');
    // 환불 로직 추가
  };

  const updateOrderData = (param) => {

  }

  const updateOrderStatus = (param) => {
    const data = {
      status: param
    }
    fetch(url + `/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      let message = ''
      
      if(param === 2) {
        message = '주문이 완료되었습니다!'
      }
      if(param === 3) {
        message = '주문이 취소되었습니다'
      }
      alert(message);
    })
    .catch((error) => console.log(error))
  }

  return (
    <div className={styles.ordersHistory}>
      <div className={styles.productInfo}>
        <label>
          주문상태: {orders.status}
        </label>
        <label>
          주문금액: {orders.total_price} 
        </label>
        {ordersProducts.map((product) => (
          <div key={product.id}>
            <label>
              카테고리:
              <input type="text" value={product.category} name="category" disabled />
            </label>
            <label>
              상품 이름:
              <input type="text" value={product.product_name} name="product_name" disabled />
            </label>
            <label>
              상품 가격:
              <input type="number" value={product.price} name="price" disabled />
            </label>
            <label>
              상품 수량:
              <input
                type="number"
                value={product.quantity}
                name="quantity"
                disabled={disabled}
                onChange={(e) => handleChange(e, product.id)}
              />
            </label>
            <label>
              상품 설명:
              <input type="text" value={product.description} name="description" disabled />
            </label>
            <label>
              제조사 이름:
              <input type="text" value={product.manufacturer_name} name="manufacturer_name" disabled />
            </label>
            <label>
              제조사 주소:
              <input type="text" value={product.manufacturer_address} name="manufacturer_address" disabled />
            </label>
            <label>
              제조사 연락처:
              <input type="text" value={product.manufacturer_contact_info} name="manufacturer_contact_info" disabled />
            </label>
            <img src={product.image_url} alt="상품 이미지" />
          </div>
        ))}
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
          <button id='btn-cancel' onClick={handleCancelClick}>
            주문취소
          </button>
        )}
        {orders.status === '주문완료' && (
          <button id='btn-refund' onClick={handleRefundClick}>
            환불
          </button>
        )}
        {orders.status === '주문취소' && <></>}
      </div>
    </div>
  );
};

export default OrdersHistory;
