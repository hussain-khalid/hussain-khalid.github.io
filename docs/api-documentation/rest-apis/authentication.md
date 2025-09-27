---
sidebar_position: 1
title: Authentication for REST APIs
description: Complete guide to get started with the Agora Video Calling REST API, including authentication, channel management, and real-time communication features.
hide_table_of_contents: true
---

# REST APIs for Video Calling

This guide shows you how to start using the Agora REST APIs to manage video communication channels, recording, and user sessions.

## Overview

The Agora REST API provides programmatic access to access video calling channels, control recording sessions, and retrieve usage analytics. The API follows REST conventions and returns JSON-formatted responses.

**Base URL**: `https://api.agora.io/v1/`

## Authentication

### Authentication methods

Agora REST API supports multiple authentication methods:

#### Customer ID and Customer Secret
The primary authentication method using your Agora project credentials.

```bash
curl -X POST https://api.agora.io/v1/projects/YOUR_PROJECT_ID/rtc/channels \
  -H "Content-Type: application/json" \
  -u "YOUR_CUSTOMER_ID:YOUR_CUSTOMER_SECRET" \
  -d '{"channel": "test-channel", "uid": "12345"}'
```

#### App ID and App Certificate (Token-based)
For enhanced security in production environments.

```bash
# Generate token first, then use in requests
curl -X GET https://api.agora.io/v1/projects/YOUR_APP_ID/channels/test-channel \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get your credentials

To get your Agora API credentials, complete the following steps:

1. Log in to the Agora Console at [console.agora.io](https://console.agora.io).
2. Go to **Project Management**.
3. Create a new project or select an existing one.
4. Copy your **App ID**, **Customer ID**, and **Customer Secret**.

:::warning Security note
Keep your credentials secure and never expose them in client-side code. Use server-side proxy endpoints for production applications.
:::

## Make your first request

To get started, create a video calling channel using the Agora REST API:

### Create a channel

The interactive API tester below allows you to test the channel creation endpoint with your own credentials. Similar to ChatGPT's API playground, you can modify parameters, see live responses, and copy working code in multiple programming languages.

import ApiMethod from '@site/src/components/ApiMethod';
import ApiCallout from '@site/src/components/ApiCallout';


### API method format example

<ApiMethod
  title="conversation.item.create"
  summary="Add a new item to the conversation's context, including messages, function calls, and call results."
  badge="OBJECT"
  fieldsTitle="Fields"
  fields={[
    { name: 'type', type: 'string', required: true, description: 'Must be "conversation.item.create".' },
    { name: 'event_id', type: 'string', description: 'Optional client-generated ID to identify this event.' },
    { name: 'previous_item_id', type: 'string', description: 'ID of the item to insert after; if unset, the new item is appended.' },
    { name: 'item', type: 'object', required: true, description: 'A single item within a Realtime conversation.', children: [
      { name: 'type', type: 'string', required: true, description: 'For example, "message".' },
      { name: 'role', type: 'string', description: 'Message role, e.g., "user" or "assistant".' },
      { name: 'content', type: 'array', description: 'Message content parts.' }
    ] }
  ]}
  exampleTitle="Example"
  exampleLanguage="json"
  exampleCode={`{
    "type": "conversation.item.create",
    "item": {
      "type": "message",
      "role": "user",
      "content": [
        { "type": "input_text", "text": "hi" }
      ]
    },
    "event_id": "b904fba0-0ec4-40af-8bbb-f908a9b26793"
}`}
  responseTitle="Response"
  responseLanguage="json"
  responseCode={`{
    "code": 200,
    "message": "success",
    "data": {
      "resourceId": "nRHBbXZvHBjmvRezPqUe8g==",
      "sid": "2d8c8a7d-f7b3-4c5a-9b2e-8d7f6a5b4c3e",
      "serverResponse": {
        "status": 1,
        "fileList": []
      }
    }
}`}
  rightIntro={<ApiCallout title="Authorization" accent="blue">This endpoint requires <strong>Basic Auth</strong>. Use your <code>Customer ID</code> as the username and <code>Customer Secret</code> as the password.</ApiCallout>}
/>

### Request

```bash
curl -X POST https://api.agora.io/v1/projects/YOUR_PROJECT_ID/rtc/channels \
  -H "Content-Type: application/json" \
  -u "YOUR_CUSTOMER_ID:YOUR_CUSTOMER_SECRET" \
  -d '{
    "channel": "my-video-channel",
    "uid": "user_12345",
    "clientRequest": {
      "resourceExpiredHour": 24,
      "recordingConfig": {
        "channelType": 0,
        "streamTypes": 2
      }
    }
  }'
```

## Common API operations

### Get channel information

Query existing channel details and participant information.

### Start recording

Begin recording a video channel session with cloud storage.

### Stop recording

End an active recording session and retrieve file information.

## Error handling

The Agora API uses standard HTTP status codes and returns structured error information:

```json
{
  "code": 400,
  "message": "Invalid channel name format",
  "details": {
    "field": "channel",
    "reason": "Channel name must be alphanumeric and under 64 characters"
  }
}
```

### Common status codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad request - invalid parameters |
| `401` | Unauthorized - check your credentials |
| `403` | Forbidden - insufficient permissions |
| `404` | Resource not found |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

## Rate limits

Agora API requests are rate limited based on your account plan:

- **Starter plan**: 100 requests per minute
- **Pro plan**: 500 requests per minute
- **Enterprise plan**: 1,000 requests per minute

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 485
X-RateLimit-Reset: 1705310460
```

## Next steps

Now that you understand the basics of the Agora Video Calling REST API:

- **Test the interactive examples** above with your own Agora credentials
- **Explore SDK documentation** for client-side integration
- **Set up webhooks** for real-time event notifications
- **Implement error handling** for production applications

## Resources

- [Agora Console](https://console.agora.io) - Get your API credentials
- [SDK Documentation](../sdk-documentation/video-calling-sdk-guide) - Client-side integration guides
- [Rate Limiting Guide](https://docs.agora.io/en/video-calling/develop/rate-limiting) - Optimize your API usage

## Interactive features

The API testers above provide a hands-on way to explore the Agora REST API:

- **Real-time testing**: Test endpoints with your actual credentials
- **Code generation**: Get working code in cURL, JavaScript, and Python
- **Live responses**: See actual API responses and status codes
- **Parameter validation**: Input forms guide you through required parameters

This interactive approach, similar to ChatGPT's API playground, helps you understand API behavior before implementing it in your applications.