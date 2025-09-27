import React, { PropsWithChildren } from 'react';
import styles from './styles.module.css';

type ApiCalloutProps = {
  title: string;
  accent?: 'default' | 'blue' | 'green' | 'yellow' | 'red';
};

const ApiCallout: React.FC<PropsWithChildren<ApiCalloutProps>> = ({
  title,
  accent = 'blue',
  children,
}) => {
  const accentClass = styles[`accent_${accent}`] ?? styles.accent_blue;
  return (
    <div className={`${styles.container} ${accentClass}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default ApiCallout;


