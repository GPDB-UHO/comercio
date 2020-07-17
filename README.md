# comercio
Sistema de apoyo a la toma de decisiones para la distribución de artículos de primera necesidad en Holguín


## Instalación
### Clonar el repo
Ya sea vía `https`:

    git clone https://github.com/ktowen/comercio.git

O bien, vía `ssh`:

    git clone git@github.com:ktowen/comercio.git
### Base de datos
- Crear una base de datos con nombre `comercio`

### Poetry
#### Instalar poetry
- https://python-poetry.org/docs/#windows-powershell-install-instructions
#### Instalar paquetes
Desde una consola dentro de la carpeta del proyecto, ejecutar:

    poetry install

#### Correr las migraciones
Desde una consola dentro de la carpeta del proyecto, ejecutar:

    poetry run python manage.py migrate

#### Cargar los fixtures
Desde una consola dentro de la carpeta del proyecto, ejecutar:

    poetry run python manage.py loaddata bodegas repartos oficodas

## Ejecución
Desde una consola dentro de la carpeta del proyecto, ejecutar:

    poetry shell
    python manage.py runserver

- Abrir http://127.0.0.1:8000/


## Para acceder a `/admin`:
Crear un *superuser*:

    poetry shell
    python manage.py createsuperuser

- Abrir http://127.0.0.1:8000/admin/
