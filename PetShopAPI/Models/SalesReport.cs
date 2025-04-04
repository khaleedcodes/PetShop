namespace PetShopAPI.Models
{
    public class SalesReport
    {
        public DateTime ReportDate { get; set; }
        public decimal TotalSales { get; set; }
        public int TotalOrders { get; set; }
        public int BestsellingProductId { get; set; }
        public string BestsellingProductName { get; set; }
    }

}
