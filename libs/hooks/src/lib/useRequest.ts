/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type ReturnTypeOrPromise<T extends (...args: any) => any> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : ReturnType<T>;

type Props<R extends (...args: any[]) => any> = [
  R,
  {
    defaultData?: R;
    onSuccess?: (data: ReturnTypeOrPromise<R>) => void;
    onError?: (error: any) => void;
  },
];

export function useRequest<R extends (...args: any[]) => any>(request: Props<R>[0], options?: Props<R>[1]) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<ReturnTypeOrPromise<R> | undefined>(options?.defaultData);
  const [error, setError] = React.useState(null);

  const requestAPI = React.useCallback(
    async (...args: Parameters<R>) => {
      setIsLoading(true);
      request(...args)
        .then((res: ReturnTypeOrPromise<R>) => {
          setData(res);
          options?.onSuccess?.(res);
        })
        .catch((err: any) => {
          setError(err);
          options?.onError?.(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [options, request],
  );

  return {
    isLoading,
    data,
    error,
    request: requestAPI,
  };
}
