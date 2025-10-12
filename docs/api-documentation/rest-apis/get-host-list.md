---
sidebar_position: 3
title:  'Retrieve host list'
description: Complete guide to get started with the Agora Video Calling RESTful API, including authentication, channel management, and real-time communication features.
hide_table_of_contents: true
---

import ApiMethod from '@site/src/components/ApiMethod';
import ApiCallout from '@site/src/components/ApiCallout';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import Link from '@docusaurus/Link';

<ApiMethod
  summary={<>
    This API is only used in the live broadcast profile. Users in the same channel must use the same profile. Otherwise, the query results may be inaccurate.
    This API and the query user status API can both be used to synchronize the online status of hosts. Compared to the query user status API, this API requires a lower call frequency and has a higher efficiency. Therefore, Agora recommends using this API for this purpose.</>}
  leftIntro={<ApiEndpoint method="Get" url="https://api.agora.io/dev/v1/channel/user/{appid}/{channelName}/hosts_only" />}
  pathParameterTitle="Path parameters"
  pathParameters={[
    { name: 'appid', type: 'string', required: true, description: 'Your APP ID.' },
    { name: 'channelName', tyoe: 'string', required: true, description: 'The channel name'}
  ]}
  bodyParameterTitle="Body"
  bodyParameters={[
    { name: 'page_no', type: 'number', required: false, description: 'The page number that you want to query. The default value is 0, that is, the first page. The value of page_no cannot exceed (the total number of channels/the value of page_size - 1); otherwise, the specified page does not contain any channel.' },
    {name: 'page_size', type: 'number', required: false, description: 'The number of channels on a page. The value range is [1,500], and the default value is 100.'}
  ]}
  responseParametersTitle="Response"
  responseParameters={[
    { name: 'success', type: 'bool', description: (<ul><li><code>true</code>: Success.</li><li><code>false</code>: Reserved for future use.</li></ul>) },
    { name: `data`, type: 'object', children: [{ name: 'channel_exist', type: 'Boolean', description: (<ul><li><code>true</code>: Success.</li><li><code>false</code>: Reserved for future use.</li></ul>)}, { name: 'mode', type: 'number', description: (<ul><li><code>1</code>: The <code>COMMUNICATION</code> profile.</li><li><code>2</code>: The <code>LIVE_BROADCASTING</code> profile.</li></ul>)}, { name: 'broadcasters', type: 'Array', description: 'User IDs of all hosts in the channel. This field is returned only when mode is `2`' }], description: 'User information, including the following fields:'},
  ]}
  exampleTitle="Request example"
  exampleLanguage="bash"
  exampleCode={`curl --request GET \
  --url https://api.sd-rtn.com/dev/v1/channel/user/appid/channelName/hosts_only \
  --header 'Accept: application/json' \
  --header 'Authorization: Basic 123'`}
    responseTitle="Response example"
  responseLanguage="json"
  responseCode={`{
    "success": true,
    "data": {
      "channel_exist": true,
      "mode": 2,
      "broadcasters": [
        574332,
        1347839
      ]
    }
  }`}
  rightIntro={<ApiCallout title="Authorization" accent="blue">This endpoint requires <strong><Link to="/docs/api-documentation/rest-apis/rest-authentication">Basic Auth</Link></strong>. Use your <code>Customer ID</code> as the username and <code>Customer Secret</code> as the password.</ApiCallout>}
/>



