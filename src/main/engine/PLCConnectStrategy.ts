export type PLCConnectInput = {
  host: string;
  port: number;
  unitId: number;
};

export default interface PLCConnectStrategy {
  plcConnections: Record<number, PLCConnectInput>;

  connect(slaveId: number): boolean;
  disconnect(slaveId: number): boolean;
  ping(slaveId: number): boolean;
}
