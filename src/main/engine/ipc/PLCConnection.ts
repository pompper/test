import PLCConnectStrategy, { PLCConnectInput } from '../PLCConnectStrategy';

export default class PLCConnection implements PLCConnectStrategy {
  plcConnections!: Record<number, PLCConnectInput>;

  constructor(plcConnections: PLCConnectInput[]) {
    this.plcConnections = {};
    this.setPLCConntection(plcConnections);
  }

  setPLCConntection(plcConnections: PLCConnectInput[]) {
    plcConnections.forEach((p, i) => {
      this.plcConnections[p.unitId] = p;
    });
  }

  connect(slaveId: number): boolean {
    throw new Error('Method not implemented.');
  }
  disconnect(slaveId: number): boolean {
    throw new Error('Method not implemented.');
  }
  ping(): boolean {
    throw new Error('Method not implemented.');
  }
}
