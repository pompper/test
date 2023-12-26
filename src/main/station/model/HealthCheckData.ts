import { Cabinet } from './StationItem';

export type HealthCheckData = {
  id: string;
  stationLiveData: {
    cabinets: Cabinet[];
  };
};
