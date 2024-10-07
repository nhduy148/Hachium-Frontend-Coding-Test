import { API_URL } from '@libs/constants';
import axios from 'axios';
import { isArray } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { compile } from 'path-to-regexp';
import qs from 'qs';
import { RequestOptions } from './api';

let store: {
  dispatch: (action: any) => void;
  getState: () => any;
  reduxActions: (() => void)[];
  otherActions: (() => void)[];
};

type InjectStoreArgs = {
  reduxActions: (() => void)[];
  otherActions: (() => void)[];
};

export const injectStore = (_store: any, { reduxActions, otherActions }: InjectStoreArgs) => {
  store = _store;
  store.reduxActions = reduxActions;
  store.otherActions = otherActions;
};

const codeMessage = {
  400: 'There was an error in the request, and the server did not create or modify data.',
  401: 'The user does not have permissions.',
  403: 'The user is authorized, but access is prohibited.',
  404: 'The request was made for a record that does not exist, and the server did not perform an operation.',
  422: 'When creating an object, a validation error occurred.',
  500: 'A server error occurred. Please check the server.',
  502: 'Gateway error.',
  503: 'Services are unavailable and the server is temporarily overloaded or maintained.',
  504: 'Gateway timed out.',
};

export const Request = async (url: string, options: RequestOptions) => {
  const {
    data,
    baseURL = API_URL,
    isAuthorized = true,
    headers = { 'Content-Type': 'application/json' },
    method,
    params,
    urlParams,
    endpointKey,
  } = options;

  const value = method === 'GET' ? params : data;
  let cloneData;
  if (data instanceof FormData) {
    cloneData = data;
  } else {
    cloneData = cloneDeep(value);
  }

  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    url = compile(url)(urlParams);

    url = domain + url;
  } catch (e) {
    //Show error
  }

  options.headers = {
    ...headers,
    isAuthorized,
  };
  options.url = url;

  if (method === 'GET') {
    options.params = cloneData;
    options.data = undefined;
  } else {
    options.data = cloneData;
    options.params = params;
  }
  options.baseURL = baseURL;

  options.paramsSerializer = function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  };

  return axios(options)
    .then((response) => {
      if (!response?.data?.success) {
        return Promise.reject({ response });
      }
      const { statusText, status, data } = response;

      let result: { [key: string]: any; pagination?: object } = {};
      if (isArray(data?.data)) {
        const { data: list, success, ...pagination } = data;
        result.pagination = pagination;
        result['list'] = list;
      } else if (typeof data?.data === 'object' || typeof data?.data === 'string') {
        result = data?.data;
      } else {
        result = data;
      }

      const res = {
        success: true,
        message: statusText,
        statusCode: status,
        data: result,
      };

      return Promise.resolve(res);
    })
    .catch((error) => {
      let error_message;
      let error_code;
      let statusCode;

      const { response } = error;

      if (response && response instanceof Object) {
        const { data } = response;

        statusCode = response?.status ?? 400;

        error_message =
          data?.error_message ||
          data?.error_code ||
          data?.error ||
          data?.message ||
          codeMessage?.[statusCode as keyof typeof codeMessage];

        error_code = data?.error_code;
      } else {
        statusCode = 600;
        error_message = error.message || 'Network Error';
        error_code = 'network_error';
      }

      if (statusCode === 401 || statusCode === 403) {
        // Handle logout
        if (isArray(store?.reduxActions)) {
          store?.reduxActions.forEach((fn: () => void) => {
            store?.dispatch(fn?.());
          });
        }
        if (isArray(store?.otherActions)) {
          store?.otherActions.forEach((fn: () => void) => {
            fn?.();
          });
        }
      }

      if (statusCode === 403) {
        // history.push("/403");
      }
      if (statusCode <= 504 && statusCode >= 500) {
        // history.push("/500");
      }
      if (statusCode >= 404 && statusCode < 422) {
        // history.push("/404");
      }

      return Promise.reject({
        success: false,
        statusCode,
        error_message,
        error_code,
      });
    });
};

axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    if (config.headers) {
      config.headers['x-nexpos-language'] = 'vi';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
