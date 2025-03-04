import React, { useState } from 'react';
import * as styles from './Navbar.module.css';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ onSearch = (f) => f }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    onSearch(query, category);
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
      ></div>
      <div className={styles.searchContainer}>
        <select
          className={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>전체</option>
          <option value='FOOD'>식품</option>
          <option value='ELECT'>전자제품</option>
        </select>
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          className={styles.searchBar}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FaSearch className={styles.searchIcon} onClick={handleSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
