export type PLCModbusConfig = {
  host: string;
  port: number;
  unitId: number;
  requestInterval: number;
  timeout: number;
};

export default interface PLCConnectStrategy {
  modbusConfigs: Record<number, PLCModbusConfig>;

  connect(slaveId: number): boolean;
  disconnect(slaveId: number): boolean;
  ping(slaveId: number): boolean;
}
