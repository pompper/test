import { HealthCheckData } from '../station/model/HealthCheckData';
import { BaseApiEndpoint } from './ApiEndpoints';
import NetworkRequestHandler from './NetworkRequestHandler';

export default abstract class API {
  private static networkHandler: NetworkRequestHandler;

  static initialize(baseURL: string) {
    API.networkHandler = new NetworkRequestHandler(baseURL);
  }

  static async sendHealthStatus(data: HealthCheckData): Promise<any> {
    return API.networkHandler.post<any>(BaseApiEndpoint.HEALTH_CHECK, data);
  }
}
