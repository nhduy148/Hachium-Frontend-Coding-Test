export type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}`;
    }[keyof T]
  : never;

export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? '' : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type Pagination = {
  page: number;
  limit: number;
};

export type PaginationResponse = Pagination & {
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
};

export type RequestListResponse<T> = {
  success: boolean;
  list: T[];
  pagination: PaginationResponse;
};

export type RequestResponse<T> = {
  success: boolean;
  data: T;
};

export type BuildEnvironment = 'local' | 'dev' | 'prod';

export type ThemeMode = 'dark' | 'light';

export interface IDocument {
  _id: string;
  created_at: string;
  updated_at: string;
}

export interface IDocument {
  _id: string;
  created_at: string;
  updated_at: string;
}
