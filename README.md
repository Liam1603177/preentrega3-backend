# 🧪 Preentrega 3 - Backend

 Endpoints
Método Ruta Descripción
GET	    /api/mocks/mockingusers	Genera 50 usuarios fake (sin guardar en Mongo).
POST	/api/mocks/generateData	Inserta usuarios y mascotas en la base.
GET	    /api/users Muestra todos los usuarios almacenados.
GET	    /api/pets Muestra todas las mascotas almacenadas.

📦 Body para /generateData:
json
{
  "users": 10,
  "pets": 5
}