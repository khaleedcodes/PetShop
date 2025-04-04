using PetShopAPI.Models;

namespace PetShopAPI.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAll();
        Task<Product> GetById(int id);
        Task Add(Product product);
        Task Update(Product product);
        Task Delete(Product product);
        Task SaveChanges();
    }
}
