using Microsoft.AspNetCore.Mvc;
using PetShopAPI.DTOs;
using PetShopAPI.Repositories;

namespace PetShopAPI.Controllers
{
    [ApiController]
    [Route("api/reports")]
    public class SalesReportsController : ControllerBase
    {
        private readonly ISalesReportRepository _repo;

        public SalesReportsController(ISalesReportRepository repo)
        {
            _repo = repo;
        }

        // Get daily sales report
        [HttpGet("sales/daily")]
        public async Task<ActionResult<IEnumerable<SalesReportDTO>>> GetDailySalesReport()
        {
            var report = await _repo.GetDailyReport();
            return Ok(report);
        }

        // Get weekly sales report
        [HttpGet("sales/weekly")]
        public async Task<ActionResult<IEnumerable<SalesReportDTO>>> GetWeeklySalesReport()
        {
            var report = await _repo.GetWeeklyReport();
            return Ok(report);
        }

        // Get monthly sales report
        [HttpGet("sales/monthly")]
        public async Task<ActionResult<IEnumerable<SalesReportDTO>>> GetMonthlySalesReport()
        {
            var report = await _repo.GetMonthlyReport();
            return Ok(report);
        }

        // Get best-selling products
        [HttpGet("bestselling")]
        public async Task<ActionResult<IEnumerable<SalesReportDTO>>> GetBestSellingProducts()
        {
            var bestSellingProducts = await _repo.GetBestSellingProducts();
            return Ok(bestSellingProducts);
        }
    }

}
