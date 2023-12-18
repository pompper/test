/* eslint-disable import/prefer-default-export */
import { IpcRenderer, ipcRenderer } from 'electron';
import { SettingsModel } from '../engine/model/SettingsModel';
import { IPCActionTopic } from './IPCActions';
import IEngineControllerRendererIPC from './IEngineControllerRendererIpc';

export const engineControllerRendererIPC: IEngineControllerRendererIPC = {
  connect(unitId: number): void {
    ipcRenderer.invoke(IPCActionTopic.connect, unitId);
  },
  ping(unitId: number): void {
    ipcRenderer.invoke(IPCActionTopic.ping, unitId);
  },
  async getSettings(): Promise<SettingsModel> {
    return ipcRenderer.invoke(IPCActionTopic.getSettings);
  },
  saveSettings(settings: SettingsModel): void {
    throw new Error('Function not implemented.');
  },
};
