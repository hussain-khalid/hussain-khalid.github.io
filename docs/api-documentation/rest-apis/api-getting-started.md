---
sidebar_position: 2
title:  'Retrieve channel list'
description: Complete guide to get started with the Agora Video Calling RESTful API, including authentication, channel management, and real-time communication features.
hide_table_of_contents: true
---

import ApiMethod from '@site/src/components/ApiMethod';
import ApiCallout from '@site/src/components/ApiCallout';
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import Link from '@docusaurus/Link';

<ApiMethod
  summary={<>
    This RESTful API lets you retrieve the list of available Video SDK channels by page. In the URL, you can specify the page number and the number of URLs on the page. On response, it returns the list of channels on the specified page according to the set <code>page_size</code>.
  </>}
  leftIntro={<ApiEndpoint method="Get" url="https://api.agora.io/dev/v1/channel/{appid}" />}
  pathParameterTitle="Path parameters"
  pathParameters={[
    { name: 'appid', type: 'string', required: true, description: 'Your APP ID.' },
  ]}
  bodyParameterTitle="Body"
  bodyParameters={[
    { name: 'page_no', type: 'number', required: false, description: 'The page number that you want to query. The default value is 0, that is, the first page. The value of page_no cannot exceed (the total number of channels/the value of page_size - 1); otherwise, the specified page does not contain any channel.' },
    {name: 'page_size', type: 'number', required: false, description: 'The number of channels on a page. The value range is [1,500], and the default value is 100.'}
  ]}
  responseParametersTitle="Response"
  responseParameters={[
    { name: 'success', type: 'bool', description: (<ul><li><code>true</code>: Success.</li><li><code>false</code>: Reserved for future use.</li></ul>) },
    { name: 'data', type: 'object', description: 'Channel statistics, including the following fields:' ,  children: [
      { name: 'channels', type: 'Array',  children: [{name: 'channel_name', type: 'string', description: 'The channel name'}, {name: 'user_count', type: 'number', description: 'The total number of users in the channel.'}], description: 'The list of channels. This array contains multiple objects. Each object shows the information on a channel and includes the following fields:'},
      { name: 'total_size', type: 'number', description: ' The total number of channels under the specified project.' }
    ],  },
  ]}
  exampleTitle="Request example"
  exampleLanguage="bash"
  exampleCode={`curl --request GET \
    --url https://api.sd-rtn.com/dev/v1/channel/appid \
    --header 'Accept: application/json' \
    --header 'Authorization: '`}
  responseTitle="Response example"
  responseLanguage="json"
  responseCode={`{
    "success": true,
    "data": {
      "channels": [
        {
          "channel_name": "lkj144",
          "user_count": 3
        }
      ],
      "total_size": 1
    }
}`}
  rightIntro={<ApiCallout title="Authorization" accent="blue">This endpoint requires <strong><Link to="/docs/api-documentation/rest-apis/rest-authentication">Basic Auth</Link></strong>. Use your <code>Customer ID</code> as the username and <code>Customer Secret</code> as the password.</ApiCallout>}
/>



