using Microsoft.EntityFrameworkCore;
using PetShopAPI.Models;

namespace PetShopAPI.Data
{
    public class PetShopDbContext : DbContext
    {
        public PetShopDbContext(DbContextOptions<PetShopDbContext> options) : base(options) { }

        // Existing DbSet
        public DbSet<Product> Products { get; set; }

        // Add the InventoryTransactions DbSet
        public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
    }
}
