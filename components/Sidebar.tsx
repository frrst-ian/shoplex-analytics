import React from 'react';
import type { Page } from '../types';
import { PAGES } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-72 flex-shrink-0 bg-brand-primary p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-8">
        <svg className="w-8 h-8 text-brand-highlight" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
        </svg>
        <h1 className="text-xl font-bold text-white">Shoplex</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        {PAGES.map((page) => (
          <button
            key={page.name}
            onClick={() => setActivePage(page)}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
              activePage.name === page.name
                ? 'bg-brand-highlight text-white font-semibold'
                : 'text-brand-text-secondary hover:bg-brand-accent hover:text-white'
            }`}
          >
            <page.icon className="w-5 h-5" />
            <span>{page.name}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto text-center text-brand-text-secondary text-xs">
        <p>&copy; 2024 Shoplex Inc.</p>
        <p>Analytics Assistant</p>
      </div>
    </aside>
  );
};

export default Sidebar;