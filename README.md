# Project: Express Server

El proyecto consiste en crear el Backend que alimente de datos a la aplicación Codeable Keep creada con React.

## Endpoints a implementar

### `GET /:username/notes`

Retorna todas las notas del usuario con username = :username. Si el :username no existe, se deberá crear un nuevo usuario y retornar una lista de notas vacía.

#### Respuesta:

```json
// status: 200

{
  "ok": true,
  "data": [
    {
      "id": 1,
      "title": "Titulo",
      "body": "Cuerpo",
      "color": "#FFF475",
      "pinned": false,
      "deleted": false
    }
    // ...
  ]
}
```

### `POST /:username/notes`

Crea una nueva nota para el usuario con username = :username. Si el :username no existe, se deberá crear un nuevo usuario.

#### Body

- **title**: string, requerido
- **body**: string, opcional, string vacío por defecto
- **color**: string, opcional, formato de código de color hexadecimal, "#FFFFFF" por defecto
- **pinned**: boolean, opcional, false por defecto
- **deleted**: boolean, opcional, false por defecto

Ejemplo:

```json
{
  "title": "Titulo",
  "body": "Cuerpo",
  "color": "#ABABAB",
  "pinned": true
}
```

#### Respuesta:

```json
// status: 201

{
  "ok": true,
  "data": {
    "id": 10,
    "title": "Titulo",
    "body": "Cuerpo",
    "color": "#ABABAB",
    "pinned": true,
    "deleted": false
  }
}
```

### `PATCH /:username/notes/:id`

Edita la nota con id = :id siempre que le pertenezca al usuario con username = :username. Se puede editar cualquiera de los campos de la nota (title, body, color, pinned, deleted).

#### Body

- **title**: string, opcional
- **body**: string, opcional
- **color**: string, opcional, formato de código de color hexadecimal
- **pinned**: boolean, opcional
- **deleted**: boolean, opcional

Ejemplo:

```json
{
  "deleted": true
}
```

#### Respuesta:

```json
// status: 200

{
  "ok": true,
  "data": {
    "id": 10,
    "title": "Titulo",
    "body": "Cuerpo",
    "color": "#ABABAB",
    "pinned": true,
    "deleted": true
  }
}
```

### `DELETE /:username/notes/:id`

Elimina la nota con id = :id siempre que le pertenezca al usuario con username = :username.

#### Respuesta:

```json
// status: 200

{
  "ok": true
}
```

## Manejo de errores

Los errores que pueden ocurrir en el backend deben responder con el código de estado adecuado y un mensaje de error estándarizado:

```json
// status: 400

{
  "ok": false,
  "error": {
    "message": "Mensaje general acerca del error.",
    "details": {
      // Información detallada del error, como campos específicos del formulario.
      // Por ejemplo
      "pinned": "Pinned must be a boolean",
      "title": "Title is required"
    }
  }
}
```

## Arquitectura de 3 capas

La aplicación debe implementar una arquitectura de 3 capas:

- Routers (Presentación)
- Services
- Data Access

Puedes implementar otros directorios como Models, Middlewares, etc., si lo consideras necesario.

## Stack Tecnológico

- Framework: Express.js
- TypeScript
- PostgreSQL with "node-postgres" (pg)
- Arquitectura: 3 capas
- Validación de input de usuario: Zod
