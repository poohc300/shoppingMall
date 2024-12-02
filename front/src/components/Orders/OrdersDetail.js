import React, { useState } from 'react';
import OrdersProducts from './OrdersProducts';
import { useNavigate } from 'react-router-dom';

const OrderDetail = ({ productList = [] }) => {
  console.log('주문화면 : ', productList);
  const navigate = useNavigate();
  const url = 'http://localhost:8081/order/';

  const [totalPrice, setTotalPrice] = useState(0);
  const handleCancel = () => {
    navigate('/');
  };

  const handleOrder = (totalPrice, quantity) => {
    console.log('주문하기 클릭시 정보: ', totalPrice, quantity, product);
    // productsList에서 총 가격 추출해야함
    const data = {
      customer_id: 1, // 하드코딩
      totalPrice: totalPrice,
      ordersProducts: productList,
    };
    fetch(url + 'save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log('success', data))
      .catch((error) => console.log(error));
  };
  /**
   * productList 를 받아와야함(상품이 주문에 여러개일수도 있어서)
   * 받아온 것만큼 맵 돌려서 상품 보여주고 수량 체크해서 총합을 여기서 계산해야함
   * 문제는 여기서 다시 상품 리스트 정보를 취합해야하는데 그 로직 찾아야함
   * 무슨말이냐면 받아올때는 리스트로 받아와서 뿌린후 각각 계산한 결과를
   * 이제 다시 삽입할때는 리스트로 보내야해서임
   */

  return (
    <div className='orderDetail'>
      <div className='orderForm'>
        {productList.map((product) => (
          <OrdersProducts
            key={product.id}
            product={product}
            onCancel={handleCancel}
            onPlaceOrder={handleOrder}
          />
        ))}
        <div className='totalPrice'>
          <p>금액: {totalPrice}</p>
        </div>
        <div className='orderButton'>
          <button onClick={handleOrder}>주문하기</button>
          <button onClick={handleCancel}>주문취소</button>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
