import type { FC } from 'react';

import './Header.css';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">Configurable Form Builder</h1>
          <p className="header-subtitle">CloudFactory</p>
        </div>
        <span className="header-field-count">1 top-level field</span>
      </div>
    </header>
  );
};

export default Header;
