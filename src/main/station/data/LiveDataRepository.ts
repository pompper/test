import { Slot } from '../model/SlotLiveData';
import { Cabinet, StationDataMap, StationLiveData } from '../model/StationItem';

export default class LiveDataRepository {
  private instance!: StationLiveData;

  constructor() {
    this.instance = {
      cabinets: [],
    };
  }

  initialize(dataMap: StationDataMap): void {
    this.createInstance(dataMap);
  }

  private createInstance(dataMap: StationDataMap): void {
    this.instance.cabinets = dataMap.cabinets.map((d) => {
      const slots: Slot[] = d.slots.map((s, i) => {
        const newSlot: Slot = {
          id: s.id,
          localId: s.localId,
          rfid: '',
        };
        return newSlot;
      });

      const newCabinet: Cabinet = {
        id: d.id,
        localId: d.localId,
        slots,
        lastUpdateTimestamp: Date.now(),
      };
      newCabinet.slots.forEach((s) => {
        s.cabinet = newCabinet;
      });
      return newCabinet;
    });
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
    if (!slot || !slot.cabinet) {
      return;
    }
    slot.rfid = rfid;
    slot.cabinet.lastUpdateTimestamp = Date.now();
  }
}
