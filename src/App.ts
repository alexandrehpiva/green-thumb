import render from './lib/utils/render';
import Main from './pages/Main/index';
import store from './store';

import './styles/global.scss';

const App = () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.prepend(root);

  // Append Main page
  render(new Main(), root);

  // Notify rendering
  store.events.publish('rendered');
};

export default App;
