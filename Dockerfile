# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de la app
EXPOSE 3000

# Variable de entorno por defecto (puede sobreescribirse)
ENV NODE_ENV=production

# Comando para ejecutar la app
CMD ["node", "src/app.js"]
