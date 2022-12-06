const ApiError = require('../ApiError');

describe('ApiError', () => {
    it('should return status code when called.', () => {
        const statusCode = '404';
        const err = new ApiError(statusCode);

        expect(err.details).toEqual({statusCode});
      });
});