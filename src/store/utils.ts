import { CombinedStates } from './types';

/**
 * Verifies if propName is keyof obj
 * @param propName Property name
 * @param obj A CombinedStates obj
 * @returns is keyof CombinedStates
 */
export const isKeyOfCombinedStates = (
  propName: string | symbol,
  obj: CombinedStates
): propName is keyof CombinedStates => {
  return propName in obj;
};
