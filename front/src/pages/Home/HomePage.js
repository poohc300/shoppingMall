import React, { useState, useCallback, useEffect } from 'react';
import * as styles from './HomePage.module.css';
import ProductList from '../../components/Product/ProductList';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const api = 'http://localhost:8081/';
  const { query, category } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);

  const fetchRecommendProducts = useCallback(() => {
    fetch(api + 'products/all')
      .then((response) => response.json())
      .then((data) => setRecommendProducts(data))
      .catch((error) => {
        console.error(error);
      });
  }, [api]);

  const fetchProducts = useCallback(() => {
    if (query) {
      fetch(api + `products/search?query=${query}&category=${category || ''}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => {
          console.error(error);
        });
    } else {
      setProducts([]);
      fetchRecommendProducts();
    }
  }, [query, category, fetchRecommendProducts]);

  const handleClick = (e) => {
    const action = e.target.id;
    sortProductList(action);
  };

  const sortProductList = (action) => {
    let temp = [...products];
    console.log(temp);
    if (action === 'latest') {
      temp = temp.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (action === 'lowest') {
      temp = temp.sort((a, b) => a.price - b.price);
    } else if (action === 'highest') {
      temp = temp.sort((a, b) => b.price - a.price);
    }
    setProducts(temp);
  };

  useEffect(() => {
    fetchRecommendProducts();
  }, [fetchRecommendProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={styles.homePage}>
      {products.length > 0 ? (
        <div>
          <div className='searchResult'>
            검색결과: {query} {products.length || 0}개
          </div>
          <div className='sortButton'>
            <button id='latest' onClick={handleClick}>
              최신순
            </button>
            <button id='lowest' onClick={handleClick}>
              낮은가격순
            </button>
            <button id='highest' onClick={handleClick}>
              높은가격순
            </button>
          </div>
        </div>
      ) : null}

      {products.length > 0 ? (
        <ProductList products={products} />
      ) : query ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <ProductList products={recommendProducts} />
      )}
    </div>
  );
};

export default HomePage;
