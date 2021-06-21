import Main from './pages/Main/index';
import store from './store';

import './styles/global.scss';

const App = () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  // Append Main page
  const greenThumb = new Main();
  root.appendChild(greenThumb.node());

  // Fire first render
  store.events.publish('change');
};

export default App;
