import React, { useState } from 'react';
import * as styles from './CustomerPage.module.css';
import OrdersHistoryTable from '../../components/Customer/OrdersHistoryTable';
import { getUserIdFromRefreshToken } from '../../utils/jwtUtils';

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const renderContent = () => {
    const customerId = getUserIdFromRefreshToken();
    switch (activeTab) {
      case 'orders':
        return <OrdersHistoryTable customerId={customerId} />; // 예: customerId를 prop으로 전달
      case 'profile':
        return <></>;
    }
  };

  return (
    <div className={styles.customerPage}>
      <div className={styles.tabNavigation}>
        <button
          className={activeTab === 'orders' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('orders')}
        >
          주문 내역
        </button>
      </div>
      <div className={styles.tabContent}>{renderContent()}</div>
    </div>
  );
};

export default CustomerPage;
