# README

## Cosas que hay que tener instaladas

* Node 20.10.0. 
  * Hay .nvmrc.
* Docker

## Como correr las cosas

Para levantar la DB, correr el `docker.sh`

En front y back hay que hacer `npm install` y `npm run dev`.

## Detalles

Frontend es React con Vite. En el setup_db hay algunos usuarios para loggearse.
Se expone en `http://localhost:5173/`

Backend es Express.
Se expone en `http://localhost:3000/`

La DB es postgres y se expone en el `5432`. El user es `postgres` y la contraseña es `pepita`.