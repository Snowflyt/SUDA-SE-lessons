/**
 * Source info about an audio track. Values: 'mic', 'screen-cast', 'file', 'mixed'.
 */
export enum AudioSourceInfo {
  MIC = 'mic',
  SCREEN_CAST = 'screen-cast',
  FILE = 'file',
  MIXED = 'mixed',
}

/**
 * Source info about a video track. Values: 'camera', 'screen-cast', 'file', 'mixed'.
 */
export enum VideoSourceInfo {
  CAMERA = 'camera',
  SCREEN_CAST = 'screen-cast',
  FILE = 'file',
  MIXED = 'mixed',
}

/**
 * Kind of a track. Values: 'audio' for audio track, 'video' for video track, 'av' for both audio and video tracks.
 */
export enum TrackKind {
  /**
   * Audio tracks.
   */
  AUDIO = 'audio',
  /**
   * Video tracks.
   */
  VIDEO = 'video',
  /**
   * Both audio and video tracks.
   */
  AUDIO_AND_VIDEO = 'av',
}

/**
 * The Resolution defines the size of a rectangle.
 */
export class Resolution {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}
