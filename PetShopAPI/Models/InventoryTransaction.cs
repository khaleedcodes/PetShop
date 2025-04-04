using Microsoft.AspNetCore.Mvc;

namespace PetShopAPI.Models
{
    public class InventoryTransaction
    {
        public int Id { get; set; }
        public int ProductId { get; set; }  // Link to Product
        public int Quantity { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }  // E.g., "Receive" or "Disburse"
    }


}
