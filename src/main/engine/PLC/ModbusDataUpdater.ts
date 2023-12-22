import logger from '../../logger';
import PLCController from '../PLCController';
import { EngineEventChannel } from '../data/constants';
import IModbusUpdater from '../interfaces/IModbusUpdater';
import ModbusConnectionMaintainer from './ModbusConnectionMaintainer';
import { ModbusPLCDataModel } from './ModbusPLCDataModel';

/**
 * Represents a Modbus data updater that listens for Modbus events and updates the PLC data.
 */
export default class ModbusUpdater implements IModbusUpdater {
  retryReconnectIntervalMs: number = 3000;
  lastConnectAttemptTimestamp: number = 0;

  constructor(public plcController: PLCController) {}

  /**
   * Initializes the ModbusUpdater by setting up event listeners.
   */
  public initialize(): void {
    this.listenModbusRead();
    this.listenModbusError();
  }

  private listenModbusRead() {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.plcController.modbus.connections) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.plcController.modbus.connections,
          key,
        )
      ) {
        this.plcController.modbus.connections[key].event.on(
          'data',
          (data: ModbusPLCDataModel) => {
            logger.debug(data);
            this.plcController.data.setPLCData(data.unitId, data);
            this.plcController.emit(EngineEventChannel.PLC_DATA_UPDATED, data);
          },
        );
      }
    }
  }

  private listenModbusError() {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.plcController.modbus.connections) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.plcController.modbus.connections,
          key,
        )
      ) {
        this.plcController.modbus.connections[key].event.on(
          'error',
          (error: Error) => {
            console.error(error.message);
          },
        );
      }
    }
  }

  /**
   * Updates the Modbus connections by calling the update function for each connection.
   */
  update(): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.plcController.modbus.connections) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.plcController.modbus.connections,
          key,
        )
      ) {
        this.updateEach(parseInt(key, 10));
      }
    }
  }

  /**
   * Updates a single Modbus connection.
   * @param key defines the key of the connection to update
   */
  private updateEach(key: number) {
    const connection = this.plcController.modbus.connections[key];
    connection.update();

    // auto reconnect function
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.lastConnectAttemptTimestamp;

    if (
      !connection.isConnected &&
      connection.status === 'disconnected' &&
      this.plcController.engine.configs.isAutoReconnectPLC
    ) {
      if (elapsedTime >= this.retryReconnectIntervalMs) {
        this.lastConnectAttemptTimestamp = Date.now();
        this.plcController.modbus.connections[key].connect();
      } else {
        const remainingTime = this.retryReconnectIntervalMs - elapsedTime;
        logger.silly(`retrying connection in ${remainingTime} ms`);
      }
    }
  }
}
