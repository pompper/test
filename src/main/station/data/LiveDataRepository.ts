import { Cabinet, Slot, StationLiveData } from '../model/StationItem';

export default class LiveDataRepository {
  private instance!: StationLiveData;

  constructor() {
    this.instance = {
      cabinets: [],
    };
  }

  getCabinetByLocalId(localId: number): Cabinet | undefined {
    return this.instance.cabinets.find(
      (cabinet) => cabinet.localId === localId,
    );
  }

  getSlotByLocalIdAndCabinetLocalId(
    cabinetLocalId: number,
    slotLocalId: number,
  ): Slot | undefined {
    const cabinet = this.getCabinetByLocalId(cabinetLocalId);
    if (!cabinet) {
      return undefined;
    }
    return cabinet.slots.find((slot) => slot.localId === slotLocalId);
  }

  setSlotRFIDByLocalIdAndCabinetLocalId(
    cabinetLocalId: number,
    slotLocalId: number,
    rfid: string,
  ): void {
    const slot = this.getSlotByLocalIdAndCabinetLocalId(
      cabinetLocalId,
      slotLocalId,
    );
    if (!slot) {
      return;
    }
    slot.rfid = rfid;
  }
}
