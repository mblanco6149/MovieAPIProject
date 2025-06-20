
# Movie API Project 

Backend API desarrollado en NodeJS + Express

## Requisitos

- NodeJS 18+
- API Key en TheMovieDB

## Setup

1. descomprimir el proyecto:
2. Instalar dependencias:

```
npm install
```

3. Configurar el archivo `.env`:

```
PORT=3000
TMDB_API_KEY=tu_api_key
JWT_SECRET=supersecretkey
```

4. Iniciar el servidor:

```
npm start
```

5. Ejecutar los tests:

```
npm test
```

## Endpoints

- `POST /api/auth/register` → Registro de usuario
- `POST /api/auth/login` → Login y obtención de token JWT
- `POST /api/auth/logout` → Logout e invalidación de token

- `GET /api/movies?keyword=` → Buscar películas (requiere autenticación)
- `POST /api/favorites` → Agregar favorito (requiere autenticación)
- `GET /api/favorites` → Obtener favoritos (requiere autenticación)

---

> API protegida por JWT. Los tokens inválidos o revocados serán rechazados.

