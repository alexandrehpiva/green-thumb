import { ApiError } from '../../types/apiTypes';

/**
 * Validate an ApiError object
 * @param data Any object
 * @returns is ApiError type validation
 */
const isApiError = (data: any): data is ApiError => {
  return 'error' in data && 'status' in data;
};

export default isApiError;
