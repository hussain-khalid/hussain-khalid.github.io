---
sidebar_position: 1
title: API Getting Started Guide
description: Complete guide to get started with the REST API, including authentication, making your first request, and handling responses.
---

# API getting started guide

This guide shows you how to start using the REST API effectively.

## Overview

The REST API provides programmatic access to manage resources, retrieve data, and integrate with your applications. The API follows REST conventions and returns JSON-formatted responses.

**Base URL**: `https://api.example.com/v1/`

## Authentication

### API key authentication

All API requests require authentication using an API key passed in the request header.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.example.com/v1/users
```

### Get your API key

To get your API key, complete the following steps:

1. Log in to your account dashboard.
2. Go to **Settings > API Keys**.
3. Click **Generate New API Key**.
4. Copy and securely store your API key.

:::warning Security note
Keep your API key secure and never expose it in client-side code. Use environment variables to store API keys in your applications.
:::

## Make your first request

To get started, make a simple GET request to retrieve your user profile:

### Request

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.example.com/v1/users/me
```

### Response

```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-01-15T10:30:00Z",
  "plan": "pro"
}
```

## Common Patterns

### Pagination

List endpoints return paginated results:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.example.com/v1/projects?page=2&limit=50"
```

```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 50,
    "total": 150,
    "total_pages": 3
  }
}
```

### Filtering and Sorting

Use query parameters to filter and sort results:

```bash
# Filter by status and sort by created date
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.example.com/v1/projects?status=active&sort=created_at:desc"
```

## Error Handling

The API uses standard HTTP status codes and returns error details in JSON format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "field": "email"
  }
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created successfully |
| `400` | Bad request - check your parameters |
| `401` | Unauthorized - check your API key |
| `404` | Resource not found |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

## Rate Limits

API requests are rate limited to prevent abuse:

- **Free tier**: 100 requests per hour
- **Pro tier**: 1,000 requests per hour
- **Enterprise**: 10,000 requests per hour

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Next Steps

Now that you understand the basics, you can start building with the API:

- Explore different endpoints using the examples above
- Set up error handling in your applications
- Implement pagination for large datasets

## Need Help?

- Contact support at api-support@example.com
- Review the API examples in this guide