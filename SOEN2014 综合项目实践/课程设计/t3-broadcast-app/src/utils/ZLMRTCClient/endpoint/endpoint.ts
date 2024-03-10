import axios from 'axios';

import {
  VideoTrackConstraints,
  VideoSourceInfo,
  AudioTrackConstraints,
  AudioSourceInfo,
  Resolution,
  MediaStreamFactory,
  StreamConstraints,
} from '../base';
import Events from '../base/event';
import { setDebugLogger, debug } from '../ulity/debug';
import Event from '../ulity/event';

export interface RTCEndpointOptions {
  element: HTMLVideoElement; // html video element
  debug: boolean; // if output debug log
  zlmsdpUrl: string;
  simulcast: boolean;
  useCamera: boolean;
  audioEnable: boolean;
  videoEnable: boolean;
  mixScreen: boolean;
  recvOnly: boolean;
  resolution: { w: number; h: number };
  useDataChannel: boolean;
}

export class RTCEndpoint extends Event<{
  [Events.WEBRTC_OFFER_ANSWER_EXCHANGE_FAILED]: (ret: {
    code: number;
    sdp: string;
  }) => void;
  [Events.WEBRTC_ON_LOCAL_STREAM]: (stream: MediaStream) => void;
  [Events.WEBRTC_OFFER_ANSWER_EXCHANGE_FAILED]: (ret: {
    code: number;
    sdp: string;
  }) => void;
  [Events.CAPTURE_STREAM_FAILED]: (error: Error) => void;
  [Events.WEBRTC_ON_REMOTE_STREAMS]: (event: RTCTrackEvent) => void;
  [Events.WEBRTC_ICE_CANDIDATE_ERROR]: (event: globalThis.Event) => void;
  [Events.WEBRTC_ON_CONNECTION_STATE_CHANGE]: (
    state: RTCPeerConnectionState,
  ) => void;
  [Events.WEBRTC_ON_DATA_CHANNEL_OPEN]: (event: globalThis.Event) => void;
  [Events.WEBRTC_ON_DATA_CHANNEL_MSG]: (event: globalThis.Event) => void;
  [Events.WEBRTC_ON_DATA_CHANNEL_ERR]: (event: globalThis.Event) => void;
  [Events.WEBRTC_ON_DATA_CHANNEL_CLOSE]: (event: globalThis.Event) => void;
}> {
  TAG: string;
  options: RTCEndpointOptions | null;
  _tracks: MediaStreamTrack[];
  _remoteStream: MediaStream | null;
  _localStream: MediaStream | null;
  pc: RTCPeerConnection | null;
  dataChannel: RTCDataChannel | null;

  constructor(options: RTCEndpointOptions) {
    super('RTCPusherPlayer');
    this.TAG = '[RTCPusherPlayer]';

    const defaults = {
      element: '', // html video element
      debug: false, // if output debug log
      zlmsdpUrl: '',
      simulcast: false,
      useCamera: true,
      audioEnable: true,
      videoEnable: true,
      recvOnly: false,
      resolution: { w: 0, h: 0 },
      useDataChannel: false,
      mixScreen: false,
    };

    this.options = Object.assign({}, defaults, options);

    if (this.options.debug) {
      setDebugLogger();
    }

    this._remoteStream = null;
    this._localStream = null;

    this._tracks = [];
    this.pc = new RTCPeerConnection();

    this.pc.onicecandidate = this._onIceCandidate.bind(this);
    this.pc.onicecandidateerror = this._onIceCandidateError.bind(this);
    this.pc.ontrack = this._onTrack.bind(this);
    this.pc.onconnectionstatechange = this._onconnectionstatechange.bind(this);

    this.dataChannel = null;
    if (this.options.useDataChannel) {
      this.dataChannel = this.pc.createDataChannel('chat');
      this.dataChannel.onclose = this._onDataChannelClose.bind(this);
      this.dataChannel.onerror = this._onDataChannelErr.bind(this);
      this.dataChannel.onmessage = this._onDataChannelMsg.bind(this);
      this.dataChannel.onopen = this._onDataChannelOpen.bind(this);
    }
  }

  start() {
    if (
      !this.options!.recvOnly &&
      (this.options!.audioEnable || this.options!.videoEnable)
    )
      void this.startPush();
    else this.receive();
  }

  receive() {
    const AudioTransceiverInit: RTCRtpTransceiverInit = {
      direction: 'recvonly',
      sendEncodings: [],
    };
    const VideoTransceiverInit: RTCRtpTransceiverInit = {
      direction: 'recvonly',
      sendEncodings: [],
    };

    if (this.options!.videoEnable) {
      this.pc!.addTransceiver('video', VideoTransceiverInit);
    }
    if (this.options!.audioEnable) {
      this.pc!.addTransceiver('audio', AudioTransceiverInit);
    }

    this.pc!.createOffer()
      .then((desc) => {
        debug.log(this.TAG, 'offer:', desc.sdp);
        void this.pc!.setLocalDescription(desc).then(() => {
          void axios({
            method: 'post',
            url: this.options!.zlmsdpUrl,
            responseType: 'json',
            data: desc.sdp,
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
          }).then((response) => {
            const ret = response.data as { code: number; sdp: string };
            if (ret.code != 0) {
              // mean failed for offer/anwser exchange
              this.dispatch(Events.WEBRTC_OFFER_ANSWER_EXCHANGE_FAILED, ret);
              return;
            }
            const answer: RTCSessionDescriptionInit = {
              sdp: ret.sdp,
              type: 'answer',
            };
            debug.log(this.TAG, 'answer:', ret.sdp);

            this.pc!.setRemoteDescription(answer)
              .then(() => {
                debug.log(this.TAG, 'set remote success');
              })
              .catch((e) => {
                debug.error(this.TAG, e);
              });
          });
        });
      })
      .catch((e) => {
        debug.error(this.TAG, e);
      });
  }

  async startPush() {
    let videoConstraints: VideoTrackConstraints | false = false;
    let audioConstraints: AudioTrackConstraints | false = false;

    if (this.options!.useCamera) {
      if (this.options!.videoEnable)
        videoConstraints = new VideoTrackConstraints(VideoSourceInfo.CAMERA);
      if (this.options!.audioEnable)
        audioConstraints = new AudioTrackConstraints(AudioSourceInfo.MIC);
    } else {
      if (this.options!.videoEnable) {
        videoConstraints = new VideoTrackConstraints(
          VideoSourceInfo.SCREEN_CAST,
        );
        if (this.options!.audioEnable)
          audioConstraints = new AudioTrackConstraints(
            AudioSourceInfo.SCREEN_CAST,
          );
      } else {
        if (this.options!.audioEnable)
          audioConstraints = new AudioTrackConstraints(AudioSourceInfo.MIC);
        else {
          // error shared display media not only audio
          debug.error(this.TAG, 'error parameter');
        }
      }
    }

    if (
      this.options!.resolution.w != 0 &&
      this.options!.resolution.h != 0 &&
      typeof videoConstraints == 'object'
    ) {
      videoConstraints.resolution = new Resolution(
        this.options!.resolution.w,
        this.options!.resolution.h,
      );
    }

    let stream = await MediaStreamFactory.createMediaStream(
      new StreamConstraints(audioConstraints, videoConstraints),
    );
    if (
      this.options!.useCamera &&
      this.options!.videoEnable &&
      this.options!.mixScreen
    ) {
      (videoConstraints as VideoTrackConstraints).resolution = new Resolution(
        640,
        360,
      );
      const screenConstraints = new VideoTrackConstraints(
        VideoSourceInfo.SCREEN_CAST,
      );
      screenConstraints.resolution = new Resolution(
        this.options!.resolution.w,
        this.options!.resolution.h,
      );
      const screenStream = await MediaStreamFactory.createMediaStream(
        new StreamConstraints(false, screenConstraints),
      );
      stream = await MediaStreamFactory.getOverlayedVideoStreams(
        screenStream,
        stream,
      );
    }

    try {
      this._localStream = stream;

      this.dispatch(Events.WEBRTC_ON_LOCAL_STREAM, stream);

      const AudioTransceiverInit: RTCRtpTransceiverInit = {
        direction: 'sendrecv',
        sendEncodings: [],
      };
      const VideoTransceiverInit: RTCRtpTransceiverInit = {
        direction: 'sendrecv',
        sendEncodings: [],
      };

      if (this.options!.simulcast && stream.getVideoTracks().length > 0) {
        VideoTransceiverInit.sendEncodings = [
          { rid: 'h', active: true, maxBitrate: 1000000 },
          {
            rid: 'm',
            active: true,
            maxBitrate: 500000,
            scaleResolutionDownBy: 2,
          },
          {
            rid: 'l',
            active: true,
            maxBitrate: 200000,
            scaleResolutionDownBy: 4,
          },
        ];
      }

      if (this.options!.audioEnable) {
        if (stream.getAudioTracks().length > 0) {
          this.pc!.addTransceiver(
            stream.getAudioTracks()[0]!,
            AudioTransceiverInit,
          );
        } else {
          AudioTransceiverInit.direction = 'recvonly';
          this.pc!.addTransceiver('audio', AudioTransceiverInit);
        }
      }

      if (this.options!.videoEnable) {
        if (stream.getVideoTracks().length > 0) {
          this.pc!.addTransceiver(
            stream.getVideoTracks()[0]!,
            VideoTransceiverInit,
          );
        } else {
          VideoTransceiverInit.direction = 'recvonly';
          this.pc!.addTransceiver('video', VideoTransceiverInit);
        }
      }

      this.pc!.createOffer()
        .then((desc) => {
          debug.log(this.TAG, 'offer:', desc.sdp);
          void this.pc!.setLocalDescription(desc).then(() => {
            void axios({
              method: 'post',
              url: this.options!.zlmsdpUrl,
              responseType: 'json',
              data: desc.sdp,
              headers: {
                'Content-Type': 'text/plain;charset=utf-8',
              },
            }).then((response) => {
              const ret = response.data as { code: number; sdp: string };
              if (ret.code != 0) {
                // mean failed for offer/anwser exchange
                this.dispatch(Events.WEBRTC_OFFER_ANSWER_EXCHANGE_FAILED, ret);
                return;
              }
              const answer: RTCSessionDescriptionInit = {
                sdp: ret.sdp,
                type: 'answer',
              };
              debug.log(this.TAG, 'answer:', ret.sdp);

              this.pc!.setRemoteDescription(answer)
                .then(() => {
                  debug.log(this.TAG, 'set remote success');
                })
                .catch((e) => {
                  debug.error(this.TAG, e);
                });
            });
          });
        })
        .catch((e) => {
          debug.error(this.TAG, e);
        });
    } catch (e) {
      this.dispatch(Events.CAPTURE_STREAM_FAILED, e as Error);
    }
  }

  _onIceCandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      debug.log(
        this.TAG,
        `Remote ICE candidate: \n ${event.candidate.candidate}`,
      );
      // Send the candidate to the remote peer
    } else {
      // All ICE candidates have been sent
    }
  }

  _onTrack(event: RTCTrackEvent) {
    this._tracks.push(event.track);
    if (this.options!.element && event.streams && event.streams.length > 0) {
      this.options!.element.srcObject = event.streams[0]!;
      this._remoteStream = event.streams[0]!;

      this.dispatch(Events.WEBRTC_ON_REMOTE_STREAMS, event);
    } else {
      if (this.pc!.getReceivers().length == this._tracks.length) {
        debug.log(this.TAG, 'play remote stream ');
        this._remoteStream = new MediaStream(this._tracks);
        this.options!.element.srcObject = this._remoteStream;
      } else {
        debug.error(this.TAG, 'wait stream track finish');
      }
    }
  }

  _onIceCandidateError(event: globalThis.Event) {
    this.dispatch(Events.WEBRTC_ICE_CANDIDATE_ERROR, event);
  }

  _onconnectionstatechange() {
    this.dispatch(
      Events.WEBRTC_ON_CONNECTION_STATE_CHANGE,
      this.pc!.connectionState,
    );
  }

  _onDataChannelOpen(event: globalThis.Event) {
    debug.log(this.TAG, 'ondatachannel open:', event);
    this.dispatch(Events.WEBRTC_ON_DATA_CHANNEL_OPEN, event);
  }
  _onDataChannelMsg(event: globalThis.Event) {
    debug.log(this.TAG, 'ondatachannel msg:', event);
    this.dispatch(Events.WEBRTC_ON_DATA_CHANNEL_MSG, event);
  }
  _onDataChannelErr(event: globalThis.Event) {
    debug.log(this.TAG, 'ondatachannel err:', event);
    this.dispatch(Events.WEBRTC_ON_DATA_CHANNEL_ERR, event);
  }
  _onDataChannelClose(event: globalThis.Event) {
    debug.log(this.TAG, 'ondatachannel close:', event);
    this.dispatch(Events.WEBRTC_ON_DATA_CHANNEL_CLOSE, event);
  }
  sendMsg(data: string) {
    if (this.dataChannel != null) {
      this.dataChannel.send(data);
    } else {
      debug.error(this.TAG, 'data channel is null');
    }
  }
  closeDataChannel() {
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }
  }
  close() {
    this.closeDataChannel();
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }

    if (this.options) {
      this.options = null;
    }

    if (this._localStream) {
      this._localStream.getTracks().forEach((track) => track.stop());
    }

    if (this._remoteStream) {
      this._remoteStream.getTracks().forEach((track) => track.stop());
    }

    this._tracks.forEach((track) => track.stop());
    this._tracks = [];
  }

  get remoteStream() {
    return this._remoteStream;
  }

  get localStream() {
    return this._localStream;
  }
}
