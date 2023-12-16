import ModbusRTU from 'modbus-serial';
import EventEmitter from 'events';
import { PLCModbusConfig } from '../interfaces/PLCConnectStrategy';
import { ModbusPLCDataModel } from './ModbusPLCDataModel';
import { PLCReadConfig } from '../interfaces/PLCReadConfig';

export default class ModbusConnectionMaintainer {
  private hasFailed: boolean = false;
  private lastRequestTimestamp: number = 0;
  config!: PLCModbusConfig;
  clientModbusTCP!: ModbusRTU;
  isConnected!: boolean;
  holdingRegistersData: number[] = [];
  event!: EventEmitter;
  plcReadConfig!: PLCReadConfig;

  constructor(modbusConfig: PLCModbusConfig, plcReadConfig: PLCReadConfig) {
    this.config = modbusConfig;
    this.clientModbusTCP = new ModbusRTU();
    this.isConnected = false;
    this.event = new EventEmitter();
    this.plcReadConfig = plcReadConfig;
  }

  public async connect() {
    // open connection to a tcp line
    this.clientModbusTCP
      .connectTCP(this.config.host, {
        port: this.config.port,
      })
      .then(() => {
        this.isConnected = true;
        return true;
      })
      .catch((err) => {
        console.error(err);
      });
    this.clientModbusTCP.setID(this.config.unitId);
    this.clientModbusTCP.setTimeout(this.config.timeout);
  }

  // Method to perform the internet request
  private readHoldingRegisters(): Promise<any> {
    const { start, end } =
      this.plcReadConfig.plcReadConfig.readModbus.holdingRegisters;
    // Simulating an internet request that might fail
    return new Promise((resolve, reject) => {
      // Logic for making the internet request...
      this.clientModbusTCP
        .readHoldingRegisters(start, end)
        .then((data) => {
          this.hasFailed = false; // Reset the flag when the request succeeds
          return resolve(data);
        })
        .catch((e) => {
          this.handleFailedRequest(); // Call method to handle the failed request
          return reject(new Error('Request failed'));
        });
    });
  }

  // Method to handle the failed request and trigger the action once
  private handleFailedRequest(): void {
    if (!this.hasFailed) {
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
    try {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.lastRequestTimestamp;

      if (elapsedTime >= this.config.requestInterval) {
        this.holdingRegistersData = await this.readHoldingRegisters(); // Perform the Modbus request
        this.lastRequestTimestamp = Date.now(); // Update the timestamp after the request

        const eventEmit: ModbusPLCDataModel = {
          unitId: this.config.unitId,
          data: {
            holdingRegisters: this.holdingRegistersData,
          },
        };
        this.event.emit('data', eventEmit);
      } else {
        const remainingTime = this.config.requestInterval - elapsedTime;
        console.log(
          `Waiting for ${remainingTime} ms before making the next request...`,
        );
        // await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }
    } catch (error) {
      console.error('Error:', error);
      // Retry the internet request immediately in case of failure (or perform some backoff strategy)
    }
  }
}
