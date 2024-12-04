import React from 'react';
import * as styles from './Tooltip.module.css';

const Tooltip = ({ text = '', position = 'top', children }) => {
  const renderTooltip = (position) => {
    switch (position) {
      case 'left':
        return styles.tooltipLeft;
      case 'right':
        return styles.tooltipRight;
      case 'bottom':
        return styles.tooltipBottom;
      default:
        return styles.tooltipTop;
    }
  };
  const tooltipClass = `${styles.tooltipText} ${renderTooltip(position)}`;
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={tooltipClass}>{text}</span>
    </div>
  );
};
export default Tooltip;
