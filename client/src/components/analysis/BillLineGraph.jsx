import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BillLineGraph = ({ historicalData }) => {
  // Filter out any bills that might not have the necessary data to prevent crashes
  const validData = historicalData.filter(bill => bill.structuredData?.dueDate && bill.structuredData?.totalCost !== undefined);
  const sortedData = [...validData].reverse();

  const data = {
    labels: sortedData.map(bill =>
      // Use optional chaining (?.) for safety
      new Date(bill?.structuredData?.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    ),
    datasets: [
      {
        label: 'Total Cost (in ₹)',
        // Use optional chaining and provide a default value (0)
        data: sortedData.map(bill => bill?.structuredData?.totalCost || 0),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historical Cost Trend',
        font: { size: 18, weight: 'bold' },
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default BillLineGraph;
