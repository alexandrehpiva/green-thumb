import GreenThumb from './pages/GreenThumb/index';
import store from './store';

const App = () => {
  console.log('running...');

  const element = document.createElement('div');
  element.id = 'root';
  document.body.appendChild(element);

  // Append GreenThumb page
  const greenThumb = new GreenThumb();
  element.appendChild(greenThumb.node());

  // First render
  store.events.publish('change');
};

export default App;
