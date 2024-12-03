import React, { useState } from "react";
import * as styles from './Customer.module.css';
import Profile from "../../components/Customer/Profile";
import OrdersHistory from "../../components/Customer/OrdersHistory";

const CustomerPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [customerId, setCustomerId] = useState(1);

    const renderContent = () => {    
        switch (activeTab) {
        case 'profile':
            return <Profile />;
        case 'orders':
            return <OrdersHistory customerId={customerId} />; // 예: customerId를 prop으로 전달
        default:
            return <Profile />;
    }
  };

  return (
    <div className={styles.customerPage}>
      <div className={styles.tabNavigation}>
        <button
          className={activeTab === 'profile' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('profile')}
        >
          프로필
        </button>
        <button
          className={activeTab === 'orders' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('orders')}
        >
          주문 내역
        </button>
      </div>
      <div className={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerPage;
