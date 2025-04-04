using Microsoft.EntityFrameworkCore;
using PetShopAPI.Data;
using PetShopAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<PetShopDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

// Register your custom repository for InventoryTransactions
builder.Services.AddScoped<IInventoryTransactionRepository, InventoryTransactionRepository>();

// Register the existing Product repository
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Add AutoMapper for DTO mappings
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add controllers with NewtonsoftJson for PATCH support
builder.Services.AddControllers()
    .AddNewtonsoftJson(); // For PATCH support

// Add Swagger for API documentation and testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure Swagger UI for API documentation
app.UseSwagger();
app.UseSwaggerUI();

// Middleware for HTTPS redirection and Authorization
app.UseHttpsRedirection();
app.UseAuthorization();

// Map controllers to routes
app.MapControllers();

// Run the application
app.Run();
