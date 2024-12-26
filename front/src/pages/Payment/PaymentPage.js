import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserIdFromRefreshToken } from '../../utils/jwtUtils';
import * as styles from './Payment.module.css';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';

const PaymentPage = () => {
  const location = useLocation();
  const [orderInfo, setOrderInfo] = useState('');

  console.log('결제페이지 주문 정보: ', location.state);
  const amount = {
    currency: 'KRW',
    value: 50000,
  };

  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = getUserIdFromRefreshToken();
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const selectPaymentMethod = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const convertPaymentMethod = (method) => {
    console.log('결제수단: ', method);
    if (method === '카드결제') {
      return 'CARD';
    } else if (method === '계좌이체') {
      return 'TRANSFER';
    } else if (method === '가상계좌') {
      return 'VIRTUAL_ACCOUNT';
    } else if (method === '휴대폰결제') {
      return 'MOBILE_PHONE';
    } else {
      return null;
    }
  };

  const getOrderName = () => {
    let result = null;
    if (orderInfo && orderInfo.ordersProducts) {
      if (orderInfo.ordersProducts.length > 1) {
        const name = orderInfo.ordersProducts[0].product_name;
        const count = orderInfo.ordersProducts.length;
        result = ` ${name} 외 ${count}건`;
      } else {
        result = orderInfo.ordersProducts[0].product_name;
      }
    }
    return result;
  };

  const getAmount = () => {
    let amount = {
      currency: 'KRW',
      value: Number(orderInfo.total_price),
    };
    return amount;
  };

  const requestPayment = async () => {
    const paymetMethod = convertPaymentMethod(selectedPaymentMethod);
    console.log(paymetMethod);
    if (paymetMethod) {
      const response = await payment.requestPayment({
        method: paymetMethod,
        amount: getAmount(),
        orderId: orderInfo.order_id, // 고유 주문번호
        orderName: getOrderName(),
        successUrl: window.location.origin + '/payment/success', // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + '/payment/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: 'poohc300@gmail.com',
        customerName: '김토스',
        // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
        customerMobilePhone: '01066598588',
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
      console.log(response);
    }
  };

  //   async function requestBillingAuth() {
  //     await payment.requestBillingAuth({
  //       method: 'CARD', // 자동결제(빌링)은 카드만 지원합니다
  //       successUrl: window.location.origin + '/payment/billing', // 요청이 성공하면 리다이렉트되는 URL
  //       failUrl: window.location.origin + '/fail', // 요청이 실패하면 리다이렉트되는 URL
  //       customerEmail: 'customer123@gmail.com',
  //       customerName: '김토스',
  //     });
  //   }

  const connectToss = async () => {
    const tossPayments = await loadTossPayments(clientKey);
    console.log(tossPayments);
    const payment = tossPayments.payment({
      customerKey,
    });
    console.log(payment);
    setPayment(payment);
  };

  useEffect(() => {
    connectToss();
    setOrderInfo(location.state);
  }, []);

  return (
    <div className={styles.PaymentPage}>
      <div className={styles.wrapper}>
        <div className={styles.box_section}>
          <h1>일반 결제</h1>

          <div className={styles.paymentMethod}>
            {['카드결제', '계좌이체', '가상계좌', '휴대폰결제'].map(
              (method) => (
                <label key={method} className={styles.radioLabel}>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value={method}
                    checked={selectedPaymentMethod === method}
                    onChange={selectPaymentMethod}
                    disabled={method !== '카드결제'}
                  />
                  {method}
                </label>
              )
            )}
          </div>
          <button className={styles.button} onClick={requestPayment}>
            결제하기
          </button>
        </div>
        {/* <div className={styles.box_section}>
          <h1>정기 결제</h1>
          <button className={styles.button} onClick={requestBillingAuth}>
            빌링키 발급하기
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentPage;
