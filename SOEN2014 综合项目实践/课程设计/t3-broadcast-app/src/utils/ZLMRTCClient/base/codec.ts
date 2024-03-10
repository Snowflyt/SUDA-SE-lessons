/**
 * Audio codec enumeration.
 */
export enum AudioCodec {
  PCMU = 'pcmu',
  PCMA = 'pcma',
  OPUS = 'opus',
  G722 = 'g722',
  ISAC = 'iSAC',
  ILBC = 'iLBC',
  AAC = 'aac',
  AC3 = 'ac3',
  NELLYMOSER = 'nellymoser',
}

/**
 * Codec parameters for an audio track.
 */
export class AudioCodecParameters {
  name: AudioCodec;
  channelCount?: number;
  clockRate?: number;

  /**
   * @param name Name of a codec. Please use a value in Owt.Base.AudioCodec. However, some functions do not support all the values in Owt.Base.AudioCodec.
   * @param channelCount Numbers of channels for an audio track.
   * @param clockRate The codec clock rate expressed in Hertz.
   */
  constructor(name: AudioCodec, channelCount?: number, clockRate?: number) {
    this.name = name;
    this.channelCount = channelCount;
    this.clockRate = clockRate;
  }
}

/**
 * Encoding parameters for sending an audio track.
 */
export class AudioEncodingParameters {
  codec: AudioCodecParameters;
  maxBitrate?: number;

  constructor(codec: AudioCodecParameters, maxBitrate?: number) {
    this.codec = codec;
    this.maxBitrate = maxBitrate;
  }
}

/**
 * Video codec enumeration.
 */
export enum VideoCodec {
  VP8 = 'vp8',
  VP9 = 'vp9',
  H264 = 'h264',
  H265 = 'h265',
}

/**
 * Codec parameters for a video track.
 */
export class VideoCodecParameters {
  name: string;
  profile?: string;

  /**
   * @param name Name of a codec. Please use a value in Owt.Base.VideoCodec. However, some functions do not support all the values in Owt.Base.AudioCodec.
   * @param profile The profile of a codec. Profile may not apply to all codecs.
   */
  constructor(name: VideoCodec, profile?: string) {
    this.name = name;
    this.profile = profile;
  }
}

/**
 * Encoding parameters for sending a video track.
 */
export class VideoEncodingParameters {
  codec: VideoCodecParameters;
  maxBitrate?: number;

  /**
   * @param codec
   * @param maxBitrate Max bitrate expressed in kbps.
   */
  constructor(codec: VideoCodecParameters, maxBitrate?: number) {
    this.codec = codec;
    this.maxBitrate = maxBitrate;
  }
}
