import { CombinedStates } from '../../store/types';

/**
 * Verifies if propName is keyof obj
 * @param propName Property name
 * @param obj A CombinedStates obj
 * @returns is keyof CombinedStates
 */
const isKeyOfCombinedStates = (
  propName: string | symbol,
  obj: CombinedStates
): propName is keyof CombinedStates => {
  return propName in obj;
};

export default isKeyOfCombinedStates;
