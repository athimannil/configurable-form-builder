import FormBuilder from '@/components/FormBuilder';
import generateId from '@/utils/idGenerator';
import './App.css';

function App() {
  console.log('Generated ID:', generateId());
  return <FormBuilder />;
}

export default App;
