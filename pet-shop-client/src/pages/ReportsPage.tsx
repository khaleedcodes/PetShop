import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface SalesData {
  productName: string;
  quantitySold: number;
  totalSales: number;
}

const ReportsPage: React.FC = () => {
  const [dailySalesData, setDailySalesData] = useState<SalesData[]>([]);
  const [weeklySalesData, setWeeklySalesData] = useState<SalesData[]>([]);
  const [monthlySalesData, setMonthlySalesData] = useState<SalesData[]>([]);
  const [bestsellingProductsData, setBestsellingProductsData] = useState<
    SalesData[]
  >([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        // Fetch daily sales
        const dailyResponse = await axiosInstance.get<SalesData[]>(
          "/reports/sales/daily"
        );
        setDailySalesData(dailyResponse.data);

        // Fetch weekly sales
        const weeklyResponse = await axiosInstance.get<SalesData[]>(
          "/reports/sales/weekly"
        );
        setWeeklySalesData(weeklyResponse.data);

        // Fetch monthly sales
        const monthlyResponse = await axiosInstance.get<SalesData[]>(
          "/reports/sales/monthly"
        );
        setMonthlySalesData(monthlyResponse.data);

        // Fetch bestselling products
        const bestsellingResponse = await axiosInstance.get<SalesData[]>(
          "/reports/bestselling"
        );
        setBestsellingProductsData(bestsellingResponse.data);
      } catch (err) {
        setError("Failed to fetch reports." + err);
      }
    };

    fetchReportsData();
  }, []);

  const renderReportTable = (data: SalesData[]) => (
    <table className="min-w-full table-auto border-collapse mt-4">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left border-b">Product Name</th>
          <th className="px-4 py-2 text-left border-b">Quantity Sold</th>
          <th className="px-4 py-2 text-left border-b">Total Sales</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border-b">{item.productName}</td>
            <td className="px-4 py-2 border-b">{item.quantitySold}</td>
            <td className="px-4 py-2 border-b">
              ${item.totalSales.toFixed(2)}
            </td>
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
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          📊 Sales Reports
        </h2>

        {/* Daily Sales Report */}
        <section>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">
            Daily Sales Report
          </h3>
          {renderReportTable(dailySalesData)}
        </section>

        {/* Weekly Sales Report */}
        <section>
          <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">
            Weekly Sales Report
          </h3>
          {renderReportTable(weeklySalesData)}
        </section>

        {/* Monthly Sales Report */}
        <section>
          <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">
            Monthly Sales Report
          </h3>
          {renderReportTable(monthlySalesData)}
        </section>

        {/* Bestselling Products Report */}
        <section>
          <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4">
            Bestselling Products
          </h3>
          {renderReportTable(bestsellingProductsData)}
        </section>
      </div>
    </div>
  );
};

export default ReportsPage;
