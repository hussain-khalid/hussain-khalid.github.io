import React from 'react';
import styles from './styles.module.css';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export type ApiEndpointProps = {
  method: HttpMethod;
  url: string;
  copy?: boolean;
};

const ApiEndpoint: React.FC<ApiEndpointProps> = ({ method, url, copy = true }) => {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Best-effort copy; ignore errors
    }
  };

  return (
    <div className={styles.container}>
      <span className={`${styles.method} ${styles[method.toLowerCase()]}`}>{method}</span>
      <code className={styles.url}>{url}</code>
      {copy && (
        <button className={styles.copyBtn} onClick={onCopy} aria-label="Copy URL" title="Copy URL">
          ⧉
        </button>
      )}
    </div>
  );
};

export default ApiEndpoint;


