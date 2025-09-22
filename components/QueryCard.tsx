import React, { useState, useEffect } from 'react';
import type { Query } from '../types';
import { fetchData } from '../services/dataService';
import Chart from './Chart';
import DataTable from './DataTable';
import { ChartType } from '../types';

interface QueryCardProps {
  query: Query;
}

const QueryCard: React.FC<QueryCardProps> = ({ query }) => {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchData(query.sql, query.title);
        setData(result);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [query]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="animate-pulse bg-brand-accent rounded-lg h-full w-full"></div>;
    }

    if (error) {
      return <div className="text-red-400 p-4">{error}</div>;
    }

    if (!data || data.length === 0) {
      return <div className="text-brand-text-secondary p-4">No data available.</div>;
    }

    if (query.chartType === ChartType.TABLE) {
      return <DataTable data={data} />;
    }

    return <Chart type={query.chartType} data={data} />;
  };

  return (
    <div className="bg-brand-primary rounded-xl shadow-lg p-4 flex flex-col h-96">
      <h3 className="font-semibold text-white truncate">{query.title}</h3>
      <p className="text-xs text-brand-text-secondary mb-2">{query.description}</p>
      <div className="flex-grow w-full h-full min-h-0">
         {renderContent()}
      </div>
    </div>
  );
};

export default QueryCard;