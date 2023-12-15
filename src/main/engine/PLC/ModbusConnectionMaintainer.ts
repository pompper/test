import ModbusRTU from 'modbus-serial';
import { PLCModbusConfig } from '../interfaces/PLCConnectStrategy';

export default class ModbusConnectionMaintainer {
  private hasFailed: boolean = false;
  private lastRequestTimestamp: number = 0;
  config!: PLCModbusConfig;
  clientModbusTCP!: ModbusRTU;

  constructor(modbusConfig: PLCModbusConfig) {
    this.config = modbusConfig;
    this.clientModbusTCP = new ModbusRTU();
  }

  public async connect() {
    // open connection to a tcp line
    this.clientModbusTCP.connectTCP(this.config.host, {
      port: this.config.port,
    });
    this.clientModbusTCP.setID(this.config.unitId);
    this.clientModbusTCP.setTimeout(this.config.timeout);
  }

  // Method to perform the internet request
  private performInternetRequest(): Promise<any> {
    // Simulating an internet request that might fail
    return new Promise((resolve, reject) => {
      // Logic for making the internet request...

      // Assuming the request fails
      const requestFailed = true;

      if (requestFailed) {
        this.handleFailedRequest(); // Call method to handle the failed request
        reject(new Error('Request failed'));
      } else {
        this.hasFailed = false; // Reset the flag when the request succeeds
        resolve('Request succeeded');
      }
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
  public async maintainConnectionLoop(): Promise<void> {
    try {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.lastRequestTimestamp;

      if (elapsedTime >= this.config.requestInterval) {
        await this.performInternetRequest(); // Perform the internet request
        this.lastRequestTimestamp = Date.now(); // Update the timestamp after the request
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
