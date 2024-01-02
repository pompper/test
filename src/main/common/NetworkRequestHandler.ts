/* eslint-disable default-param-last */

import axios, { Axios, AxiosInstance } from 'axios';
import { BaseApiEndpoint } from './ApiEndpoints';
import { RequestMethod } from './NetworkRequestMethod';
import logger from '../logger';

export interface ApiError {
  message: string;
  status: number;
}

export default class NetworkRequestHandler {
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      timeout: 5000,
    });
  }

  // private async makeRequest<T>(
  //   endpoint: string,
  //   method: RequestMethod = RequestMethod.GET,
  //   body?: Record<string, any>,
  // ): Promise<T> {
  //   // const url = `${this.baseURL}${endpoint}`;

  //   try {
  //     const { data, status } = await this.axiosInstance.get<T>(endpoint, {
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     });
  //     // mockup response
  //     return data as T;
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }

  // public async get<T>(endpoint: BaseApiEndpoint): Promise<T> {
  //   return this.makeRequest<T>(endpoint);
  // }

  // public async post<T>(
  //   endpoint: BaseApiEndpoint,
  //   body: Record<string, any>,
  // ): Promise<T> {
  //   return this.makeRequest<T>(endpoint, RequestMethod.POST, body);
  // }

  public async get<T>(endpoint: BaseApiEndpoint): Promise<T> {
    try {
      const { data, status } = await this.axiosInstance.get<T>(endpoint);
      return data as T;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async post<T>(
    endpoint: BaseApiEndpoint,
    body: Record<string, any>,
  ): Promise<T> {
    try {
      const { data, status } = await this.axiosInstance.post<T>(endpoint, body);
      return data as T;
    } catch (error: any) {
      throw new Error('Endpoint: ' + endpoint + ' Error: ' + error);
    }
  }

  // Implement other HTTP methods as needed (PUT, DELETE, etc.)
}
