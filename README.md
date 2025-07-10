# 🧾 FrontEnd de Gestión de Citas de Entrega

Proyecto React con Refine para la gestión de citas de entrega, proveedores y reportes de tiempo promedio. Incluye autenticación, vistas interactivas, formularios, y visualización de datos.

## Estructura del Proyecto
```
src/
    │
    ├── app/          
    ├── pages/                
    ├── components/           
    ├── context/             
    ├── config/              
    ├── providers/              
    ├── types/            
```


## 🚀 Requisitos
Node.js (versión 14 o superior)
npm (o yarn si prefieres usarlo)
Refine (para la administración de datos)
Ant Design (para componentes de UI)
React Router (para manejo de rutas)

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instalar dependencias

```bash
npm install
# O si usas yarn:
# yarn install
```

### 3. Editar el archivo `.env`
Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:

### Tener en cuenta que se debe crear la base de datos(Postgres) antes de correr las migracion y agregarlas en tu .Env

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 4. Levantar el servidor

```bash
npm start
# O si usas yarn:
# yarn start
```






