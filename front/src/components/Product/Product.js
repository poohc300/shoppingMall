import React from "react";


const Product = ({ product = {} }) => {

    const handleClick = () => {
        // product id를 쿼리스트링으로 해서 상세 검색 화면 출력
    }
    return (
        <div className="product" tabIndex={0} onClick={handleClick}>
            <img src={product.image_url} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    )
}
export default Product;