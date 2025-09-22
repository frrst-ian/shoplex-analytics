import React from 'react';
import type { Page } from '../types';
import QueryCard from './QueryCard';
import Header from './Header';

interface DashboardProps {
  page: Page;
}

const Dashboard: React.FC<DashboardProps> = ({ page }) => {
  return (
    <div className="p-8">
      <Header title={page.name} description={page.description} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {page.queries.map((query) => (
          <QueryCard key={query.title} query={query} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;