import React, { useState } from 'react';
import * as styles from './Navbar.module.css';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.dropdown} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <button className={styles.dropbtn}>카테고리</button>
                {dropdownOpen && (
                    <div className={styles.dropdownContent}>
                        <a href="#">전체</a>
                        <a href="#">식료품</a>
                        <a href="#">음료</a>
                        <a href="#">간식</a>
                    </div>
                )}
            </div>
            <div className={styles.searchContainer}>
                <select className={styles.categorySelect}>
                    <option value="전체">전체</option>
                    <option value="식료품">식료품</option>
                    <option value="음료">음료</option>
                    <option value="간식">간식</option>
                </select>
                <input type="text" placeholder="검색어를 입력하세요" className={styles.searchBar} />
            </div>
        </nav>
    );
};

export default Navbar;
