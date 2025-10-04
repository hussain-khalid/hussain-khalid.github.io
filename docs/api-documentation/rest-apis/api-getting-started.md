---
sidebar_position: 2
title: Quickstart
description: Complete guide to get started with the Agora Video Calling RESTful API, including authentication, channel management, and real-time communication features.
hide_table_of_contents: true
---

import ApiMethod from '@site/src/components/ApiMethod';
import ApiCallout from '@site/src/components/ApiCallout';

This guide shows you how to start using the Agora RESTful APIs to manage video communication channels, recording, and user sessions.

## Overview

The Agora RESTful API provides programmatic access to access video calling channels, control recording sessions, and retrieve usage analytics. The API follows RESTful conventions and returns JSON-formatted responses.

**Base URL**: `https://api.agora.io/v1/`


## Make your first request

To get started, create a video calling channel using the Agora RESTful API:

### Create a channel

The interactive API tester below allows you to test the channel creation endpoint with your own credentials. Similar to ChatGPT's API playground, you can modify parameters, see live responses, and copy working code in multiple programming languages.

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
  exampleTitle="Request example"
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
  responseTitle="Response example"
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



