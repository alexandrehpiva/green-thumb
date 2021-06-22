import { ApiError, Plant } from '../types/apiTypes';

const urlBase = 'https://front-br-challenges.web.app';

const plantsService = {
  async get(
    sun: string,
    water: string,
    pets: boolean
  ): Promise<Plant[] | ApiError> {
    try {
      const response = await fetch(
        `${urlBase}/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`
      );
      
      return await response.json();
    } catch (err) {
      return err;
    }
  },
};

export default plantsService;
