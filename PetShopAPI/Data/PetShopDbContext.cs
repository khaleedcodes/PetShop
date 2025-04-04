using Microsoft.EntityFrameworkCore;
using PetShopAPI.DTOs;
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

        // Map the DTO to a table-less entity for raw SQL queries
        public DbSet<SalesReportDTO> SalesReports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SalesReportDTO>().HasNoKey(); // No primary key, as it's a report view
        }
    }
}
