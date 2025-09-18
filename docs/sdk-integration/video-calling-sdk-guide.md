---
sidebar_position: 1
title: Video Calling SDK Integration Guide
description: Complete guide to integrate Video Calling SDK across multiple platforms including JavaScript, React Native, Java, C++, and C# with code examples and best practices.
---

# Video Calling SDK Integration Guide

This comprehensive guide covers integrating our Video Calling SDK across multiple platforms, with specific implementations for JavaScript, React Native, Java, C++, and C#.

## Overview

Our Video Calling SDK provides cross-platform video communication capabilities with consistent APIs across all supported languages. This unified approach ensures developers can leverage the same core concepts while working in their preferred development environment.

### Supported Platforms

| Platform | Language | Minimum Version |
|----------|----------|----------------|
| Web | JavaScript | ES6+ |
| Mobile | React Native | 0.60+ |
| Android | Java | API Level 21+ |
| iOS/macOS | C++ | C++14 |
| Windows | C# | .NET Framework 4.7+ |

## Installation

### JavaScript (Web)

```bash
npm install @videocall/web-sdk
# or
yarn add @videocall/web-sdk
```

### React Native

```bash
npm install @videocall/react-native-sdk
cd ios && pod install  # iOS only
```

### Java (Android)

Add to your `app/build.gradle`:

```gradle
dependencies {
    implementation 'com.videocall:android-sdk:2.5.0'
}
```

### C++ (Native)

```cmake
find_package(VideoCallSDK REQUIRED)
target_link_libraries(your_target VideoCallSDK::VideoCallSDK)
```

### C# (.NET)

```bash
Install-Package VideoCall.NET.SDK
```

## Quick Start

### 1. Initialize the SDK

<details>
<summary><strong>JavaScript</strong></summary>

```javascript
import { VideoCallClient } from '@videocall/web-sdk';

const client = new VideoCallClient({
  apiKey: 'your-api-key',
  environment: 'production', // or 'staging'
  logLevel: 'info'
});

await client.initialize();
```

</details>

<details>
<summary><strong>React Native</strong></summary>

```javascript
import { VideoCallManager } from '@videocall/react-native-sdk';

const manager = new VideoCallManager({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Initialize with permissions
await manager.initialize({
  requestPermissions: true
});
```

</details>

<details>
<summary><strong>Java (Android)</strong></summary>

```java
import com.videocall.sdk.VideoCallClient;
import com.videocall.sdk.VideoCallConfig;

VideoCallConfig config = new VideoCallConfig.Builder()
    .setApiKey("your-api-key")
    .setEnvironment(Environment.PRODUCTION)
    .build();

VideoCallClient client = VideoCallClient.create(context, config);
client.initialize(new InitializationCallback() {
    @Override
    public void onSuccess() {
        // SDK initialized successfully
    }

    @Override
    public void onError(VideoCallException error) {
        // Handle initialization error
    }
});
```

</details>

<details>
<summary><strong>C++</strong></summary>

```cpp
#include <videocall/VideoCallClient.h>

using namespace videocall;

VideoCallConfig config;
config.apiKey = "your-api-key";
config.environment = Environment::PRODUCTION;

auto client = VideoCallClient::create(config);
client->initialize([](const Result& result) {
    if (result.isSuccess()) {
        // SDK initialized successfully
    } else {
        // Handle initialization error
    }
});
```

</details>

<details>
<summary><strong>C#</strong></summary>

```csharp
using VideoCall.SDK;

var config = new VideoCallConfig
{
    ApiKey = "your-api-key",
    Environment = Environment.Production
};

var client = new VideoCallClient(config);
await client.InitializeAsync();
```

</details>

### 2. Create a Video Call

<details>
<summary><strong>JavaScript</strong></summary>

```javascript
// Join an existing room or create a new one
const call = await client.joinCall({
  roomId: 'room-123',
  userId: 'user-456',
  displayName: 'John Doe',
  video: true,
  audio: true
});

// Handle call events
call.on('participant-joined', (participant) => {
  console.log(`${participant.displayName} joined the call`);
});

call.on('participant-left', (participant) => {
  console.log(`${participant.displayName} left the call`);
});
```

</details>

<details>
<summary><strong>React Native</strong></summary>

```javascript
// Join call with video view component
const call = await manager.joinCall({
  roomId: 'room-123',
  userId: 'user-456',
  displayName: 'John Doe'
});

// In your React component
import { VideoCallView } from '@videocall/react-native-sdk';

function CallScreen() {
  return (
    <VideoCallView
      call={call}
      style={{ flex: 1 }}
      showControls={true}
      onCallEnd={() => {
        // Handle call end
      }}
    />
  );
}
```

</details>

<details>
<summary><strong>Java (Android)</strong></summary>

```java
CallOptions options = new CallOptions.Builder()
    .setRoomId("room-123")
    .setUserId("user-456")
    .setDisplayName("John Doe")
    .enableVideo(true)
    .enableAudio(true)
    .build();

client.joinCall(options, new CallCallback() {
    @Override
    public void onCallJoined(VideoCall call) {
        // Call joined successfully
        call.setEventListener(new CallEventListener() {
            @Override
            public void onParticipantJoined(Participant participant) {
                // Handle participant joined
            }

            @Override
            public void onParticipantLeft(Participant participant) {
                // Handle participant left
            }
        });
    }

    @Override
    public void onError(VideoCallException error) {
        // Handle join error
    }
});
```

</details>

### 3. Handle Video Rendering

<details>
<summary><strong>JavaScript</strong></summary>

```javascript
// Get local video stream
const localStream = call.getLocalVideoStream();
const localVideoElement = document.getElementById('local-video');
localVideoElement.srcObject = localStream;

// Handle remote video streams
call.on('stream-added', (participant, stream) => {
  const remoteVideo = document.createElement('video');
  remoteVideo.srcObject = stream;
  remoteVideo.autoplay = true;
  document.getElementById('remote-videos').appendChild(remoteVideo);
});
```

</details>

<details>
<summary><strong>C++</strong></summary>

```cpp
// Set up video renderers
class CustomVideoRenderer : public IVideoRenderer {
public:
    void onFrame(const VideoFrame& frame) override {
        // Render video frame
        renderFrame(frame.data(), frame.width(), frame.height());
    }
};

auto localRenderer = std::make_shared<CustomVideoRenderer>();
call->setLocalVideoRenderer(localRenderer);

call->setEventHandler([](const CallEvent& event) {
    if (event.type == CallEventType::PARTICIPANT_JOINED) {
        auto remoteRenderer = std::make_shared<CustomVideoRenderer>();
        call->setRemoteVideoRenderer(event.participant.id, remoteRenderer);
    }
});
```

</details>

## Advanced Features

### Screen Sharing

Screen sharing is supported across all platforms with platform-specific implementations:

```javascript
// JavaScript - Web Screen Share
const screenStream = await call.startScreenShare({
  audio: true, // Include system audio
  cursor: 'always' // Show cursor in shared screen
});

// Stop screen sharing
await call.stopScreenShare();
```

### Recording and Streaming

```javascript
// Start recording the call
const recording = await call.startRecording({
  format: 'mp4',
  quality: 'hd',
  includeAudio: true
});

// Stop recording
const recordingUrl = await call.stopRecording();
```

### Quality Control

```javascript
// Adjust video quality dynamically
await call.setVideoQuality({
  resolution: '720p', // '480p', '720p', '1080p'
  frameRate: 30,
  bitrate: 'auto' // or specific bitrate in kbps
});

// Enable adaptive bitrate
call.enableAdaptiveBitrate(true);
```

## Error Handling

### Common Error Scenarios

```javascript
// Comprehensive error handling
call.on('error', (error) => {
  switch (error.code) {
    case 'NETWORK_ERROR':
      // Handle network connectivity issues
      showNetworkErrorDialog();
      break;
    case 'PERMISSION_DENIED':
      // Handle camera/microphone permission issues
      requestPermissions();
      break;
    case 'INCOMPATIBLE_BROWSER':
      // Handle browser compatibility issues
      showBrowserUpgradeMessage();
      break;
    case 'ROOM_FULL':
      // Handle room capacity limits
      showRoomFullMessage();
      break;
    default:
      console.error('Unexpected error:', error);
  }
});
```

### Retry Logic

```javascript
// Implement connection retry with exponential backoff
async function joinCallWithRetry(options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.joinCall(options);
    } catch (error) {
      if (attempt === maxRetries) throw error;

      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Performance Optimization

### Memory Management

```cpp
// C++ - Proper resource cleanup
class CallManager {
private:
    std::shared_ptr<VideoCall> activeCall;

public:
    ~CallManager() {
        if (activeCall) {
            activeCall->leave();
            activeCall.reset();
        }
    }

    void leaveCall() {
        if (activeCall) {
            activeCall->leave();
            activeCall.reset(); // Release resources
        }
    }
};
```

### Network Optimization

```javascript
// JavaScript - Connection quality monitoring
call.on('connection-quality-changed', (quality) => {
  switch (quality.level) {
    case 'excellent':
      // Enable high-quality features
      call.setVideoQuality({ resolution: '1080p' });
      break;
    case 'good':
      call.setVideoQuality({ resolution: '720p' });
      break;
    case 'poor':
      // Reduce quality to maintain connection
      call.setVideoQuality({ resolution: '480p' });
      break;
  }
});
```

## Testing and Debugging

### Debug Mode

```javascript
// Enable comprehensive logging
const client = new VideoCallClient({
  apiKey: 'your-api-key',
  logLevel: 'debug', // 'error', 'warn', 'info', 'debug'
  enableMetrics: true // Collect performance metrics
});

// Access debug information
const debugInfo = await call.getDebugInfo();
console.log('Call statistics:', debugInfo.statistics);
console.log('Network metrics:', debugInfo.network);
```

### Integration Testing

```java
// Java - Unit test example
@Test
public void testCallConnection() {
    VideoCallClient client = VideoCallClient.create(context, config);

    CountDownLatch latch = new CountDownLatch(1);
    AtomicReference<VideoCall> callRef = new AtomicReference<>();

    client.joinCall(callOptions, new CallCallback() {
        @Override
        public void onCallJoined(VideoCall call) {
            callRef.set(call);
            latch.countDown();
        }

        @Override
        public void onError(VideoCallException error) {
            fail("Call join failed: " + error.getMessage());
        }
    });

    assertTrue("Call should join within 5 seconds",
               latch.await(5, TimeUnit.SECONDS));
    assertNotNull("Call should not be null", callRef.get());
}
```

## Migration Guide

### Upgrading from v1.x to v2.x

Key changes in SDK v2.0:

1. **Initialization**: Now requires explicit `initialize()` call
2. **Event Handling**: Unified event system across all platforms
3. **Permissions**: Automatic permission handling (can be disabled)

```javascript
// v1.x (deprecated)
const client = new VideoCallClient('api-key');
client.joinCall('room-id');

// v2.x (current)
const client = new VideoCallClient({ apiKey: 'api-key' });
await client.initialize();
const call = await client.joinCall({ roomId: 'room-id' });
```

## Best Practices

### 1. Resource Management
- Always call `leave()` when exiting calls
- Dispose of video renderers properly
- Handle app backgrounding/foregrounding

### 2. User Experience
- Implement loading states during call connection
- Provide clear error messages and recovery options
- Test across different network conditions

### 3. Security
- Never expose API keys in client-side code
- Implement proper authentication for room access
- Validate user permissions server-side

## Support and Troubleshooting

### Common Issues

**Issue**: Video not displaying
**Solution**: Check camera permissions and video element setup

**Issue**: Audio not working
**Solution**: Verify microphone permissions and audio context initialization

**Issue**: High CPU usage
**Solution**: Optimize video resolution and frame rate based on device capabilities

### Getting Help

- **Documentation**: Browse our complete API reference
- **Sample Code**: Check platform-specific examples
- **Support**: Contact our developer support team
- **Community**: Join our developer forum for community support

---

*This guide represents the type of comprehensive, multi-platform documentation I create to help developers successfully integrate complex SDKs across different technologies and use cases.*