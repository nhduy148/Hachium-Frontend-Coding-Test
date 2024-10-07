export const DEFAULT_ROW_PER_PAGE = 20;
export const DEFAULT_PAGINATION_PARAMS = { page: 1, limit: DEFAULT_ROW_PER_PAGE };
export const DEFAULT_PAGINATION_DATA = {
  ...DEFAULT_PAGINATION_PARAMS,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  totalDocs: 0,
};
export const ROW_PER_PAGE_OPTIONS = [10, 20, 30, 50, 100];
