# Use the official .NET 8.0 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy everything and build
COPY . . 
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Use the runtime-only image for running the app (also .NET 8.0)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Run the app
ENTRYPOINT ["dotnet", "PetShopAPI.dll"]
