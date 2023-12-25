/* eslint-disable default-param-last */

import { BaseApiEndpoint } from './ApiEndpoints';
import { RequestMethod } from './NetworkRequestMethod';

export default class NetworkRequestHandler {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: RequestMethod = RequestMethod.GET,
    body?: Record<string, any>,
  ): Promise<T> {
    throw new Error('Method not implemented.');
    // const url = `${this.baseURL}${endpoint}`;
    // // ... rest of the implementation remains the same
  }

  public async get<T>(endpoint: BaseApiEndpoint): Promise<T> {
    return this.makeRequest<T>(endpoint);
  }

  public async post<T>(
    endpoint: BaseApiEndpoint,
    body: Record<string, any>,
  ): Promise<T> {
    return this.makeRequest<T>(endpoint, RequestMethod.POST, body);
  }

  // Implement other HTTP methods as needed (PUT, DELETE, etc.)
}
