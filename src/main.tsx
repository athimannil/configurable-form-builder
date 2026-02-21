import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import FormBuilder from './components/FormBuilder/FormBuilder.tsx';
import { FormBuilderProvider } from './context/FormBuilderContext.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormBuilderProvider>
      <FormBuilder />
    </FormBuilderProvider>
  </StrictMode>
);
