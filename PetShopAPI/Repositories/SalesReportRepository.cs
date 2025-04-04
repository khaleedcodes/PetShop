using PetShopAPI.Data;
using PetShopAPI.DTOs;
using PetShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using PetShopAPI.DTOs;
using PetShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetShopAPI.Repositories
{
    public class SalesReportRepository : ISalesReportRepository
    {
        private readonly PetShopDbContext _context;

        public SalesReportRepository(PetShopDbContext context)
        {
            _context = context;
        }

        // Daily Sales Report
        public async Task<IEnumerable<SalesReportDTO>> GetDailyReport()
        {
            string query = @"
            SELECT p.Name AS ProductName, 
                   SUM(it.Quantity) AS QuantitySold, 
                   (SUM(it.Quantity) * p.Price) AS TotalSales
            FROM InventoryTransactions it
            JOIN Products p ON it.ProductId = p.Id
            WHERE it.TransactionDate = CURDATE() 
              AND it.TransactionType = 'Disburse'
            GROUP BY p.Name, p.Price
            ORDER BY TotalSales DESC";

            return await _context.SalesReports.FromSqlRaw(query).ToListAsync();
        }

        // Weekly Sales Report
        public async Task<IEnumerable<SalesReportDTO>> GetWeeklyReport()
        {
            string query = @"
            SELECT p.Name AS ProductName, 
                   SUM(it.Quantity) AS QuantitySold, 
                   (SUM(it.Quantity) * p.Price) AS TotalSales
            FROM InventoryTransactions it
            JOIN Products p ON it.ProductId = p.Id
            WHERE it.TransactionDate BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
              AND it.TransactionType = 'Disburse'
            GROUP BY p.Name, p.Price
            ORDER BY TotalSales DESC";

            return await _context.SalesReports.FromSqlRaw(query).ToListAsync();
        }

        // Monthly Sales Report
        public async Task<IEnumerable<SalesReportDTO>> GetMonthlyReport()
        {
            string query = @"
            SELECT p.Name AS ProductName, 
                   SUM(it.Quantity) AS QuantitySold, 
                   (SUM(it.Quantity) * p.Price) AS TotalSales
            FROM InventoryTransactions it
            JOIN Products p ON it.ProductId = p.Id
            WHERE it.TransactionDate BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()
              AND it.TransactionType = 'Disburse'
            GROUP BY p.Name, p.Price
            ORDER BY TotalSales DESC";

            return await _context.SalesReports.FromSqlRaw(query).ToListAsync();
        }

        // Bestselling Products
        public async Task<IEnumerable<SalesReportDTO>> GetBestSellingProducts()
        {
            string query = @"
            SELECT p.Name AS ProductName, 
                   SUM(it.Quantity) AS QuantitySold, 
                   (SUM(it.Quantity) * p.Price) AS TotalSales
            FROM InventoryTransactions it
            JOIN Products p ON it.ProductId = p.Id
            WHERE it.TransactionType = 'Disburse'
            GROUP BY p.Name, p.Price
            ORDER BY TotalSales DESC
            LIMIT 10";

            return await _context.SalesReports.FromSqlRaw(query).ToListAsync();
        }
    }

}
