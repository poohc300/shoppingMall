import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Payment.module.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const url = 'http://localhost:8081/payment/';

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };
    console.log('searchParams: ', requestData);

    fetch(url + 'confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setResponseData(data));
  }, [searchParams]);

  return (
    <div className={styles.PaymentPage}>
      <div className={styles.box_section}>
        <img
          width='100px'
          src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png'
          alt='결제 완료'
        />
        <h2>결제를 완료했어요</h2>
        <div className={styles.typography_p} style={{ marginTop: '50px' }}>
          <div className={`${styles.p_grid_col} ${styles.text_left}`}>
            <b>결제금액</b>
          </div>
          <div
            className={`${styles.p_grid_col} ${styles.text_right}`}
            id='amount'
          >
            {`${Number(searchParams.get('amount')).toLocaleString()}원`}
          </div>
        </div>
        <div className={styles.typography_p} style={{ marginTop: '10px' }}>
          <div className={`${styles.p_grid_col} ${styles.text_left}`}>
            <b>주문번호</b>
          </div>
          <div
            className={`${styles.p_grid_col} ${styles.text_right}`}
            id='orderId'
          >
            {`${searchParams.get('orderId')}`}
          </div>
        </div>
        <div className={styles.typography_p} style={{ marginTop: '10px' }}>
          <div className={`${styles.p_grid_col} ${styles.text_left}`}>
            <b>paymentKey</b>
          </div>
          <div
            className={`${styles.p_grid_col} ${styles.text_right}`}
            id='paymentKey'
            style={{ whiteSpace: 'initial', width: '250px' }}
          >
            {`${searchParams.get('paymentKey')}`}
          </div>
        </div>
      </div>
      <div className={styles.box_section} style={{ textAlign: 'left' }}>
        <b>Response Data :</b>
        <div id='response' style={{ whiteSpace: 'initial' }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
