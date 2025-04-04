using PetShopAPI.Models;

namespace PetShopAPI.Repositories
{
    public interface IInventoryTransactionRepository
    {
        Task<IEnumerable<InventoryTransaction>> GetAll();
        Task<InventoryTransaction> GetById(int id);
        Task Add(InventoryTransaction inventoryTransaction);
        Task Update(InventoryTransaction inventoryTransaction);
        Task Delete(InventoryTransaction inventoryTransaction);
        Task SaveChanges();
    }
}
