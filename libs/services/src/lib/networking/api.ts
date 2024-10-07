import { API_URL } from '@libs/constants';
import { AxiosRequestConfig, Method } from 'axios';
import { Endpoints } from '../endpoints';
import { Request } from './services';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export type RequestOptions = AxiosRequestConfig & {
  isAuthorized?: boolean;
  urlParams?: object;
  endpointKey?: string;
};

const gen = (params: string, endpointKey: string, baseURL = API_URL) => {
  let url = params;
  let method: Method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0] as Method;
    url = paramsArray?.[1];
  }

  return function (data: any, options: RequestOptions = {}) {
    return Request(url, {
      data: method === 'GET' ? null : data,
      method,
      // eslint-disable-next-line no-nested-ternary
      params: options?.params ? options?.params : method === 'GET' ? data : null,
      baseURL,
      headers: options?.headers,
      urlParams: options?.urlParams,
      endpointKey: endpointKey,
    });
  };
};

type APIMap = {
  [key in keyof typeof Endpoints]: <T>(data?: any, option?: RequestOptions) => Promise<ApiResponse<T>>;
};

const Api = {};
for (const key in Endpoints) {
  // @ts-expect-error 123
  Api[key] = gen(Endpoints[key], key);
}

export default Api as APIMap;
