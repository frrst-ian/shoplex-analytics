
import React from 'react';

export enum ChartType {
  BAR = 'BAR',
  LINE = 'LINE',
  PIE = 'PIE',
  TABLE = 'TABLE',
}

export interface Query {
  title: string;
  sql: string;
  chartType: ChartType;
  description?: string;
}

export interface Page {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  queries: Query[];
}
