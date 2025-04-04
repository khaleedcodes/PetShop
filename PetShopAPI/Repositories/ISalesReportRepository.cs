using PetShopAPI.DTOs;

namespace PetShopAPI.Repositories
{
    public interface ISalesReportRepository
    {
        Task<IEnumerable<SalesReportDTO>> GetDailyReport();
        Task<IEnumerable<SalesReportDTO>> GetWeeklyReport();
        Task<IEnumerable<SalesReportDTO>> GetMonthlyReport();
        Task<IEnumerable<SalesReportDTO>> GetBestSellingProducts();
    }
}
