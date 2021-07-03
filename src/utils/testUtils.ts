import { queryByAttribute, screen } from '@testing-library/dom';
import store from '../store';

const queryById = queryByAttribute.bind(null, 'id');

const cleanup = () => {
  // Clear all Mock functions
  jest.clearAllMocks();

  // Clean document.body
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }

  // Clean state and events
  store.dangerouslyResetState();
  store.resetEvents();
};

const findByTestIds = <T extends HTMLElement[] = HTMLElement[]>(
  ...testIds: string[]
) => {
  return Promise.all(
    testIds.map(testId => screen.findByTestId(testId))
  ) as Promise<T>;
};

const defineProperty = <T>(element: T, property: keyof T, value: any) => {
  Object.defineProperty(element, property, {
    configurable: true,
    value: value,
  });
};

// Additional methods
export { queryById, cleanup, findByTestIds, defineProperty };
