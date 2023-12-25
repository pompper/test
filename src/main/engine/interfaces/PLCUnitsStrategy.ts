import ModbusUnit from '../PLC/ModbusUnit';

export type PLCModbusConfig = {
  host: string;
  port: number;
  unitId: number;
  requestInterval: number;
  timeout: number;
};

export default interface PLCUnitsStrategy {
  modbusConfigs: Record<number, PLCModbusConfig>;
  units: Record<number, ModbusUnit>;

  connect(slaveId: number): boolean;
  disconnect(slaveId: number): boolean;
  ping(slaveId: number): boolean;
}
