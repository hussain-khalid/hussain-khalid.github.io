---
sidebar_position: 1
title: Agora Video Calling REST API Guide
description: Complete guide to get started with the Agora Video Calling REST API, including authentication, channel management, and real-time communication features.
---

# Agora Video Calling REST API guide

This guide shows you how to start using the Agora Video Calling REST API to manage video communication channels, recording, and user sessions.

## Overview

The Agora REST API provides programmatic access to manage video calling channels, control recording sessions, and retrieve usage analytics. The API follows REST conventions and returns JSON-formatted responses.

**Base URL**: `https://api.agora.io/v1/`

## Interactive API testing

Similar to ChatGPT's API playground, this documentation includes an interactive interface where you can:

- **Test API endpoints directly**: Make real API calls from the documentation
- **See live responses**: View actual JSON responses and HTTP status codes
- **Modify parameters**: Adjust request parameters and see how responses change
- **Copy working code**: Generate code snippets in multiple programming languages

This hands-on approach helps developers understand the API behavior before implementing it in their applications.

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

import AgoraApiTester from '@site/src/components/AgoraApiTester';

<AgoraApiTester endpoint="create-channel" />

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

### Response

```json
{
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
}

## Common API operations

### Get channel information

Query existing channel details and participant information.

<AgoraApiTester endpoint="get-channel" />

### Start recording

Begin recording a video channel session with cloud storage.

<AgoraApiTester endpoint="start-recording" />

### Stop recording

End an active recording session and retrieve file information.

<AgoraApiTester endpoint="stop-recording" />

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