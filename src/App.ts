import GreenThumb from './pages/GreenThumb/index';
import store from './store';

const App = () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  // Append GreenThumb page
  const greenThumb = new GreenThumb();
  root.appendChild(greenThumb.node());

  // Fire first render
  store.events.publish('change');
};

export default App;
