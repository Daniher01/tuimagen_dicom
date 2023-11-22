# Archivo de Docker Compose para OIHF con ORTHNC

### `Ohif` 
Es una plataforma de imagenes medicas de codigo abierto basada en la web

### `Orthanc` 
Es un servidor de DICOM ligero, gratuito y de codigo abierto para imagenes medicas

#### Clonar el repositorio

`git clone https://github.com/Daniher01/tuimagen_dicom.git \n`
`cd ohif-orthanc`
`docker-compose up -d`

#### Configuraciones extra

- Crear un archivo `.env` basado en `env_ejemplo`
- Agregar los datos como El nombre del proyecto docker y los datos para BD

#### Ingreso 

1. Para acceder a `OHIF` ir a la direccion `http://server-ip:3000
2. Para acceder a `ORTHANC` ir a la direccion `http://server-ip:8042`

El usuario por defecto es `tuimagen` y la clave por defecto es `tuimagen`

###### Proyecto basado en https://github.com/hyper4saken/ohif-orthanc.git