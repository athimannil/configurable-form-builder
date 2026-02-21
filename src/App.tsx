import generateId from './utils/idGenerator';
import './App.css';

function App() {
  return (
    <main>
      <h1>Configurable Form Builder</h1>
      <p>Your id is {generateId()}</p>
    </main>
  );
}

export default App;
