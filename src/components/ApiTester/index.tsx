import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';

interface ApiParam {
  name: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
  description: string;
  defaultValue?: string;
}

interface ApiTesterProps {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  title: string;
  description?: string;
  parameters?: ApiParam[];
  headers?: { [key: string]: string };
  baseUrl?: string;
  sampleResponse?: object;
}

export default function ApiTester({
  endpoint,
  method,
  title,
  description,
  parameters = [],
  headers = {},
  baseUrl = 'https://api.agora.io/v1',
  sampleResponse = {}
}: ApiTesterProps): JSX.Element {
  const [paramValues, setParamValues] = useState<{ [key: string]: string }>({});
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleParamChange = (paramName: string, value: string) => {
    setParamValues(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const generateCurlCommand = () => {
    let curl = `curl -X ${method} "${baseUrl}${endpoint}"`;

    // Add headers
    Object.entries(headers).forEach(([key, value]) => {
      curl += ` \\\n  -H "${key}: ${value}"`;
    });

    // Add content type for POST/PUT
    if (['POST', 'PUT'].includes(method)) {
      curl += ` \\\n  -H "Content-Type: application/json"`;
    }

    // Add data for POST/PUT
    if (['POST', 'PUT'].includes(method) && Object.keys(paramValues).length > 0) {
      const data = JSON.stringify(paramValues, null, 2);
      curl += ` \\\n  -d '${data}'`;
    }

    return curl;
  };

  const generateJavaScriptCode = () => {
    const fetchOptions: any = {
      method,
      headers: {
        ...headers,
        ...((['POST', 'PUT'].includes(method)) && { 'Content-Type': 'application/json' })
      }
    };

    if (['POST', 'PUT'].includes(method) && Object.keys(paramValues).length > 0) {
      fetchOptions.body = JSON.stringify(paramValues, null, 2);
    }

    return `fetch('${baseUrl}${endpoint}', ${JSON.stringify(fetchOptions, null, 2)})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
  };

  const generatePythonCode = () => {
    let code = `import requests\nimport json\n\n`;
    code += `url = "${baseUrl}${endpoint}"\n`;

    if (Object.keys(headers).length > 0) {
      code += `headers = ${JSON.stringify(headers, null, 2)}\n`;
    }

    if (['POST', 'PUT'].includes(method) && Object.keys(paramValues).length > 0) {
      code += `data = ${JSON.stringify(paramValues, null, 2)}\n\n`;
      code += `response = requests.${method.toLowerCase()}(url, headers=headers, json=data)\n`;
    } else {
      code += `\nresponse = requests.${method.toLowerCase()}(url${Object.keys(headers).length > 0 ? ', headers=headers' : ''})\n`;
    }

    code += `print(response.json())`;
    return code;
  };

  const handleTestApi = async () => {
    setIsLoading(true);
    setShowResponse(true);

    // Simulate API call (in real implementation, you'd make actual HTTP request)
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        timestamp: new Date().toISOString(),
        data: sampleResponse,
        request: {
          method,
          endpoint,
          parameters: paramValues
        }
      };

      setResponse(JSON.stringify(mockResponse, null, 2));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.apiTester}>
      <div className={styles.header}>
        <div className={styles.methodBadge}>
          <span className={`${styles.method} ${styles[method.toLowerCase()]}`}>
            {method}
          </span>
          <code className={styles.endpoint}>{endpoint}</code>
        </div>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          {parameters.length > 0 && (
            <div className={styles.parametersSection}>
              <h4>Parameters</h4>
              {parameters.map((param) => (
                <div key={param.name} className={styles.parameterGroup}>
                  <label className={styles.paramLabel}>
                    {param.name}
                    {param.required && <span className={styles.required}>*</span>}
                  </label>
                  <p className={styles.paramDescription}>{param.description}</p>
                  <input
                    type={param.type === 'number' ? 'number' : 'text'}
                    className={styles.paramInput}
                    placeholder={param.defaultValue || `Enter ${param.name}...`}
                    value={paramValues[param.name] || ''}
                    onChange={(e) => handleParamChange(param.name, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          <button
            className={styles.testButton}
            onClick={handleTestApi}
            disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Test API'}
          </button>
        </div>

        <div className={styles.rightPanel}>
          <Tabs>
            <TabItem value="curl" label="cURL" default>
              <CodeBlock language="bash">
                {generateCurlCommand()}
              </CodeBlock>
            </TabItem>
            <TabItem value="javascript" label="JavaScript">
              <CodeBlock language="javascript">
                {generateJavaScriptCode()}
              </CodeBlock>
            </TabItem>
            <TabItem value="python" label="Python">
              <CodeBlock language="python">
                {generatePythonCode()}
              </CodeBlock>
            </TabItem>
          </Tabs>

          {showResponse && (
            <div className={styles.responseSection}>
              <h4>Response</h4>
              {isLoading ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <span>Making API request...</span>
                </div>
              ) : (
                <CodeBlock language="json">
                  {response}
                </CodeBlock>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}