import React, { useState } from 'react';
import * as styles from './CustomerPage.module.css';
import Profile from '../../components/Customer/Profile';
import OrdersHistoryTable from '../../components/Customer/OrdersHistoryTable';

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [customerId, setCustomerId] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersHistoryTable customerId={customerId} />; // 예: customerId를 prop으로 전달
      case 'profile':
        return <Profile />;
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
        {/* <button
          className={activeTab === 'profile' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('profile')}
        >
          프로필
        </button> */}
      </div>
      <div className={styles.tabContent}>{renderContent()}</div>
    </div>
  );
};

export default CustomerPage;
