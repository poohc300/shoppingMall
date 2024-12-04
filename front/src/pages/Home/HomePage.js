import React, { useState, useCallback, useEffect } from 'react';
import * as styles from './HomePage.module.css';
import ProductList from '../../components/Product/ProductList';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const api = 'http://localhost:8081/';
  const searchQuery = useOutletContext();
  const [products, setProducts] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);

  const fetchRecommendProducts = () => {
    if (!searchQuery) {
      fetch(api + 'products/all')
        .then((response) => response.json())
        .then((data) => setRecommendProducts(data))
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const fetchProducts = useCallback(() => {
    if (searchQuery) {
      console.log('검색어로 조회: ', searchQuery);
      fetch(api + `products/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => {
          console.error(error);
        });
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchRecommendProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /**
   * 검색어 판별 로직
   *
   * 검색어가 상품이름으로 검색되었는지, 회사이름으로 검색되었는지 판별해야함
   * 예를 들어 회사이름으로 검색할 때 특정 접수사를 사용하면 되려나
   *
   * 백엔드에서 검색어를 기반으로 products 조회
   */

  return (
    <div className={styles.homePage}>
      {products.length > 0 ? (
        <div className='searchResult'>
          검색결과: {searchQuery} {products.length || 0}개
        </div>
      ) : null}

      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <ProductList products={recommendProducts} />
      )}
    </div>
  );
};
export default HomePage;
