import Events from './base/event';
import getSupportCameraResolutions, {
  getAllScanResolutions,
  isSupportResolution,
} from './base/resolutionfind';

export * from './endpoint/endpoint';
export * as Media from './base';
export {
  Events,
  getSupportCameraResolutions,
  getAllScanResolutions,
  isSupportResolution,
};
