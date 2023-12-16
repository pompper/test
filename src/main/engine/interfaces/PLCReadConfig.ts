export type PLCReadConfig = {
  plcReadConfig: {
    readModbus: {
      holdingRegisters: {
        start: number;
        end: number;
      };
      coils: {
        start: number;
        end: number;
      };
    };
  };
};
