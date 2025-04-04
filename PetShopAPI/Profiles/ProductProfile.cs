using AutoMapper;
using PetShopAPI.DTOs;
using PetShopAPI.Models;

namespace PetShopAPI.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            // Mapping from Product to ProductReadDTO for reading the product data
            CreateMap<Product, ProductReadDTO>();

            // Mapping from ProductCreateDTO to Product for creating a new product
            CreateMap<ProductCreateDTO, Product>();

            // Mapping from ProductUpdateDTO to Product for updating the product
            CreateMap<ProductUpdateDTO, Product>();

            // Add missing mapping from Product to ProductUpdateDTO
            CreateMap<Product, ProductUpdateDTO>();
        }
    }
}
