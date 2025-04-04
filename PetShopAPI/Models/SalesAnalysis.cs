namespace PetShopAPI.Models
{
    public class SalesAnalysisDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Sales { get; set; }
        public int StockLevel { get; set; }
        public decimal CorrelationScore { get; set; }
    }

}
