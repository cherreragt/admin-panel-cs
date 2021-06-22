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
 - **Swagger**

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


 ## Imagenes
 ![image](https://user-images.githubusercontent.com/58378442/122859335-18c17580-d2d9-11eb-8a3d-d89b27035da3.png)
![image](https://user-images.githubusercontent.com/58378442/122859406-3989cb00-d2d9-11eb-847d-3cc80322193e.png)
![image](https://user-images.githubusercontent.com/58378442/122859426-3ee71580-d2d9-11eb-966b-8ae2b044e485.png)
![image](https://user-images.githubusercontent.com/58378442/122859434-43133300-d2d9-11eb-82cb-0e1ad342f5e2.png)
![image](https://user-images.githubusercontent.com/58378442/122859447-47d7e700-d2d9-11eb-8ab8-007b5d06df3a.png)
![image](https://user-images.githubusercontent.com/58378442/122859455-4c040480-d2d9-11eb-9d10-50251d65560a.png)
![image](https://user-images.githubusercontent.com/58378442/122859467-50302200-d2d9-11eb-9b05-47ee5425628f.png)
![image](https://user-images.githubusercontent.com/58378442/122859488-57efc680-d2d9-11eb-90bc-c2feafd1a089.png)
![image](https://user-images.githubusercontent.com/58378442/122859521-65a54c00-d2d9-11eb-9ae2-02d4161d6fd8.png)
![image](https://user-images.githubusercontent.com/58378442/122859542-6a6a0000-d2d9-11eb-90d7-72895d8951cd.png)
![image](https://user-images.githubusercontent.com/58378442/122859566-75bd2b80-d2d9-11eb-9c0f-0fa07b080de9.png)
![image](https://user-images.githubusercontent.com/58378442/122859590-7d7cd000-d2d9-11eb-9f4f-dbadc06f5f05.png)
![image](https://user-images.githubusercontent.com/58378442/122859599-81105700-d2d9-11eb-8b19-87978dac1b35.png)
![image](https://user-images.githubusercontent.com/58378442/122859610-840b4780-d2d9-11eb-8cb2-db11b186847f.png)
![image](https://user-images.githubusercontent.com/58378442/122859626-8a012880-d2d9-11eb-9a5c-2e0a303d8166.png)
![image](https://user-images.githubusercontent.com/58378442/122859654-92f1fa00-d2d9-11eb-976f-428432fed5bc.png)
