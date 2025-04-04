import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface SalesAnalysisData {
  productId: number;
  productName: string;
  sales: number;
  stockLevel: number;
  correlationScore: number;
}

const SalesAnalysisPage: React.FC = () => {
  const [salesAnalysisData, setSalesAnalysisData] = useState<SalesAnalysisData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSalesAnalysisData = async () => {
      try {
        const response = await axiosInstance.get<SalesAnalysisData[]>('/SalesAnalysis/correlation');
        setSalesAnalysisData(response.data);
      } catch (err) {
        setError('Failed to fetch sales analysis data.' + err);
      }
    };

    fetchSalesAnalysisData();
  }, []);

  const renderAnalysisTable = (data: SalesAnalysisData[]) => (
    <table className="min-w-full table-auto border-collapse mt-4">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left border-b">Product Name</th>
          <th className="px-4 py-2 text-left border-b">Sales</th>
          <th className="px-4 py-2 text-left border-b">Stock Level</th>
          <th className="px-4 py-2 text-left border-b">Correlation Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border-b">{item.productName}</td>
            <td className="px-4 py-2 border-b">${item.sales.toFixed(2)}</td>
            <td className="px-4 py-2 border-b">{item.stockLevel}</td>
            <td className="px-4 py-2 border-b">{item.correlationScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">📊 Sales Analysis</h2>

        {/* Sales Correlation Analysis */}
        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Product Sales Correlation</h3>
          {renderAnalysisTable(salesAnalysisData)}
        </section>
      </div>
    </div>
  );
};

export default SalesAnalysisPage;
