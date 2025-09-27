import React from 'react';
import styles from './styles.module.css';

type ApiField = {
  name: string;
  type?: string;
  required?: boolean;
  description?: string;
  children?: ApiField[];
};

type ApiMethodProps = {
  title: string;
  summary?: string;
  badge?: string;
  fieldsTitle?: string;
  fields?: ApiField[];
  exampleTitle?: string;
  exampleCode?: string;
  exampleLanguage?: 'json' | 'ts' | 'js' | 'bash' | 'http' | string;
  responseTitle?: string;
  responseCode?: string;
  responseLanguage?: 'json' | 'ts' | 'js' | 'bash' | 'http' | string;
  rightIntro?: React.ReactNode;
};

const CodeBlock: React.FC<{ code?: string; language?: string }>
  = ({ code, language = 'json' }) => {
  if (!code) return null;
  return (
    <pre className={styles.code} data-language={language}>
      <code>{code}</code>
    </pre>
  );
};

const FieldRow: React.FC<{ field: ApiField }> = ({ field }) => {
  return (
    <li className={styles.fieldRow}>
      <div className={styles.fieldHeader}>
        <span className={styles.fieldName}>{field.name}</span>
        {field.type && <span className={styles.fieldType}>{field.type}</span>}
        {field.required && <span className={styles.fieldReq}>required</span>}
      </div>
      {field.description && (
        <div className={styles.fieldDesc}>{field.description}</div>
      )}
      {field.children && field.children.length > 0 && (
        <ul className={styles.fieldChildren}>
          {field.children.map((child) => (
            <FieldRow key={`${field.name}.${child.name}`} field={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const ApiMethod: React.FC<ApiMethodProps> = ({
  title,
  summary,
  badge,
  fieldsTitle = 'Parameters',
  fields = [],
  exampleTitle = 'Example',
  exampleCode,
  exampleLanguage = 'json',
  responseTitle = 'Response',
  responseCode,
  responseLanguage = 'json',
  rightIntro,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
        {summary && <p className={styles.summary}>{summary}</p>}

        {fields && fields.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>{fieldsTitle}</div>
            <ul className={styles.fieldList}>
              {fields.map((f) => (
                <FieldRow key={f.name} field={f} />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.right}>
        {rightIntro && (
          <div className={styles.rightIntro}>{rightIntro}</div>
        )}
        {exampleCode && (
          <div className={styles.rightBox}>
            <div className={styles.exampleHeader}>{exampleTitle}</div>
            <CodeBlock code={exampleCode} language={exampleLanguage} />
          </div>
        )}
        {responseCode && (
          <div className={styles.rightBox}>
            <div className={styles.exampleHeader}>{responseTitle}</div>
            <CodeBlock code={responseCode} language={responseLanguage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiMethod;


