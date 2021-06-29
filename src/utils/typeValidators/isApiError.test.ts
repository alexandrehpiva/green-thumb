import isApiError from './isApiError';

describe('Unit(isApiError)', () => {
  it('should return true if is an object of type ApiError', () => {
    const apiErrorObj = {
      status: 500,
      error: 'Server error.',
    };

    expect(isApiError(apiErrorObj)).toBe(true);
  });

  const data = [{}, [], 1, 0, 'str', '', true, false];
  it.each(data)(
    'should return false if is not an object of type ApiError',
    value => {
      expect(isApiError(value)).toBe(false);
    }
  );
});
