import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import FormBuilder from './components/FormBuilder/FormBuilder.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormBuilder />
  </StrictMode>
);
