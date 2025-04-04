namespace PetShopAPI.DTOs
{
    public class ProductReadDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int StockLevel { get; set; }
    }

    public class ProductCreateDTO
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int StockLevel { get; set; }
    }

    public class ProductUpdateDTO
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int StockLevel { get; set; }
    }

}
