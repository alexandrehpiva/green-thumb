import { ApiError, Plant } from '../types/apiTypes';
import plantsService from './plantsService';

describe('Unit(plantsService)', () => {
  it('should send the api response correctly if no server error', async () => {
    const mockData: Plant[] = [
      {
        id: 1,
        name: 'Euphorbia eritrea',
        sun: 'high',
        water: 'rarely',
        url: 'https://storage.googleapis.com/front-br-challenges.appspot.com/green-thumb-v2/plants/euphorbia-eritrea.png',
        price: 25,
        toxicity: false,
        staff_favorite: true,
      },
    ];

    // Mocking global fetch
    global.fetch = jest.fn(
      (_input: RequestInfo, _init?: RequestInit): Promise<Response> => {
        return Promise.resolve({
          json: () => Promise.resolve(mockData),
        } as Response);
      }
    );

    const response = await plantsService.get('high', 'rarely', false);

    expect(response).toEqual(mockData);
  });

  it('should return a ApiError response when catch some error', async () => {
    const mockError: ApiError = {
      status: 500,
      error: 'Server error',
    };

    // Mocking global fetch
    global.fetch = jest.fn(
      (_input: RequestInfo, _init?: RequestInit): Promise<Response> => {
        return Promise.reject(mockError);
      }
    );

    const response = await plantsService.get('high', 'rarely', false);

    expect(response).toBe(mockError);
  });
});
