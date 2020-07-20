# comercio
Sistema de apoyo a la toma de decisiones para la distribución de artículos de primera necesidad en Holguín


## Instalación
### Clonar el repo
Ya sea vía `https`:

    git clone https://github.com/ktowen/comercio.git

O bien, vía `ssh`:

    git clone git@github.com:ktowen/comercio.git
### Base de datos
- Instalar PostgresSQL
- Crear una base de datos con nombre `comercio`

### Backend
Desde una consola dentro de la carpeta del proyecto acceder a la carpeta *backend* usando:

    cd backend

#### Instalar poetry
- https://python-poetry.org/docs/#windows-powershell-install-instructions
#### Instalar paquetes
Desde una consola dentro de la carpeta del backend, ejecutar:

    poetry install

#### Correr las migraciones
Desde una consola dentro de la carpeta del backend, ejecutar:

    poetry run python manage.py migrate

#### Cargar los fixtures
Desde una consola dentro de la carpeta del backend, ejecutar:

    poetry run python manage.py loaddata bodegas repartos oficodas

### Client
Desde una consola dentro de la carpeta del proyecto acceder a la carpeta *client* usando:

    cd client

#### Instalar NodeJS
- https://nodejs.org/en/download/

#### Instalar Yarn 1
- https://classic.yarnpkg.com/en/docs/install

#### Instalar dependencias
Desde una consola dentro de la carpeta del client, ejecutar:

    yarn

## Ejecución
Desde una consola dentro de la carpeta del backend, ejecutar:

    poetry run python manage.py runserver

Desde otra consola dentro de la carpeta del client, ejecutar:

    yarn start

Se abrirá el navegador en http://127.0.0.1:3000/, si ese puerto no esta disponible en la consola dirá cual se está usando.

## Para acceder a `/admin`:
Crear un *superuser*:

    poetry shell
    python manage.py createsuperuser

- Abrir http://127.0.0.1:8000/admin/
