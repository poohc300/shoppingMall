import React, { useState } from 'react';
import * as styles from './Navbar.module.css';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onSearch = (f) => f }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query) {
      handleSearch();
    }
  };

  return (
    <nav className={styles.nav}>
      <div
        className={styles.dropdown}
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        {/* <button className={styles.dropbtn}>카테고리</button> */}
        {/* {dropdownOpen && (
          <div className={styles.dropdownContent}>
            <a href='#'>전체</a>
            <a href='#'>식료품</a>
            <a href='#'>음료</a>
            <a href='#'>간식</a>
          </div>
        )} */}
      </div>
      <div className={styles.searchContainer}>
        <select className={styles.categorySelect}>
          <option value='전체'>전체</option>
          <option value='식품'>식품</option>
          <option value='음료'>의류</option>
          <option value='간식'>도서</option>
        </select>
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          className={styles.searchBar}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FaSearch className={styles.searchIcon} onClick={handleSearch} />{' '}
      </div>
    </nav>
  );
};

export default Navbar;
