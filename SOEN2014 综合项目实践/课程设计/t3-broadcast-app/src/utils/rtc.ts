import { RTCEndpoint } from './ZLMRTCClient';
export {
  getAllScanResolutions,
  isSupportResolution,
  Events as RTCEvents,
} from './ZLMRTCClient';

/**
 * The URL of the server. Expecting a WebRTC endpoint provided by ZLMediaKit.
 */
const SERVER_URL = 'localhost';

export interface RTCPlayerOptions {
  audioEnabled?: boolean;
  debug?: boolean;
  method: 'echo' | 'push' | 'play';
  mixScreen?: boolean;
  resolution: { width: number; height: number };
  roomId: string;
  simulcast?: boolean;
  useCamera?: boolean;
  useDataChannel?: boolean;
  videoEnabled?: boolean;
}

export const createRTCPlayer = (options: RTCPlayerOptions) => {
  const {
    audioEnabled = true,
    debug = false,
    method,
    mixScreen = false,
    resolution,
    roomId,
    simulcast = false,
    useCamera = true,
    useDataChannel = false,
    videoEnabled = true,
  } = options;
  const url = `http${
    method === 'push' ? 's' : ''
  }://${SERVER_URL}/index/api/webrtc?app=live&stream=${roomId}&type=${method}`;

  return {
    on: (element: HTMLVideoElement) => {
      const _endpoint = new RTCEndpoint({
        element,
        debug, // Whether to print logs
        mixScreen,
        zlmsdpUrl: url,
        simulcast,
        useCamera,
        audioEnable: audioEnabled,
        videoEnable: videoEnabled,
        recvOnly: method === 'play',
        resolution: { w: resolution.width, h: resolution.height },
        useDataChannel,
      });

      return {
        start: _endpoint.start.bind(_endpoint),
        stop: _endpoint.close.bind(_endpoint),
        on: _endpoint.on.bind(_endpoint),
        sendMessage: _endpoint.sendMsg.bind(_endpoint),
        closeDataChannel: _endpoint.closeDataChannel.bind(_endpoint),
      };
    },
  };
};

export type RTCPlayer = ReturnType<ReturnType<typeof createRTCPlayer>['on']>;
