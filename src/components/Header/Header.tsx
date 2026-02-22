import type { FC } from 'react';
import { useContext } from 'react';

import { FormBuilderContext } from '@/context/FormBuilderContext';

import './Header.css';

const Header: FC = () => {
  const context = useContext(FormBuilderContext);
  const fieldCount = context?.state.fields.length ?? 0;

  return (
    <header className="header">
      <div className="header__content">
        <div>
          <h1 className="header__title">Configurable Form Builder</h1>
          <p className="header__subtitle">CloudFactory</p>
        </div>
        <span className="header__field-count">
          {fieldCount} top-level field{fieldCount !== 1 ? 's' : ''}
        </span>
      </div>
    </header>
  );
};

export default Header;
