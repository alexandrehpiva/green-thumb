import { queryByAttribute } from '@testing-library/dom';

const queryById = queryByAttribute.bind(null, 'id');

const cleanup = () => (document.body.innerHTML = '');

// Additional methods
export { queryById, cleanup };
