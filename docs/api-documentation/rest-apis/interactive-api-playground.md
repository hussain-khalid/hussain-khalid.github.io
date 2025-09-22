---
sidebar_position: 2
title: Interactive API Playground
description: Test Agora Video Calling REST APIs directly in your browser with our interactive playground, similar to ChatGPT's API interface.
---

# Interactive API playground

This playground allows you to test Agora Video Calling REST APIs directly in your browser, similar to ChatGPT's interactive API interface. You can modify parameters, see live responses, and generate code snippets in multiple programming languages.

## Features

- **Live API testing**: Make real API calls directly from the documentation
- **Parameter validation**: Input forms guide you through required and optional parameters
- **Multi-language code generation**: Get working code in cURL, JavaScript, and Python
- **Real-time responses**: See actual JSON responses and HTTP status codes
- **Interactive exploration**: Modify parameters and instantly see how responses change

## Channel management APIs

### Create video channel

Test the channel creation endpoint with your Agora credentials:

import AgoraApiTester from '@site/src/components/AgoraApiTester';

<AgoraApiTester endpoint="create-channel" />

### Get channel information

Query details about an existing video channel:

<AgoraApiTester endpoint="get-channel" />

## Recording management APIs

### Start recording

Begin recording a video channel session:

<AgoraApiTester endpoint="start-recording" />

### Stop recording

End an active recording session and get file information:

<AgoraApiTester endpoint="stop-recording" />

## How to use the playground

1. **Get your credentials**: Log in to [Agora Console](https://console.agora.io) and get your App ID, Customer ID, and Customer Secret.

2. **Fill in parameters**: Use the interactive forms to input your API credentials and test parameters.

3. **Test the API**: Click "Test API" to make a live request to Agora's servers.

4. **View responses**: See the actual JSON response data and HTTP status codes.

5. **Copy code**: Use the generated code snippets in your applications.

## Benefits

This interactive approach provides several advantages over traditional API documentation:

- **Learning by doing**: Understand API behavior through hands-on testing
- **Rapid prototyping**: Test different parameter combinations quickly
- **Code examples**: Get working code in your preferred programming language
- **Error debugging**: See exactly what happens when requests fail
- **Confidence building**: Verify API behavior before implementing in production

## Security notes

:::warning Production safety
The interactive playground is designed for testing and learning. For production applications:

- Never expose your credentials in client-side code
- Use server-side proxy endpoints
- Implement proper error handling
- Follow rate limiting best practices
:::

## Next steps

After testing the APIs in the playground:

- **Implement in your application**: Use the generated code snippets as starting points
- **Explore SDK documentation**: Learn about client-side integration
- **Set up webhooks**: Configure real-time event notifications
- **Review error handling**: Implement robust error handling for production use