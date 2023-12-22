/* eslint-disable import/prefer-default-export */
export const APP_CONFIG_JSON_PATH = '/configs/appConfigs.json';
export const UPDATERLOOP_MIN_INTERVAL_MS = 10;

export enum EngineEventChannel {
  PLC_DATA_UPDATED = 'plc:dataUpdated',
  PLC_CONNECTED = 'plc:connected',
  PLC_DISCONNECTED = 'plc:disconnected',
  PLC_ERROR = 'plc:error',
}
