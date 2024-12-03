import React, { useEffect, useState } from 'react';
import OrdersProducts from './OrdersProducts';
import { useNavigate } from 'react-router-dom';

const OrderDetail = ({ productList = [] }) => {
  console.log('주문화면 : ', productList);
  const navigate = useNavigate();
  const url = 'http://localhost:8081/order/';

  const [ordersPrice, setOrdersPrice] = useState(0);
  const [ordersProducts, setOrdersProducts] = useState([]);
  const handleCancel = () => {
    navigate('/');
  };

  // const handleOrder = (totalPrice, quantity) => {
  //   console.log('주문하기 클릭시 정보: ', totalPrice, quantity, product);
  //   // productsList에서 총 가격 추출해야함
  //   const data = {
  //     customer_id: 1, // 하드코딩
  //     totalPrice: totalPrice,
  //     ordersProducts: productList,
  //   };
  //   fetch(url + 'save', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log('success', data))
  //     .catch((error) => console.log(error));
  // };

  const handleOrdersProductsPrice = (ordersProductsPriceInfo) => {
    console.log("상품 수량 변동: ", ordersProductsPriceInfo);
    const isExist = ordersProducts.some((product) => product.id === ordersProductsPriceInfo.id);
    let temp = [];

    if(isExist) {
      // 업데이트
      temp = ordersProducts.map(product => product.id === ordersProductsPriceInfo.id ? ordersProductsPriceInfo : product)
    } else {
      // 삽입
      temp = [...ordersProducts, ordersProductsPriceInfo]
    }

    setOrdersProducts(temp)
  }

  const handleOrder = () => {
    const data = {
      customer_id: 1, // 하드코딩
      total_price: ordersPrice,
      ordersProducts: ordersProducts
    };

    fetch(url + 'save', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => console.log("success : ",data))
    .catch((error) => console.log("error : ",error))
  }

  useEffect(() => {
     console.log(ordersProducts);
    // 주문 총 가격 계산
    const testProducts = [
      {id: 1, price:1000, quantity: 10},
      {id: 2, price:2000, quantity: 10},
      {id: 3, price: 100, quantity: 50}
    ]
    const totalPrice = ordersProducts.reduce((accumulator, product) => {
        return accumulator + (product.price * product.quantity)
    }, 0)

    setOrdersPrice(totalPrice)
  }, [ordersProducts])
  /**
   * productList 를 받아와야함(상품이 주문에 여러개일수도 있어서)
   * 받아온 것만큼 맵 돌려서 상품 보여주고 수량 체크해서 총합을 여기서 계산해야함
   * 문제는 여기서 다시 상품 리스트 정보를 취합해야하는데 그 로직 찾아야함
   * 무슨말이냐면 받아올때는 리스트로 받아와서 뿌린후 각각 계산한 결과를
   * 이제 다시 삽입할때는 리스트로 보내야해서임
   * 
   * -> 구분을 어차피 key값으로 하는데 product마다 totalPrice 구해놓은뒤
   * map으로 키 돌려서 그 값 다 더한거 최종 주문에 반영하면 될듯
   */

  return (
    <div className='orderDetail'>
      <div className='orderForm'>
        {productList.map((product) => (
          <OrdersProducts
            key={product.id}
            product={product}
            onPriceChange={handleOrdersProductsPrice}
          />
        ))}
        <div className='totalPrice'>
          <p>주문 금액: {ordersPrice}</p>
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
