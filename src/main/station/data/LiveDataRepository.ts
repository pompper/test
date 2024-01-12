import { EventEmitter } from 'stream';
import { Slot } from '../model/SlotLiveData';
import { Cabinet, StationDataMap, StationLiveData } from '../model/StationItem';
import { StationEventChannel } from '../common/Constants';

export default class LiveDataRepository extends EventEmitter {
  private instance!: StationLiveData;

  constructor() {
    super();
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
          cabinetLocalId: d.localId,
        };
        return newSlot;
      });

      const newCabinet: Cabinet = {
        id: d.id,
        localId: d.localId,
        slotCount: d.slotCount,
        slots,
        lastUpdateTimestamp: Date.now(),
      };

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

    if (slot === undefined) {
      throw new Error(
        `Slot not found at Cabinet:${cabinetLocalId} Slot:${slotLocalId}`,
      );
    }

    this.setNewSlotRFID(slot, rfid);
  }
  setNewSlotRFID(slot: Slot, rfid: string): void {
    // emit event only if rfid changed
    if (slot.rfid !== rfid) {
      this.emitSlotRfidChangeEvent(slot, rfid);
    }
    slot.rfid = rfid;
    this.emitSlotUpdateEvent(slot, rfid);
  }

  private emitSlotRfidChangeEvent(slot: Slot, newRfid: string): void {
    this.emit(StationEventChannel.STATION_LIVEDATA_CHANGED, {
      cabinetLocalId: slot.cabinetLocalId,
      slotLocalId: slot.localId,
      previousRfid: slot.rfid,
      newRfid,
    });
  }

  private emitSlotUpdateEvent(slot: Slot, rfid: string): void {
    this.emit(StationEventChannel.STATION_LIVEDATA_UPDATED, {
      cabinetLocalId: slot.cabinetLocalId,
      slotLocalId: slot.localId,
      rfid,
    });
  }

  public getInstance(): StationLiveData {
    return this.instance;
  }
}
