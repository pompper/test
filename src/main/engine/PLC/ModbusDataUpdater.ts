import PLCController from '../PLCController';
import IModbusDataUpdater from '../interfaces/IModbusDataUpdater';
import ModbusConnectionMaintainer from './ModbusConnectionMaintainer';
import { ModbusPLCDataModel } from './ModbusPLCDataModel';

export default class ModbusDataUpdater implements IModbusDataUpdater {
  constructor(public plcController: PLCController) {}

  public initialize(): void {
    this.listenModbusRead();
  }

  public listenModbusRead() {
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
            this.plcController.data.setPLCData(data.unitId, data);
          },
        );
      }
    }
  }

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

  private updateEach(key: number) {
    this.plcController.modbus.connections[key].update();
  }
}
