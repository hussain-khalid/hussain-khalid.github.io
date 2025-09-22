import React from 'react';
import ApiTester from '../ApiTester';

interface AgoraApiTesterProps {
  endpoint: 'create-channel' | 'get-channel' | 'start-recording' | 'stop-recording';
}

const API_CONFIGS = {
  'create-channel': {
    endpoint: '/projects/{appId}/rtc/channels',
    method: 'POST' as const,
    title: 'Create Video Channel',
    description: 'Create a new video calling channel with recording capabilities.',
    parameters: [
      {
        name: 'appId',
        type: 'string' as const,
        required: true,
        description: 'Your Agora App ID from the console',
        defaultValue: 'your-app-id'
      },
      {
        name: 'channel',
        type: 'string' as const,
        required: true,
        description: 'Unique channel name for the video call',
        defaultValue: 'my-video-channel'
      },
      {
        name: 'uid',
        type: 'string' as const,
        required: true,
        description: 'User identifier (can be string or number)',
        defaultValue: 'user_12345'
      },
      {
        name: 'resourceExpiredHour',
        type: 'number' as const,
        required: false,
        description: 'Resource expiration time in hours',
        defaultValue: '24'
      }
    ],
    sampleResponse: {
      code: 200,
      message: 'success',
      data: {
        resourceId: 'nRHBbXZvHBjmvRezPqUe8g==',
        sid: '2d8c8a7d-f7b3-4c5a-9b2e-8d7f6a5b4c3e',
        serverResponse: {
          status: 1,
          fileList: []
        }
      }
    }
  },
  'get-channel': {
    endpoint: '/projects/{appId}/rtc/channels/{channel}',
    method: 'GET' as const,
    title: 'Get Channel Information',
    description: 'Retrieve information about an existing video channel.',
    parameters: [
      {
        name: 'appId',
        type: 'string' as const,
        required: true,
        description: 'Your Agora App ID from the console',
        defaultValue: 'your-app-id'
      },
      {
        name: 'channel',
        type: 'string' as const,
        required: true,
        description: 'Channel name to query',
        defaultValue: 'my-video-channel'
      }
    ],
    sampleResponse: {
      code: 200,
      message: 'success',
      data: {
        channelName: 'my-video-channel',
        userCount: 2,
        status: 'active',
        createdAt: '2024-01-15T10:30:00Z',
        participants: [
          { uid: 'user_12345', joinedAt: '2024-01-15T10:30:00Z' },
          { uid: 'user_67890', joinedAt: '2024-01-15T10:31:15Z' }
        ]
      }
    }
  },
  'start-recording': {
    endpoint: '/projects/{appId}/rtc/channels/{channel}/recording/start',
    method: 'POST' as const,
    title: 'Start Recording',
    description: 'Start recording a video channel session.',
    parameters: [
      {
        name: 'appId',
        type: 'string' as const,
        required: true,
        description: 'Your Agora App ID from the console',
        defaultValue: 'your-app-id'
      },
      {
        name: 'channel',
        type: 'string' as const,
        required: true,
        description: 'Channel name to record',
        defaultValue: 'my-video-channel'
      },
      {
        name: 'uid',
        type: 'string' as const,
        required: true,
        description: 'Recording bot user ID',
        defaultValue: 'recording_bot'
      },
      {
        name: 'storageConfig',
        type: 'string' as const,
        required: false,
        description: 'Cloud storage configuration (JSON)',
        defaultValue: '{"vendor": 1, "region": 1, "bucket": "my-bucket"}'
      }
    ],
    sampleResponse: {
      code: 200,
      message: 'success',
      data: {
        resourceId: 'JyvK8nXHuBUd4dPL2C1XY1==',
        sid: 'recording_12345',
        serverResponse: {
          status: 5,
          recordingId: 'rec_abc123def456'
        }
      }
    }
  },
  'stop-recording': {
    endpoint: '/projects/{appId}/rtc/channels/{channel}/recording/stop',
    method: 'POST' as const,
    title: 'Stop Recording',
    description: 'Stop an active recording session and get the recorded files.',
    parameters: [
      {
        name: 'appId',
        type: 'string' as const,
        required: true,
        description: 'Your Agora App ID from the console',
        defaultValue: 'your-app-id'
      },
      {
        name: 'channel',
        type: 'string' as const,
        required: true,
        description: 'Channel name being recorded',
        defaultValue: 'my-video-channel'
      },
      {
        name: 'resourceId',
        type: 'string' as const,
        required: true,
        description: 'Resource ID from start recording response',
        defaultValue: 'JyvK8nXHuBUd4dPL2C1XY1=='
      },
      {
        name: 'sid',
        type: 'string' as const,
        required: true,
        description: 'Session ID from start recording response',
        defaultValue: 'recording_12345'
      }
    ],
    sampleResponse: {
      code: 200,
      message: 'success',
      data: {
        serverResponse: {
          status: 0,
          fileList: [
            {
              fileName: 'recording_12345.mp4',
              trackType: 'audio_and_video',
              uid: '0',
              mixedAllUser: true,
              isPlayable: true,
              sliceStartTime: 1705310400000
            }
          ],
          uploadingStatus: 'uploaded'
        }
      }
    }
  }
};

export default function AgoraApiTester({ endpoint }: AgoraApiTesterProps): JSX.Element {
  const config = API_CONFIGS[endpoint];

  return (
    <ApiTester
      endpoint={config.endpoint}
      method={config.method}
      title={config.title}
      description={config.description}
      parameters={config.parameters}
      headers={{
        'Authorization': 'Basic <base64(customer_id:customer_secret)>',
        'X-Agora-Signature': '<signature>',
        'X-Agora-Timestamp': '<timestamp>'
      }}
      baseUrl="https://api.agora.io/v1"
      sampleResponse={config.sampleResponse}
    />
  );
}