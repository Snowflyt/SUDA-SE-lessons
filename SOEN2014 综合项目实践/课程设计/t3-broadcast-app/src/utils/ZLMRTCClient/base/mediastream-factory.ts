import * as MediaFormatModule from './mediaformat';
import * as utils from './utils';

import type {
  AudioSourceInfo,
  Resolution,
  VideoSourceInfo,
} from './mediaformat';

/**
 * Constraints for creating an audio MediaStreamTrack.
 */
export class AudioTrackConstraints {
  source: AudioSourceInfo;
  deviceId?: string;

  /**
   * @param source Source info of this audio track.
   */
  constructor(source: AudioSourceInfo) {
    this.source = source;
    /**
     * Do not provide deviceId if source is not "mic".
     * @see https://w3c.github.io/mediacapture-main/#def-constraint-deviceId
     */
    this.deviceId = undefined;
  }
}

/**
 * Constraints for creating a video MediaStreamTrack.
 */
export class VideoTrackConstraints {
  source: VideoSourceInfo;
  deviceId?: string;
  resolution?: Resolution;
  frameRate?: number;

  /**
   * @param source Source info of this video track.
   */
  constructor(source: VideoSourceInfo) {
    this.source = source;
    /**
     * Do not provide deviceId if source is not "camera".
     * @see https://w3c.github.io/mediacapture-main/#def-constraint-deviceId
     */
    this.deviceId = undefined;
    this.resolution = undefined;
    this.frameRate = undefined;
  }
}

/**
 * Constraints for creating a MediaStream from screen mic and camera.
 */
export class StreamConstraints {
  audio: AudioTrackConstraints | false;
  video: VideoTrackConstraints | false;

  constructor(
    audioConstraints: AudioTrackConstraints | false = false,
    videoConstraints: VideoTrackConstraints | false = false,
  ) {
    this.audio = audioConstraints;
    this.video = videoConstraints;
  }
}

const isVideoConstrainsForScreenCast = (constraints: StreamConstraints) =>
  typeof constraints.video === 'object' &&
  constraints.video.source === MediaFormatModule.VideoSourceInfo.SCREEN_CAST;

/**
 * A factory to create MediaStream. You can also create MediaStream by yourself.
 */
export class MediaStreamFactory {
  /**
   * Create a MediaStream with given constraints. If you want to create a MediaStream for screen cast, please make sure both audio and video's source are "screen-cast".
   * @param constraints
   * @returns Return a promise that is resolved when stream is successfully created, or rejected if one of the following error happened:
   * - One or more parameters cannot be satisfied.
   * - Specified device is busy.
   * - Cannot obtain necessary permission or operation is canceled by user.
   * - Video source is screen cast, while audio source is not.
   * - Audio source is screen cast, while video source is disabled.
   */
  static async createMediaStream(
    constraints: StreamConstraints,
  ): Promise<MediaStream> {
    if (
      typeof constraints !== 'object' ||
      (!constraints.audio && !constraints.video)
    )
      throw new TypeError('Invalid constrains');
    if (
      !isVideoConstrainsForScreenCast(constraints) &&
      typeof constraints.audio === 'object' &&
      constraints.audio.source === MediaFormatModule.AudioSourceInfo.SCREEN_CAST
    )
      throw new TypeError('Cannot share screen without video.');
    if (
      isVideoConstrainsForScreenCast(constraints) &&
      !utils.isChrome() &&
      !utils.isFirefox()
    )
      throw new TypeError('Screen sharing only supports Chrome and Firefox.');
    if (
      isVideoConstrainsForScreenCast(constraints) &&
      typeof constraints.audio === 'object' &&
      constraints.audio.source !== MediaFormatModule.AudioSourceInfo.SCREEN_CAST
    )
      throw new TypeError(
        'Cannot capture video from screen cast while capture audio from' +
          ' other source.',
      );

    // Check and convert constraints.
    if (!constraints.audio && !constraints.video)
      throw new TypeError('At least one of audio and video must be requested.');

    const mediaConstraints = Object.create({}) as {
      audio:
        | {
            deviceId: string | { exact: string };
          }
        | true
        | StreamConstraints['audio'];
      video:
        | {
            deviceId: string | { exact: string };
            width: number | { exact: number };
            height: number | { exact: number };
            frameRate?: number;
          }
        | StreamConstraints['video'];
    };

    if (
      typeof constraints.audio === 'object' &&
      constraints.audio.source === MediaFormatModule.AudioSourceInfo.MIC
    ) {
      mediaConstraints.audio = Object.create({}) as Exclude<
        typeof mediaConstraints.audio,
        true | StreamConstraints['audio']
      >;
      if (utils.isEdge()) {
        mediaConstraints.audio.deviceId = constraints.audio.deviceId!;
      } else {
        mediaConstraints.audio.deviceId = {
          exact: constraints.audio.deviceId!,
        };
      }
    } else {
      if (
        (constraints.audio as Exclude<StreamConstraints['audio'], boolean>)
          .source === MediaFormatModule.AudioSourceInfo.SCREEN_CAST
      ) {
        mediaConstraints.audio = true;
      } else {
        mediaConstraints.audio = constraints.audio;
      }
    }

    if (typeof constraints.video === 'object') {
      mediaConstraints.video = Object.create({}) as Exclude<
        typeof mediaConstraints.video,
        StreamConstraints['video']
      >;
      if (typeof constraints.video.frameRate === 'number') {
        mediaConstraints.video.frameRate = constraints.video.frameRate;
      }
      if (
        constraints.video.resolution &&
        constraints.video.resolution.width &&
        constraints.video.resolution.height
      ) {
        if (
          constraints.video.source ===
          MediaFormatModule.VideoSourceInfo.SCREEN_CAST
        ) {
          mediaConstraints.video.width = constraints.video.resolution.width;
          mediaConstraints.video.height = constraints.video.resolution.height;
        } else {
          mediaConstraints.video.width = Object.create({}) as Exclude<
            typeof mediaConstraints.video.width,
            number
          >;
          mediaConstraints.video.width.exact =
            constraints.video.resolution.width;
          mediaConstraints.video.height = Object.create({}) as Exclude<
            typeof mediaConstraints.video.height,
            number
          >;
          mediaConstraints.video.height.exact =
            constraints.video.resolution.height;
        }
      }
      if (typeof constraints.video.deviceId === 'string') {
        mediaConstraints.video.deviceId = { exact: constraints.video.deviceId };
      }
      if (
        utils.isFirefox() &&
        constraints.video.source ===
          MediaFormatModule.VideoSourceInfo.SCREEN_CAST
      ) {
        (
          mediaConstraints.video as unknown as { mediaSource: string }
        ).mediaSource = 'screen';
      }
    } else {
      mediaConstraints.video = constraints.video;
    }

    if (isVideoConstrainsForScreenCast(constraints)) {
      return navigator.mediaDevices.getDisplayMedia(mediaConstraints);
    } else {
      return navigator.mediaDevices.getUserMedia(mediaConstraints);
    }
  }

  static async getOverlayedVideoStreams(
    base: MediaStream,
    overlay: MediaStream,
  ) {
    // Prepare both players
    const baseVideo = document.createElement('video');
    const overlayVideo = document.createElement('video');
    baseVideo.muted = overlayVideo.muted = true;
    baseVideo.srcObject = base;
    overlayVideo.srcObject = overlay;
    await Promise.all([baseVideo.play(), overlayVideo.play()]);
    // Create the renderer
    const canvas = document.createElement('canvas');
    let width = (canvas.width = baseVideo.videoWidth);
    let height = (canvas.height = baseVideo.videoHeight);
    const ctx = canvas.getContext('2d')!;

    // MediaStreams can change size while streaming, so we need to handle it
    baseVideo.onresize = () => {
      width = canvas.width = baseVideo.videoWidth;
      height = canvas.height = baseVideo.videoHeight;
    };
    // Start the animation loop
    animate();

    return canvas.captureStream();

    function animate() {
      // Draw bg video
      ctx.drawImage(baseVideo, 0, 0);
      // Calculate size and position of small corner-vid (you may change it as you like)
      const overlayWidth = overlayVideo.videoWidth;
      const overlayHeight = overlayVideo.videoHeight;
      const overlayRatio = overlayWidth / overlayHeight;
      const outputHeight = height / 4;
      const outputWidth = outputHeight * overlayRatio;
      ctx.drawImage(
        overlayVideo,
        width - outputWidth,
        0,
        outputWidth,
        outputHeight,
      );
      // Do the same thing again at next screen paint
      requestAnimationFrame(animate);
    }
  }
}
