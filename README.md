# Práctica Final ISO — Infraestructura Dockerizada con CI/CD

## Descripción

Este proyecto implementa una arquitectura completa basada en contenedores Docker, sustituyendo servicios cloud (MongoDB Atlas y Azure Blob Storage) por servicios autocontenidos.

La aplicación consiste en una API REST desarrollada en Node.js que permite gestionar productos con imágenes almacenadas en un servidor Nginx.

---

## Arquitectura

Cliente (curl/Postman)
│
▼
API REST (Node.js)
│
▼
MongoDB
│
▼
Nginx (servidor de imágenes)

Todos los servicios se ejecutan dentro de una red Docker local utilizando Docker Compose.

---

## Tecnologías utilizadas

* Node.js (Express)
* MongoDB
* Nginx
* Docker
* Docker Compose
* Jenkins (CI/CD)

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd practica-final-docker
```

### 2. Configurar variables de entorno

Crear un archivo `.env` basado en `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/practica_final
```

### 3. Levantar el entorno

```bash
docker compose up -d --build
```

### 4. Comprobar funcionamiento

```bash
curl http://localhost:3000/health
```

---

## Flujo de funcionamiento

1. El usuario sube una imagen al servidor Nginx.
2. La API guarda la URL de la imagen en MongoDB.
3. El cliente recupera los datos desde la API.
4. El navegador carga la imagen desde Nginx usando la URL.

---

## Endpoints principales

### Obtener todos los productos

```bash
GET /api/products
```

### Crear producto

```bash
POST /api/products
```

Ejemplo de body:

```json
{
  "name": "Producto Docker",
  "description": "Ejemplo de producto",
  "imageUrl": "http://localhost:8080/images/prueba.jpg"
}
```

---

## Pipeline CI/CD (Jenkins)

La pipeline definida en `Jenkinsfile` contiene las siguientes etapas:

### 1. Checkout

Obtiene el código del repositorio.

### 2. Build

Construye la imagen Docker de la API.

### 3. Test

Levanta los servicios y verifica el endpoint `/health` con `curl`.

### 4. Deploy

Despliega el entorno completo con Docker Compose.

---

## Decisiones técnicas

* Uso de Docker Compose para orquestación local.
* Separación de servicios en contenedores independientes.
* Uso de volúmenes para persistencia de datos (MongoDB y Nginx).
* Variables de entorno para evitar configuración hardcodeada.
* Endpoint `/health` para monitorización y pruebas automatizadas.

---

## Problemas encontrados

* Configuración inicial de Docker Desktop.
* Errores de compatibilidad en `docker-compose.yml`.
* Gestión de redes entre contenedores.
* Sincronización de servicios (API y MongoDB).

---

## Conclusión

Se ha conseguido replicar una arquitectura completa en local sin depender de servicios externos, utilizando contenedores Docker y automatizando el despliegue mediante CI/CD.

---

## Autor

Ethan RS
