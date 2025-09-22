
import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartType } from '../types';

interface ChartProps {
  type: ChartType;
  data: any[];
}

const COLORS = ['#38b2ac', '#81e6d9', '#4fd1c5', '#319795', '#2c7a7b'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-secondary p-2 border border-brand-accent rounded-md shadow-lg">
        <p className="label text-brand-text-secondary">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }} className="text-sm font-semibold">{`${pld.name}: ${pld.value.toLocaleString()}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const Chart: React.FC<ChartProps> = ({ type, data }) => {
    if (!data.length) return null;

    const keys = Object.keys(data[0]);
    const dataKey = keys[0];
    const valueKey = keys[keys.length-1];

    const renderChart = () => {
        switch (type) {
            case ChartType.BAR:
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                        <XAxis dataKey={dataKey} tick={{ fill: '#a0aec0' }} fontSize={12} />
                        <YAxis tick={{ fill: '#a0aec0' }} fontSize={12} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(74, 85, 104, 0.5)'}} />
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                        <Bar dataKey={valueKey} fill="#38b2ac" />
                    </BarChart>
                );
            case ChartType.LINE:
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                        <XAxis dataKey={dataKey} tick={{ fill: '#a0aec0' }} fontSize={12} />
                        <YAxis tick={{ fill: '#a0aec0' }} fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                        <Line type="monotone" dataKey={valueKey} stroke="#38b2ac" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                );
            case ChartType.PIE:
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey={keys[keys.length - 1]}
                            nameKey={dataKey}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                    </PieChart>
                );
            default:
                return <div>Unsupported chart type.</div>;
        }
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
        </ResponsiveContainer>
    );
};

export default Chart;
