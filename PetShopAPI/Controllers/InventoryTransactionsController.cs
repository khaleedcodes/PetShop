using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using PetShopAPI.DTOs;
using PetShopAPI.Models;
using PetShopAPI.Repositories;

namespace PetShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryTransactionsController : ControllerBase
    {
        private readonly IInventoryTransactionRepository _repo;
        private readonly IMapper _mapper;

        public InventoryTransactionsController(IInventoryTransactionRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryTransactionReadDTO>>> GetAll()
        {
            var transactions = await _repo.GetAll();
            return Ok(_mapper.Map<IEnumerable<InventoryTransactionReadDTO>>(transactions));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryTransactionReadDTO>> GetById(int id)
        {
            var transaction = await _repo.GetById(id);
            if (transaction == null) return NotFound();
            return Ok(_mapper.Map<InventoryTransactionReadDTO>(transaction));
        }

        [HttpPost]
        public async Task<ActionResult> Create(InventoryTransactionCreateDTO dto)
        {
            var transaction = _mapper.Map<InventoryTransaction>(dto);
            await _repo.Add(transaction);
            await _repo.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, _mapper.Map<InventoryTransactionReadDTO>(transaction));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, InventoryTransactionUpdateDTO dto)
        {
            var transaction = await _repo.GetById(id);
            if (transaction == null) return NotFound();
            _mapper.Map(dto, transaction);
            await _repo.SaveChanges();
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Patch(int id, JsonPatchDocument<InventoryTransactionUpdateDTO> patchDoc)
        {
            var transaction = await _repo.GetById(id);
            if (transaction == null) return NotFound();

            var transactionToPatch = _mapper.Map<InventoryTransactionUpdateDTO>(transaction);
            patchDoc.ApplyTo(transactionToPatch, ModelState);

            if (!TryValidateModel(transactionToPatch)) return ValidationProblem(ModelState);

            _mapper.Map(transactionToPatch, transaction);
            await _repo.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var transaction = await _repo.GetById(id);
            if (transaction == null) return NotFound();
            await _repo.Delete(transaction);
            await _repo.SaveChanges();
            return NoContent();
        }
    }
}
