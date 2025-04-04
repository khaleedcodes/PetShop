namespace PetShopAPI.DTOs
{
    public class InventoryTransactionReadDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionType { get; set; }
    }

    public class InventoryTransactionCreateDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string TransactionType { get; set; }
    }

    public class InventoryTransactionUpdateDTO
    {
        public int Quantity { get; set; }
        public string TransactionType { get; set; }
    }



}
