using PetShopAPI.Models;

namespace PetShopAPI.Repositories
{
    public interface ISalesAnalysisRepository
    {
        Task<IEnumerable<SalesAnalysisDTO>> GetCorrelationAnalysis();
    }

}
