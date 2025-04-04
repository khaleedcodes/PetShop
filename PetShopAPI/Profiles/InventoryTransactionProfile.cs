using AutoMapper;
using PetShopAPI.DTOs;
using PetShopAPI.Models;

namespace PetShopAPI.Profiles
{
    public class InventoryTransactionProfile : Profile
    {
        public InventoryTransactionProfile()
        {
            CreateMap<InventoryTransaction, InventoryTransactionReadDTO>();
            CreateMap<InventoryTransactionCreateDTO, InventoryTransaction>();
            CreateMap<InventoryTransactionUpdateDTO, InventoryTransaction>();
            CreateMap<InventoryTransaction, InventoryTransactionUpdateDTO>();
        }
    }
}
