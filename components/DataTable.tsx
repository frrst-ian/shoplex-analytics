
import React from 'react';

interface DataTableProps {
  data: any[];
}

const formatHeader = (header: string) => {
    return header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-brand-text-secondary">No data to display.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-auto h-full text-sm">
      <table className="w-full text-left">
        <thead className="sticky top-0 bg-brand-primary">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-2 font-semibold text-brand-text-secondary border-b border-brand-accent">
                {formatHeader(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-brand-accent">
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`} className="p-2 border-b border-brand-accent truncate">
                  {typeof row[header] === 'number' ? row[header].toLocaleString() : row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
