using Microsoft.AspNetCore.JsonPatch;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PetShopAPI.DTOs;
using PetShopAPI.Models;
using PetShopAPI.Repositories;

namespace PetShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReadDTO>>> GetAll()
        {
            var products = await _repo.GetAll();
            return Ok(_mapper.Map<IEnumerable<ProductReadDTO>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReadDTO>> GetById(int id)
        {
            var product = await _repo.GetById(id);
            if (product == null) return NotFound();
            return Ok(_mapper.Map<ProductReadDTO>(product));
        }

        [HttpPost]
        public async Task<ActionResult> Create(ProductCreateDTO dto)
        {
            var product = _mapper.Map<Product>(dto);
            await _repo.Add(product);
            await _repo.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, _mapper.Map<ProductReadDTO>(product));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, ProductUpdateDTO dto)
        {
            var product = await _repo.GetById(id);
            if (product == null) return NotFound();
            _mapper.Map(dto, product);
            await _repo.SaveChanges();
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Patch(int id, JsonPatchDocument<ProductUpdateDTO> patchDoc)
        {
            var product = await _repo.GetById(id);
            if (product == null) return NotFound();

            var productToPatch = _mapper.Map<ProductUpdateDTO>(product);
            patchDoc.ApplyTo(productToPatch, ModelState);

            if (!TryValidateModel(productToPatch)) return ValidationProblem(ModelState);

            _mapper.Map(productToPatch, product);
            await _repo.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _repo.GetById(id);
            if (product == null) return NotFound();
            await _repo.Delete(product);
            await _repo.SaveChanges();
            return NoContent();
        }
    }
}
