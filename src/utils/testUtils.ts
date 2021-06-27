import { queryByAttribute, screen } from '@testing-library/dom';

const queryById = queryByAttribute.bind(null, 'id');

const cleanup = () => (document.body.innerHTML = '');

const findByTestIds = <T extends HTMLElement[] = HTMLElement[]>(
  ...testIds: string[]
) => {
  return Promise.all(
    testIds.map(testId => screen.findByTestId(testId))
  ) as Promise<T>;
};

// Additional methods
export { queryById, cleanup, findByTestIds };
