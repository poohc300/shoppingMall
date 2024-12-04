import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './OrdersHistory.module.css';
import moment from 'moment';
import Tooltip from '../Common/Tooltip';

const OrdersHistoryTable = ({ customerId = 0 }) => {
  console.log('주문내역 테이블: ', customerId);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const url = 'http://localhost:8081/';

  const handleOnClick = (order_id) => {
    navigate(`/customer/ordersHistory/${order_id}`, { state: order_id });
  };

  useEffect(() => {
    fetch(url + `orders/customer/${customerId}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, [customerId]);

  /**
   * 주문내역 테이블에서 주문 테이블 데이터만 가져와서 보여주고
   * 상품 목록 정도는 조회해서 가져올 수 있으면 보여준뒤
   * 테이블을 클릭하면 전체 상품 내역을 보여주는게 나은듯
   *
   * 쿼리는 두번 날려서 가져와야할듯
   * 처음엔 주문 테이블 정보
   * 그다음엔 각 order_id로 반복문 날려서 쿼리 날려서 리스트로 받아오기
   * API 좀 수정해야할듯
   *
   * 앞으로 남은 기능
   *
   * 크게 크게 보면 프로필, 결제, 배송 그리고 주문에서 결제에서 배송까지 상태들 관리
   * 주문생성하면 주문대기가 되고 결제화면 진입하면 결제대기 되고 주문은 주문중 되고
   * 결제완료하면 주문완료되고
   * 결제완료되면 배송대기가되고
   * 간략히 배송구현해서 배송상품 보내면 배송중되고 주문완료되나 이 로직좀 프로세스 정리해봐야겠음
   * 쇼핑몰에서 핵심이 이 로직 같으니
   *
   * 작게 보면 주문시 재고반영, 상품 이미지 업로드, 상품 이미지 크기 조절
   * 전체적인 css 이상함,
   */
  return (
    <div className={styles.ordersHistory}>
      <p>주문 내역 테이블</p>

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
          {orders.map((order) => (
            <React.Fragment key={order.order_id}>
              <tr onClick={() => handleOnClick(order.order_id)}>
                <td>{order.order_id}</td>
                <td>{order.total_price}</td>
                <td>{order.status}</td>
                <td>
                  {moment(order.created_at).format('YYYY-MM-DD A hh:mm ')}
                </td>
              </tr>
              {/* {order.ordersProducts && order.ordersProducts.length > 0 && (
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
                            )} */}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersHistoryTable;
