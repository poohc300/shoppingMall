import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as styles from './OrdersHistory.module.css';
import Confirm from '../Common/Confirm';

const OrdersHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state;
  const url = 'http://localhost:8081/';
  const [orders, setOrders] = useState({});
  const [initialOrders, setInitialOrders] = useState({});
  const [isDifferent, setIsDifferent] = useState(false);

  const [ordersProducts, setOrdersProducts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [status, setStatus] = useState('');

  const fetchData = () => {
    console.log('가져온 주문번호 ', orderId);
    fetch(url + `orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('주문데이터 : ', data);
        setOrders(data);
        setOrdersProducts(data.ordersProducts || []);
      })
      .catch((error) => console.log(error));
  };

  const updateOrders = () => {
    console.log('업데이트 전 데이터 ', orders, ordersProducts);

    const data = {
      quantity: Number(ordersProducts[0].quantity),
      totalPrice: orders.total_price,
    };

    fetch(url + `orders/${orderId}/products/${ordersProducts[0].id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('주문 수정에 성공했습니다.');
      })
      .catch((error) => console.log(error));
  };

  const updateOrdersStatus = () => {
    const data = {
      status: status,
    };
    console.log('업데이트 전 정보: ', data);
    fetch(url + `orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let message = '';

        if (status === '2') {
          message = '주문이 완료되었습니다!';
        }
        if (status === '3') {
          message = '주문이 취소되었습니다';
        }
        alert(message);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  useEffect(() => {
    if (orders.status === '0') {
      setDisabled(false);
    }
  }, [orders.status]);

  useEffect(() => {
    const areDifferent =
      orders.status !== initialOrders.status ||
      orders.total_price !== initialOrders.total_price;
  }, [orders, initialOrders]);

  useEffect(() => {}, [ordersProducts.quantity]);

  useEffect(() => {
    const totalPrice = ordersProducts.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, []);

    setOrders({
      ...orders,
      total_price: totalPrice,
    });
  }, [ordersProducts]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    if (value > 0) {
      setOrdersProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, [name]: value } : product
        )
      );
    }
  };

  const handlePaymentClick = () => {
    console.log('결제 버튼 클릭');
    setConfirmMessage('결제하시겠습니까? ');
    setStatus('2');
    setShowConfirm(true);
  };

  const handleEditClick = () => {
    console.log('수정 버튼 클릭');
    setConfirmMessage('수정하시겠습니까? ');
    setShowConfirm(true);
  };

  const handleCancelClick = () => {
    console.log('주문 취소 버튼 클릭');
    setStatus('3');
    setConfirmMessage('주문 취소하시겠습니까? ');
    setShowConfirm(true);
  };

  const handleRefundClick = () => {
    console.log('환불 버튼 클릭');
    setStatus('3');
    setConfirmMessage('환불하시겠습니까? ');
    setShowConfirm(true);
  };

  return (
    <div className={styles.ordersHistory}>
      <div className={styles.productInfo}>
        <label>주문상태: {orders.status_name}</label>
        <label>주문금액: {orders.total_price}</label>
        {ordersProducts.map((product) => (
          <div key={product.id}>
            <label>
              카테고리:
              <input
                type='text'
                value={product.category}
                name='category'
                disabled
              />
            </label>
            <label>
              상품 이름:
              <input
                type='text'
                value={product.product_name}
                name='product_name'
                disabled
              />
            </label>
            <label>
              상품 가격:
              <input
                type='number'
                value={product.price}
                name='price'
                disabled
              />
            </label>
            <label>
              상품 수량:
              <input
                type='number'
                value={product.quantity}
                name='quantity'
                disabled={disabled}
                onChange={(e) => handleChange(e, product.id)}
              />
            </label>
            <label>
              상품 설명:
              <input
                type='text'
                value={product.description}
                name='description'
                disabled
              />
            </label>
            <label>
              제조사 이름:
              <input
                type='text'
                value={product.manufacturer_name}
                name='manufacturer_name'
                disabled
              />
            </label>
            <label>
              제조사 주소:
              <input
                type='text'
                value={product.manufacturer_address}
                name='manufacturer_address'
                disabled
              />
            </label>
            <label>
              제조사 연락처:
              <input
                type='text'
                value={product.manufacturer_contact_info}
                name='manufacturer_contact_info'
                disabled
              />
            </label>
            <img src={product.image_url} alt='상품 이미지' />
          </div>
        ))}
      </div>
      <div className={styles.orderButton}>
        {orders.status === '0' && (
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
        {orders.status === '1' && (
          <button id='btn-cancel' onClick={handleCancelClick}>
            주문취소
          </button>
        )}
        {orders.status === '2' && (
          <button id='btn-refund' onClick={handleRefundClick}>
            환불
          </button>
        )}
        {orders.status === '3' && <></>}
      </div>
      {showConfirm && (
        <Confirm
          message={confirmMessage}
          onConfirm={() => {
            if (status) {
              updateOrdersStatus();
              navigate('/customer', { state: orders.customer_id });
            } else {
              updateOrders();
            }
            setShowConfirm(false);
          }}
          onCancel={() => {
            setShowConfirm(false);
          }}
        />
      )}
    </div>
  );
};

export default OrdersHistory;
