import { CombinedStates } from '../../store/types';
import isKeyOfCombinedStates from './isKeyOfCombinedStates';

describe('Unit(isKeyOfCombinedStates)', () => {
  const mockCombinedStatesObj: CombinedStates = {
    main: {
      filters: {
        sunlight: 'low',
      },
    },
  };

  it('should return true the propName is a key of the obj of type CombinedStates', () => {
    expect(isKeyOfCombinedStates('main', mockCombinedStatesObj)).toBe(true);
  });

  it('should return false the propName is a key of the obj of type CombinedStates', () => {
    expect(isKeyOfCombinedStates('navbar', mockCombinedStatesObj)).toBe(false);
  });
});
