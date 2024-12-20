import React, { useEffect, useState } from 'react';
import { getUserIdFromRefreshToken } from '../../utils/jwtUtils';
import * as styles from './Payment.module.css';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';

const PaymentPage = () => {
  const amount = {
    currency: 'KRW',
    value: 50000,
  };

  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = getUserIdFromRefreshToken();
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const requestPayment = async () => {
    const response = await payment.requestPayment({
      method: 'CARD',
      amount,
      orderId: window.btoa(Math.random().toString()).slice(0, 20), // 고유 주문번호
      orderName: '토스 티셔츠 외 2건',
      successUrl: window.location.origin + '/payment/success', // 결제 요청이 성공하면 리다이렉트되는 URL
      failUrl: window.location.origin + '/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
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

  useEffect(async () => {
    const tossPayments = await loadTossPayments(clientKey);
    console.log(tossPayments);
    const payment = tossPayments.payment({
      customerKey,
    });
    console.log(payment);
    setPayment(payment);
  }, []);
  return (
    <div className={styles.PaymentPage}>
      <div className={styles.wrapper}>
        <div className={styles.box_section}>
          <h1>일반 결제</h1>
          <button
            id='CARD'
            className={`button2 ${
              selectedPaymentMethod === 'CARD' ? 'active' : ''
            }`}
            onClick={() => selectPaymentMethod('CARD')}
          >
            카드
          </button>

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
