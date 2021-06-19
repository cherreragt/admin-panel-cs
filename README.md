# SVL Admin Panel

Es un panel de gestion de admins desarrollado en Angular & NodeJS en desarrollo.

## Demo
[Ver demo](https://admin.svlmexico.com/login)

## Mas informacion y herramientas utilizadas:
 - **Angular** (Framework utilizado en su version 11.2.6)
 - **HTML5**
 - **CSS3**
 - **Tailwind** (v2.1.2)
 - **NodeJS**
 - **Express**
 - **Sequelize MySQL2**
 - **Docker**

## Importante LEER

El servidor trabaja sobre HTTPS, por el cual necesitas el certificado y key para poder correr este proyecto.

Lineas a modificar

```javascript
const key  = readFileSync('src/svlmexico-key.key', 'utf8');
const cert = readFileSync('src/svlmexico-cert.crt', 'utf8');
```

Archivo .env

debes cambiar el puerto y host en caso de desplegarlo en heroku u otra plataforma que se necesite modificar lo antes mencionado, los datos de conección a la base de datos Y MUY IMPORTANTE modificar el campo JWTSECRET porque es quien firma tus tokens de autentificación si usas el mismo del proyecto seguro fakearan tu data, solo por letras randoms y con eso bastara, los demas campos (USER_ROLE, ADMIN_ROLE) NO los modifiques a menos que tengas los conocimientos necesarios.

```c

PORT = 3030
HOST = 0.0.0.0


DB_NAME = db_test
DB_USER = root
DB_HOST = localhost
DB_PORT = 3306
DB_PASS = ''

JWTSECRET = hagsd76asdjY@nsdkja@@test


USER_ROLE = USER_ROLE
ADMIN_ROLE = ADMIN_ROLE
```

Si deseas desplegarlo en docker el archivo Dockerfile esta en el backend & debes tener conocimientos de docker.


Por ultimo el proyecto de angular esta construido en la ultima versión, si deseas modificar algo debes construirlo de nuevo y adjuntarlo al backend para poder ver sus cambios.


## Rutas para desarrolladores (CS gRIP, cURL)

- **Swagger**

ruta /api-docs/#/

EJ https://admin.svlmexico.com/api-docs/


## Plugin CS16

- **[Plugin](https://github.com/Chris4589/panel_grip/blob/master/adm_alter.sma)**


 ## Creditos
**[ArisH](https://github.com/ArizHernandez) Diseño de auth**


