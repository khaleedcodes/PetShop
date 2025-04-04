using Microsoft.EntityFrameworkCore;
using PetShopAPI.Models;
using PetShopAPI.Data;

namespace PetShopAPI.Repositories
{
    public class InventoryTransactionRepository : IInventoryTransactionRepository
    {
        private readonly PetShopDbContext _context;

        public InventoryTransactionRepository(PetShopDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InventoryTransaction>> GetAll() =>
            await _context.InventoryTransactions.ToListAsync();

        public async Task<InventoryTransaction> GetById(int id) =>
            await _context.InventoryTransactions.FindAsync(id);

        public async Task Add(InventoryTransaction inventoryTransaction) =>
            await _context.InventoryTransactions.AddAsync(inventoryTransaction);

        public Task Update(InventoryTransaction inventoryTransaction)
        {
            _context.InventoryTransactions.Update(inventoryTransaction);
            return Task.CompletedTask;
        }

        public Task Delete(InventoryTransaction inventoryTransaction)
        {
            _context.InventoryTransactions.Remove(inventoryTransaction);
            return Task.CompletedTask;
        }

        public async Task SaveChanges() =>
            await _context.SaveChangesAsync();
    }
}
