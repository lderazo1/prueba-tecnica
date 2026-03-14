# Prueba Técnica

## Stack utilizado
- **Backend:** Node.js + Express + TypeORM + PostgreSQL
- **Frontend:** HTML5 + JavaScript nativo
- **Blockchain simulado:** SHA-256 encadenado por cada registro/actualización

## Nota sobre el Frontend
Por restricciones de tiempo en el entorno de ejecución, el frontend fue implementado en HTML5/JS nativo en lugar de Angular. La arquitectura del backend está diseñada para integrarse sin cambios con un frontend Angular usando HttpClient y lo de standalone. Mil disculpas! :/

## Cómo correr el proyecto
```bash
cd prueba-backend
npm install
# Crear archivo .env con credenciales PostgreSQL
npm run dev
# Abrir prueba-frontend/index.html en el navegador
