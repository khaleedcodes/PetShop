using Microsoft.AspNetCore.Mvc;
using PetShopAPI.Models;
using PetShopAPI.DTOs;
using PetShopAPI.Repositories;

namespace PetShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesAnalysisController : ControllerBase
    {
        private readonly ISalesAnalysisRepository _repo;

        public SalesAnalysisController(ISalesAnalysisRepository repo)
        {
            _repo = repo;
        }

        // Get sales-inventory correlation
        [HttpGet("correlation")]
        public async Task<ActionResult<IEnumerable<SalesAnalysisDTO>>> GetSalesCorrelation()
        {
            var analysis = await _repo.GetCorrelationAnalysis();
            return Ok(analysis);
        }
    }
}
