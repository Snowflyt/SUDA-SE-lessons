import { Resolution, VideoSourceInfo } from './mediaformat';
import {
  VideoTrackConstraints,
  MediaStreamFactory,
  StreamConstraints,
} from './mediastream-factory';

const quickScan = [
  {
    label: '4K(UHD)',
    width: 3840,
    height: 2160,
  },
  {
    label: '1080p(FHD)',
    width: 1920,
    height: 1080,
  },
  {
    label: 'UXGA',
    width: 1600,
    height: 1200,
    ratio: '4:3',
  },
  {
    label: '720p(HD)',
    width: 1280,
    height: 720,
  },
  {
    label: 'SVGA',
    width: 800,
    height: 600,
  },
  {
    label: 'VGA',
    width: 640,
    height: 480,
  },
  {
    label: '360p(nHD)',
    width: 640,
    height: 360,
  },
  {
    label: 'CIF',
    width: 352,
    height: 288,
  },
  {
    label: 'QVGA',
    width: 320,
    height: 240,
  },
  {
    label: 'QCIF',
    width: 176,
    height: 144,
  },
  {
    label: 'QQVGA',
    width: 160,
    height: 120,
  },
];

export default function getSupportCameraResolutions() {
  return new Promise((resolve) => {
    const resolutions: Resolution[] = [];
    let ok = 0;
    let err = 0;
    for (let i = 0; i < quickScan.length; ++i) {
      const videoConstraints = new VideoTrackConstraints(
        VideoSourceInfo.CAMERA,
      );
      videoConstraints.resolution = new Resolution(
        quickScan[i]!.width,
        quickScan[i]!.height,
      );

      MediaStreamFactory.createMediaStream(
        new StreamConstraints(false, videoConstraints),
      )
        .then(() => {
          resolutions.push(quickScan[i]!);
          ok++;
          if (ok + err == quickScan.length) {
            resolve(resolutions);
          }
        })
        .catch(() => {
          err++;
          if (ok + err == quickScan.length) {
            resolve(resolutions);
          }
        });
    }
  });
}

export const getAllScanResolutions = () => quickScan;

export const isSupportResolution = (width: number, height: number) => {
  return new Promise(function (resolve, reject) {
    const videoConstraints = new VideoTrackConstraints(VideoSourceInfo.CAMERA);
    videoConstraints.resolution = new Resolution(width, height);

    MediaStreamFactory.createMediaStream(
      new StreamConstraints(false, videoConstraints),
    )
      .then(() => {
        resolve(undefined);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
