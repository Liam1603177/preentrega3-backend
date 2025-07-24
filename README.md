# 🧪 Entrega Final - Backend 3

Este proyecto incluye una API REST desarrollada con Express y MongoDB, que permite gestionar usuarios, mascotas y adopciones. Además, incluye documentación Swagger, tests funcionales y soporte para Docker.

---

## 📚 Endpoints principales

| Método | Ruta                        | Descripción                                      |
|--------|-----------------------------|--------------------------------------------------|
| GET    | `/api/mocks/mockingusers`   | Genera 50 usuarios fake (sin guardar en Mongo). |
| POST   | `/api/mocks/generateData`   | Inserta usuarios y mascotas en la base.         |
| GET    | `/api/users`                | Muestra todos los usuarios almacenados.         |
| GET    | `/api/pets`                 | Muestra todas las mascotas almacenadas.         |
| GET    | `/api/adoptions`            | Lista todas las adopciones registradas.         |
| POST   | `/api/adoptions`            | Registra una nueva adopción.                    |

---

## 🧾 Body para `/api/mocks/generateData`

```json
{
  "users": 10,
  "pets": 5
}


🚀iniciar el proyecto localmente
  npm install
  node src/app.js


🧪Tests
  npm test

🐳Cómo correr con Docker Compose
  docker compose up


🐳Docker
  Imagen en DockerHub
🔗 https://hub.docker.com/r/ignaciodaddario/preentrega-backend


⚙️Variables de entorno
.env
MONGO_URI=mongodb://host.docker.internal:27017/adopciones


🐳 Comandos
docker pull ignaciodaddario/preentrega-backend
docker run -p 3000:3000 --env-file .env ignaciodaddario/preentrega-backend


📄 Documentación Swagger
Disponible en:
🔗 http://localhost:3000/api-docs


Entregado por
Ignacio Daddario
Backend Coderhouse - Entrega 3