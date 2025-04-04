using Microsoft.EntityFrameworkCore;
using PetShopAPI.Data;
using PetShopAPI.Models;

namespace PetShopAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly PetShopDbContext _context;

        public ProductRepository(PetShopDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAll() =>
            await _context.Products.ToListAsync();

        public async Task<Product> GetById(int id) =>
            await _context.Products.FindAsync(id);

        public async Task Add(Product product) =>
            await _context.Products.AddAsync(product);

        public Task Update(Product product)
        {
            _context.Products.Update(product);
            return Task.CompletedTask;
        }

        public Task Delete(Product product)
        {
            _context.Products.Remove(product);
            return Task.CompletedTask;
        }

        public async Task SaveChanges() =>
            await _context.SaveChangesAsync();
    }
}
