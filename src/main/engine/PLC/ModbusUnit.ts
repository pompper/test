import ModbusRTU from 'modbus-serial';
import EventEmitter from 'events';
import { PLCModbusConfig } from '../interfaces/PLCUnitsStrategy';
import { ModbusPLCDataModel } from './ModbusPLCDataModel';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';
import logger from '../../logger';

export type ModbusConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'connecting';

export default class ModbusUnit {
  private hasFailed: boolean = false;
  private lastRequestTimestamp: number = 0;
  config!: PLCModbusConfig;
  clientModbusTCP!: ModbusRTU;
  isConnected!: boolean;
  holdingRegistersData: number[] = [];
  event!: EventEmitter;
  plcReadConfig!: PLCReadConfig;
  status: ModbusConnectionStatus = 'disconnected';

  constructor(modbusConfig: PLCModbusConfig, plcReadConfig: PLCReadConfig) {
    this.config = modbusConfig;
    this.clientModbusTCP = new ModbusRTU();
    this.isConnected = false;
    this.event = new EventEmitter();
    this.plcReadConfig = plcReadConfig;

    this.clientModbusTCP.setID(this.config.unitId);
    this.clientModbusTCP.setTimeout(this.config.timeout);
  }

  public async connect(): Promise<boolean> {
    this.status = 'connecting';
    logger.debug(
      `connecting PLC: ${this.config.host} UnitID: ${this.config.unitId}`,
    );
    // open connection to a tcp line
    return this.clientModbusTCP
      .connectTCP(this.config.host, {
        port: this.config.port,
      })
      .then(() => {
        this.isConnected = true;
        this.status = 'connected';
        logger.debug(
          `PLC connected successfully: ${this.config.host} UnitID: ${this.config.unitId}`,
        );
        return true;
      })
      .catch((err: Error) => {
        this.status = 'disconnected';
        this.isConnected = false;
        logger.error(
          `Failed to connect to PLC: ${this.config.host} UnitID: ${this.config.unitId}
          Reason: ${err.message}`,
        );
        this.event.emit('error', err);
        return false;
      });
  }

  // Method to perform the internet request
  private readHoldingRegisters(
    start: number,
    length: number,
  ): Promise<number[]> {
    // Simulating an internet request that might fail
    return new Promise((resolve, reject) => {
      // Logic for making the internet request...
      this.clientModbusTCP
        .readHoldingRegisters(start, length)
        .then((data) => {
          this.hasFailed = false; // Reset the flag when the request succeeds
          return resolve(data.data);
        })
        .catch((e: Error) => {
          return reject(e);
        });
    });
  }

  // Method to handle the failed request and trigger the action once
  private handleFailedRequest(): void {
    if (!this.hasFailed) {
      this.hasFailed = true;
      this.isConnected = false;
      this.status = 'disconnected';

      // Perform action or trigger webhook for the failed request
      console.log('Triggering webhook for failed request...');

      // Set flag to true to indicate the action has been triggered
      this.hasFailed = true;
    }
  }

  // Method to maintain the loop of internet requests
  public async update(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.lastRequestTimestamp;
    if (elapsedTime >= this.config.requestInterval) {
      this.lastRequestTimestamp = Date.now(); // Update the timestamp after the request
      try {
        const { start, length } =
          this.plcReadConfig.readModbus.holdingRegisters;
        this.holdingRegistersData = await this.readHoldingRegisters(
          start,
          length,
        ); // Perform the Modbus request

        const eventEmit: ModbusPLCDataModel = {
          unitId: this.config.unitId,
          data: {
            holdingRegisters: this.holdingRegistersData,
            // coils: [],
          },
        };
        this.event.emit('data', eventEmit);
      } catch (error) {
        logger.error(error);
        this.event.emit('error', error);
        this.handleFailedRequest();
      }
    } else {
      const remainingTime = this.config.requestInterval - elapsedTime;
      logger.silly(
        `Waiting for ${remainingTime} ms before making the next request...`,
      );
    }
  }
}
