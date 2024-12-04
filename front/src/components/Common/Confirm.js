import React from 'react';
import * as styles from './Confirm.module.css';

const Confirm = ({
  message = '',
  onConfirm = (f) => f,
  onCancel = (f) => f,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.confirmBox}>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onConfirm}>
            확인
          </button>
          <button className={styles.button} onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default Confirm;
