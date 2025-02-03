# Challenge Heroes

## Información:

- Levantar el proyecto:

```js
ng serve
```

- Estructura:

La estructura está creada de la siguiente manera:
Tenemos un módulo APP dónde importamos el módulo HTTP ya que lo usaremos en toda la aplicación. (Siendo consciente de que en proyectos grandes sería ideal solo importarlo en el módulo donde vayamos a usarlo.)

En este caso la decisión de importarlo en el módulo APP es que siempre estaré consumiento la API. Por lo tanto estaré haciendo peticiones y siempre estaré usando dicho módulo.

Dentro de nuestro módulo tenemos 2 módulos más:

- El Módulo Heroes que es el principal
- Un Módulo shared que tengo contemplado utilizar para algunas funciones que pueda reutilizar o helpers.

# Dentro de Heroes:

Dentro de APP tengo:

- Componentes
- Páginas
- Interfaces de las peticiones y una interfaz propia que he hecho para manejar los datos del localStorage por temas de persistencia pero al mismo tiempo para manejar los mínimos dato posibles
- El layout (es una página mas solo que en el enrutador actua como componente padre que se renderizará y con el router-outlet siempre estará presente)
- Tengo actualmente 3 servicios con posibles cambios:
- - **FavHeroes** (Gestión de agregar a favoritos los personajes usando LocalStorage)
- - **Heroes** El encargado principal de manejar las peticiones http a la API y el trato de los datos como su conteo.
- - **Loadingservice** Servicio solo y exclusivamente para manejar el carga de peticiones con un behaviorSubject que tiene un valor booleando y renderizo un componente loading dependiendo de su valor en las pantallas.
    ((Mi planteamiento era usar el propio HeroesServices para esta variable ya que aunque está mas ordenado y se implemente CleanCode no me parece la mejor manejar usar un único dato aislado un único servicio.))

# Funcionamiento:

Al cargar la aplicación el router APP automáticamenet por defecto cargará un lazyLoading el módulo y la información de Heroes.

Por defecto la ruta que debe cargar el módulo Heroes es la lista de héroes limitadas a 50.

En este caso lo que he hecho ha sido crear funciones en mi servicio inyectando la dependencia de HTTP.

Antes de nada tenemos que tener en cuenta que para acceder a la API se debe acceder con una clave privada y pública seguida dde un TimeStamp que pide para verificar la identida de la persona de la API. Por lo tanto tengo una función que hace el cálculo de un hasheo de dichos datos, de esta forma reutilizo la función para hacer peticiones:

((Si el proyecto escalase a más de un servicio, crearía un servici o una función para manipular le hasheo y cambiar todas las urls de forma mas dinámica pensaba para usarlo en cualquier servicio))

La función getHeroes no devuelve nada tiene un término de búsqueda que pasar por variable el cual es opcional ya que está igualado a 10. Se trata de la cantidad de registros que queremos.

Antes de cualquier ejecución modifilo los valores de mis observables que me ayudarán a que el usuario vea el componente loading:

- Reseteando el contador a 0 por búsqueda
- Cambiando el loading de true a false dependiendo del estado de la petición

Cuando hago la petición, recojo la respuesta y en vez de retornarla igualo el resultado de la propia petición a mis observables al subscribirme a la petición. Así tengo acceso a dichos datos en toda la aplicación al inyectar y ejecutar la función getHeroes.

Todo el proceso donde el contador pasa a 0 y el loading actua se encuentra en todas las peticiones asincronas.

Uno de los apartados más importantes a tener en cuenta es que uso una variable donde almaceno los heroes de la primera petición.

De tal forma que al poner el input del término de búsqueda a 0.
No tengo que volver a hacer la petición de búsqueda de mis 50 héroes.

Además de ahorrarme tener que hacer peticiones.

Almaceno distintos datos en el localStorage para no teenr que hacer peticiones independientes por héroes. Como para la persistencia necesito un ID pero para mostrar los héroes favoritos necesito más información como el nombre y la imagen. Almaceno toda la información en el LocalStorage para no tener que hacer dichas peticiones.

En la página de mostrar un solo héroe rescato el params de el id de la propia ruta para hacer la petición del héroe por Id. Recupero el héroe y un Id de cómics para hacer posteriormente una segunda petición de los cómics del Héroe para moder mostrarlos también:

Esto lo hago en 2 switchMap para devolver un observable nuevo. Después del primero.

# DOCUMENTACIÓN PDF

Esta prueba consiste en la creación de una pequeña aplicación para obtener información
sobre diferentes personajes de Marvel.
Stack

- ● Uso de CSS. 👍
- ● No usar librerías de componentes como primeng, material, etc... 👍
- o Los componentes deben ser creados desde cero por ti mismo.👍
- ● Se permite libertad de cara a escoger empaquetador para la aplicación Angular.👍

## Requisitos

- ● La aplicación tiene que ser responsive👍
- ● Correcta accesibilidad.👍
- ● Uso de Linters y Formatters.👍
- ● La consola del navegador debe de estar limpia de errores y advertencias.👍
- ● Preparación de un archivo README, donde se explicará cómo ejecutar la
  aplicación, la arquitectura y estructura, así como toda la información relevante acerca del proyecto. 👍

## Opcional

- ● La aplicación puede estar desplegada
- ● Se valorará el uso de variables CSS y nomenclatura BEM.
- Contacto: Si durante la realización de la prueba encuentras alguna duda o necesitas aclaraciones, no
  dudes en contactar con tu formador asignado.
- Documentación y utilidades api-rest:
- - Las peticiones se tienen que realizar a la siguiente URL.
    La documentación se puede consultar en este enlace.
- Diseño
  El diseño de las vistas deberá ser responsive y ceñirse a las imágenes aportadas en los
  \*pdf.👍

## Presentación

- El objetivo final de la prueba es presentar un repositorio de código público (Github o similar)
  con la solución desarrollada. 👍
- En el repositorio deberá existir un archivo nombrado README donde se explicará cómo ejecutar la aplicación, la arquitectura y estructura de esta, así como toda la información relevante acerca del proyecto. 👍
  Vistas

## La aplicación deberá contener dos vistas:

### ● Vista principal 👍

- ○ Mostrará un listado de 50 personajes o el resultado de los personajes
  introducidos en el buscador.
- ○ Al hacer clic en el icono superior de favoritos, se deberán mostrar los
  personajes favoritos almacenados.

- ● Detalle de personaje
- ○ Mostrará información relativa al personaje y los cómics en los que aparece.

### Vista principal 👍

- ● Listado de personajes
- ○ Desarrolla una interfaz que siga el diseño propuesto en los \*pdfs - desktop.
- ○ La búsqueda de personajes debe apoyarse en el filtrado de la API.
- ● Funcionalidad
- ○ Inicialmente la página debe mostrar los primeros 50 personajes.

## La vista debe contener:

- ● Un icono con el logotipo. 👍
- ● Un icono que mostrará el número de personajes favoritos.👍
- ● Una barra de búsqueda en la que se podrán buscar personajes por su
  nombre. (Ejemplo: Si se busca por “Spider” se deberían mostrar todos
  los nombres que contengan dicha palabra).👍
- ● Un contador con los resultados obtenidos tras cada búsqueda que se
  actualizará en tiempo real.👍
- ● Un listado de resultados, cada uno de los cuales contendrá la imagen,
  nombre del personaje y una opción para añadir el personaje a
  favoritos.👍

- ○ Al hacer clic en un resultado, se deberá de redirigir a la vista de detalle del personaje.👍
- ○ Al hacer clic en el icono de favoritos en cada resultado, deberá cambiar de color y se deberá añadir una unidad al contador de la zona superior, como se indica en los diseños. Debe de existir la posibilidad de eliminar los personajes favoritos, modificando el contador. La información de favoritos debe persistir entre las diferentes vistas.👍
- Filtro de favoritos:
- - ○ Al hacer clic en el icono superior de favoritos, se deberán mostrar
    únicamente las tarjetas con los personajes favoritos almacenados por el
    usuario.👍
- ○ Para volver al listado de personajes de nuevo, se deberá hacer clic en el
  logotipo Marvel situado en la barra de navegación.👍
- ○ Hover: aplicar efecto para cambiar el diseño de la tarjeta de personaje según
  \*pdf - hover.👍

## Detalle personajes

- ● Detalles de personaje👍
- ○ Desarrolla una interfaz que siga el diseño propuesto en los \*pdf - responsive.👍
- ● Funcionalidad👍
- ○ La vista debe de contener:
- ○ Un icono con el logotipo. Al pulsar en dicho enlace se redirigirá a la vista
  principal (Página de listado de personajes).👍
- ○ Un icono que mostrará el número de personajes favoritos. Al pulsar en dicho
  icono se redirigirá a la vista principal, mostrando el listado de personajes
  favoritos almacenados.👍
- ○ La imagen, título y descripción del personaje, así como la opción de añadir al
  personaje como favorito.👍
- ○ Un listado de los cómics del personaje ordenados por fecha de salida.👍
- ○ Solo se deberán mostrar los primeros 20 cómics de cada personaje.👍
