import React from 'react';
import ThemedCodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

type ApiField = {
  name: string;
  type?: string;
  required?: boolean;
  description?: React.ReactNode;
  children?: ApiField[];
};

type ApiMethodProps = {
  title: string;
  summary?: React.ReactNode;
  badge?: string;
  leftIntro?: React.ReactNode;
  // Support both spellings for convenience
  pathParametersTitle?: string;
  pathParameterTitle?: string;
  pathParameters?: ApiField[];
  bodyParametersTitle?: string;
  bodyParameterTitle?: string;
  bodyParameters?: ApiField[],
  responseParametersTitle?: string;
  responseParameterTitle?: string;
  responseParameters?: ApiField[];
  exampleTitle?: string;
  exampleCode?: string;
  exampleLanguage?: 'json' | 'ts' | 'js' | 'bash' | 'http' | string;
  responseTitle?: string;
  responseCode?: string;
  responseLanguage?: 'json' | 'ts' | 'js' | 'bash' | 'http' | string;
  rightIntro?: React.ReactNode;
};

const CodeBlock: React.FC<{ code?: string; language?: string }>
  = ({ code, language }) => {
  if (!code) return null;
  return (
    <ThemedCodeBlock language={language} className={styles.codeBlock}>
      {code}
    </ThemedCodeBlock>
  );
};

const FieldRow: React.FC<{ field: ApiField }> = ({ field }) => {
  return (
    <li className={styles.fieldRow}>
      <div className={styles.fieldHeader}>
        <span className={styles.fieldName}>{field.name}</span>
        <span className={styles.fieldType}>{field.type ?? ''}</span>
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
  summary,
  leftIntro,
  pathParametersTitle,
  pathParameterTitle,
  pathParameters = [],
  bodyParametersTitle,
  bodyParameterTitle,
  bodyParameters = [],
  responseParametersTitle,
  responseParameterTitle,
  responseParameters = [],
  exampleTitle = 'Example',
  exampleCode,
  exampleLanguage = 'json',
  responseTitle = 'Response',
  responseCode,
  responseLanguage = 'json',
  rightIntro,
}) => {
  const computedPathTitle = pathParameterTitle ?? pathParametersTitle ?? 'Path parameters';
  const computedBodyTitle = bodyParameterTitle ?? bodyParametersTitle ?? 'Body';
  const computedRespParamsTitle = responseParameterTitle ?? responseParametersTitle ?? 'Response parameters';
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {leftIntro && (
          <div className={styles.leftIntro}>{leftIntro}</div>
        )}
        {summary && <p className={styles.summary}>{summary}</p>}

        {pathParameters && pathParameters.length > 0 && (
          <details className={styles.section} open>
            <summary className={styles.sectionTitle}>{computedPathTitle}</summary>
            <ul className={styles.fieldList}>
              {pathParameters.map((f) => (
                <FieldRow key={f.name} field={f} />
              ))}
            </ul>
          </details>
        )}
        {bodyParameters && bodyParameters.length > 0 && (
          <details className={styles.section} open>
            <summary className={styles.sectionTitle}>{computedBodyTitle}</summary>
            <ul className={styles.fieldList}>
              {bodyParameters.map((f) => (
                <FieldRow key={f.name} field={f} />
              ))}
            </ul>
          </details>
        )}
        {responseParameters && responseParameters.length > 0 && (
          <details className={styles.section} open>
            <summary className={styles.sectionTitle}>{computedRespParamsTitle}</summary>
            <ul className={styles.fieldList}>
              {responseParameters.map((f) => (
                <FieldRow key={f.name} field={f} />
              ))}
            </ul>
          </details>
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


