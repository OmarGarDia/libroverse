📚✨ LibroVerse: Tu Universo de Historias

Bienvenido a LibroVerse, una aplicación web diseñada para amantes de los libros, un lugar donde puedes explorar un vasto universo de historias, descubrir nuevas lecturas y compartir tus experiencias con una comunidad de lectores.
🌟 Características

    Exploración de Libros: Navega por una amplia colección de libros con opciones de búsqueda y filtrado.

    Detalles Completos: Accede a información detallada de cada libro, incluyendo sinopsis, autor, género y calificaciones.

    Gestión de Colección: (Próximamente) Añade libros a tus listas personalizadas (ej. "Leyendo", "Quiero Leer", "Leídos").

    Reseñas de Usuarios: (Próximamente) Lee y escribe reseñas para compartir tus opiniones y ayudar a otros lectores.

    Diseño Moderno y Responsivo: Interfaz de usuario intuitiva y adaptable a cualquier dispositivo, diseñada con Tailwind CSS.

🚀 Tecnologías Utilizadas

LibroVerse está construido sobre una pila de tecnologías robusta y moderna:
Backend

    Laravel 12: Un potente framework PHP para el desarrollo de APIs RESTful.

    MySQL: Un sistema de gestión de bases de datos relacionales para almacenar toda la información de los libros, usuarios y reseñas.

Frontend

    React (con Vite): Una biblioteca JavaScript declarativa, eficiente y flexible para construir interfaces de usuario interactivas, potenciada por Vite para un desarrollo rápido.

    Tailwind CSS: Un framework CSS de primera utilidad que permite diseñar rápidamente interfaces de usuario personalizadas.

⚙️ Estructura del Proyecto (Monorepo)

Este proyecto está organizado como un monorepo, lo que significa que el backend (Laravel) y el frontend (React) residen en el mismo repositorio de Git.

/LibroVerse-App
├── /backend          # Proyecto Laravel (API)
│   ├── app
│   ├── config
│   ├── database
│   ├── routes        # Aquí estarán tus rutas API (routes/api.php)
│   └── ...
└── /frontend         # Proyecto React (Interfaz de Usuario)
    ├── public
    ├── src
    ├── ...
    └── package.json

🚀 Puesta en Marcha (Desarrollo Local)

Sigue estos pasos para configurar y ejecutar LibroVerse en tu máquina local.
Prerrequisitos

Asegúrate de tener instalado lo siguiente:

    PHP (versión compatible con Laravel 12)

    Composer

    Node.js (LTS recomendado)

    npm (viene con Node.js)

    MySQL Server

    Git

1. Clonar el Repositorio

Si aún no lo has hecho, clona este repositorio:

git clone <URL_DE_TU_REPOSITORIO>
cd LibroVerse-App

2. Configuración del Backend (Laravel)

Navega a la carpeta del backend, instala las dependencias, configura el entorno y la base de datos:

cd backend

# Instala las dependencias de Composer
composer install

# Copia el archivo .env de ejemplo y genera la clave de la aplicación
cp .env.example .env
php artisan key:generate

# Configura tu base de datos MySQL en el archivo .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=libroverse
# DB_USERNAME=root
# DB_PASSWORD=

# Ejecuta las migraciones de la base de datos (creará las tablas)
php artisan migrate

# Opcional: Si tienes seeders para datos de prueba
# php artisan db:seed

# Inicia el servidor de desarrollo de Laravel
php artisan serve
# El backend estará disponible en http://127.0.0.1:8000 (o un puerto similar)

3. Configuración del Frontend (React con Vite)

Abre una nueva ventana de terminal y navega a la carpeta del frontend, instala las dependencias y arranca el servidor de desarrollo:

cd frontend

# Instala las dependencias de Node.js
npm install

# Inicia el servidor de desarrollo de React con Vite
npm run dev
# El frontend estará disponible en http://localhost:5173 (o un puerto similar)

4. Acceder a la Aplicación

Una vez que ambos servidores (Laravel y React) estén funcionando, abre tu navegador y visita:
http://localhost:5173 (o el puerto que te indique Vite para el frontend).
🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de abrir issues para reportar bugs o sugerir características, y enviar Pull Requests con tus mejoras.
📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Disfruta construyendo tu propio universo de historias con LibroVerse! 🚀
