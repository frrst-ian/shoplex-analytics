
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import type { Page } from './types';
import { PAGES } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(PAGES[0]);

  return (
    <div className="flex h-screen bg-brand-secondary text-brand-text">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        <Dashboard page={activePage} />
      </main>
    </div>
  );
};

export default App;
