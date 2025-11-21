# Cuarto Proyecto Curso React Fernando

## PROYECTO HEROES APP CURSO REACT PROFE FERNANDO

---

### 1. ❓ Pregunta

¿Cuál es la **principal ventaja** de utilizar los "**query parameters**" del URL para gestionar el estado de la aplicación (como la página actual o el filtro de categoría) en lugar de usar el hook `useState`?

* **Respuesta Correcta:** Permite que el estado de la aplicación sea **persistente y se pueda compartir**. Un usuario puede recargar la página o compartir el URL y verá exactamente el mismo estado.
* **Explicación:** Esta es la razón fundamental. El estado en el URL permite guardar el "**punto exacto**" en el que se encuentra el usuario, algo que `useState` no puede hacer por sí solo ya que su estado vive en la memoria y se reinicia con cada recarga de la página.

---

### 2. ❓ Pregunta

¿Cuál es el **propósito principal** de una librería como **TanStack Query** en una aplicación de React?

* **Respuesta Correcta:** Gestionar el "**estado del servidor**", simplificando enormemente la lógica de **caché**, los estados de carga/error y los reintentos de peticiones asíncronas.
* **Explicación:** TanStack Query abstrae toda la lógica compleja que rodea las peticiones de datos, permitiendo que el desarrollador simplemente "**solicite**" la data y la librería se encargue de todo lo demás (caching, re-fetching, etc.).

---

### 3. ❓ Pregunta

En TanStack Query, ¿por qué es fundamental que cualquier argumento que utilice la función de `queryFn` (como un ID de página o una categoría de filtro) sea incluido en el `queryKey`?

* **Respuesta Correcta:** Porque **TanStack Query utiliza el `queryKey` para cachear los datos**. Si la clave no cambia cuando cambian los argumentos, se devolverán datos incorrectos del caché.
* **Explicación:** El `queryKey` es la "**huella digital**" de una petición. Si pides la página 1, el `queryKey` debe reflejarlo (ej. `['heroes', { page: 1 }]`). Si luego pides la página 2, el `queryKey` debe cambiar a `['heroes', { page: 2 }]` para que TanStack Query entienda que es una petición diferente y no devuelva el caché de la página 1.

---

### 4. ❓ Pregunta

¿Cuál es el **beneficio principal** de crear un "**custom hook**" (ej. `useHeroSummary`) para encapsular una llamada de `useQuery`?

* **Respuesta Correcta:** **Centraliza la lógica de obtención de datos**, haciendo que el código sea **reutilizable**, más fácil de mantener y más limpio en los componentes que lo usan.
* **Explicación:** Si necesitas la misma petición (con la misma configuración de `queryKey`, `staleTime`, etc.) en varios lugares, un custom hook evita duplicar código. Si necesitas cambiar algo, lo cambias en un solo lugar: el hook.

---

### 5. ❓ Pregunta

Para crear una **ruta dinámica** en React Router que capture un valor del URL (como un slug o id), ¿qué sintaxis se usa en la definición del `path` y qué hook se usa en el componente para leer ese valor?

* **Respuesta Correcta:** `path="/heroes/:idSlug"` y se lee con el hook de **`useParams`**.
* **Explicación:** La sintaxis de **dos puntos (`:`)** se usa para definir un parámetro de ruta dinámico. El hook `useParams` devuelve un objeto con estos parámetros como pares clave-valor.

---

### 6. ❓ Pregunta

**Verdadero o Falso:** El hook `useNavigate` de React Router se utiliza principalmente para envolver enlaces (`<a>`) y convertirlos en `Link`s que no recargan la página completa.

* **Respuesta Correcta:** **FALSO**
* **Explicación:** El hook `useNavigate` devuelve una función que permite realizar la navegación de **forma programática (imperativa)**, por ejemplo, como respuesta a un evento `onClick` de un botón o después de que se complete una operación asíncrona.

---

### 7. ❓ Pregunta

¿Qué controla la opción **`staleTime`** en una configuración de `useQuery`?

* **Respuesta Correcta:** El tiempo durante el cual una petición de datos se considera "**fresca**". Durante este período, **no se volverá a solicitar la data a la red**, sino que se servirá directamente del caché.
* **Explicación:** `staleTime` es una de las configuraciones de caché más importantes. Un `staleTime` de 5 minutos significa que cualquier llamada a esa query dentro de esos 5 minutos devolverá instantáneamente los datos cacheados sin hacer una nueva petición.

---

### 8. ❓ Pregunta

Cuando una API de paginación utiliza **`offset`** en lugar de `page`, ¿qué representa el `offset` y cómo se calcula generalmente a partir de un número de página?

* **Respuesta Correcta:** REPRESENTA EL **NÚMERO DE ITEMS A SALTAR** Y SE CALCULA COMO **`(page - 1) * limit`**.
* **Explicación:** Para la página 1 (`page = 1`), el cálculo es $(1 - 1) * limit = 0$, por lo que no se salta ningún ítem. Para la página 2 (`page = 2`), se salta el primer lote de ítems, $(2 - 1) * limit = limit$.

---

### 9. ❓ Pregunta

Si una petición con `useQuery` falla porque el recurso no existe (error **404**), y no queremos que TanStack Query intente hacer la misma petición varias veces, ¿qué opción de configuración se debe usar?

* **Respuesta Correcta:** `retry: false`
* **Explicación:** Por defecto, TanStack Query reintenta las peticiones fallidas 3 veces. Establecer `retry: false` desactiva este comportamiento, lo cual es útil para errores como **404**, donde el recurso simplemente no existe y reintentar no tiene sentido.

---

### 10. ❓ Pregunta

**Verdadero o Falso:** Al crear variables de entorno en un proyecto de **Vite** para ser usadas en el código del cliente (navegador), es suficiente con crearlas en un archivo `.env` sin ninguna convención de nombre especial.

* **Respuesta Correcta:** **Falso**
* **Explicación:** Para que Vite exponga una variable de entorno al código del cliente, su nombre debe comenzar con el prefijo **`VITE_`**. Por ejemplo, `VITE_API_URL`. Esto es un mecanismo de seguridad para evitar exponer accidentalmente claves secretas.

---

¡Por supuesto! Aquí tienes el cuestionario de la Sección 15 con formato Markdown.

# Cuestionario Sección 15

---

## 1. ❓ Pregunta de persistencia de estado

**¿Cuál es la principal ventaja de gestionar el estado de los filtros de búsqueda (como el nombre del héroe o su nivel de fuerza) a través de los parámetros de la URL en lugar de usar un estado local de React (`useState`)?**

* **Respuesta Correcta:** Permite que el estado de la búsqueda sea **persistente en recargas** y que la **URL sea compartible**, mostrando a otros usuarios los mismos filtros y resultados.
* **Explicación:** Almacenar los filtros en la URL (*query parameters*) asegura que si el usuario recarga la página o comparte el enlace, la interfaz de búsqueda se inicializará con exactamente los mismos valores, creando una experiencia de usuario consistente y predecible.

---

## 2. ❓ Pregunta de Rendimiento y `useRef`

**¿Por qué se prefiere usar `useRef` en lugar de `useState` para manejar el valor de un campo de texto (`input`) cuando su valor no necesita ser mostrado en tiempo real en otra parte de la UI?**

* **Respuesta Correcta:** Para **evitar re-renderizados innecesarios** del componente con cada pulsación de tecla, **mejorando así el rendimiento** de la aplicación.
* **Explicación:** Si solo necesitas leer el valor del *input* en un momento específico (como al presionar "Enter"), usar `useState` causaría un *re-render* en cada tecleo, lo cual es ineficiente. `useRef` permite acceder al valor del DOM directamente sin provocar estos *re-renders*.

---

## 3. ❓ Pregunta de TanStack Query y Caching

**En TanStack Query, ¿cuál es el propósito de construir una `queryKey` dinámica que incluya los criterios de búsqueda (ej. `['heroes/search', { name: 'Batman', strength: 7 }]`)?**

* **Respuesta Correcta:** Para permitir que TanStack Query gestione un **caché separado para cada combinación de filtros**, devolviendo datos instantáneamente si una búsqueda idéntica se realiza de nuevo.
* **Explicación:** TanStack Query utiliza la `queryKey` como identificador único para los datos en caché. Si la llave es diferente (porque los filtros cambiaron), se considera una nueva consulta. Si la llave es la misma, puede devolver los datos cacheados, evitando una petición de red innecesaria.

---

## 4. ❓ Pregunta de React API `use`

**Verdadero o Falso: Una de las principales ventajas del hook `use` sobre el tradicional `useContext` es que puede ser llamado dentro de condicionales (como un `if`) o bucles, a diferencia de los hooks convencionales que deben ser llamados en el nivel superior del componente.**

* **Respuesta Correcta:** **Verdadero**
* **Explicación:** A diferencia de los *hooks* como `useState` o `useContext` que deben seguir las "Reglas de los Hooks", el API `use` **no es considerado un hook tradicional** y sí puede ser utilizado dentro de estructuras condicionales, lo que ofrece mayor flexibilidad en ciertos escenarios.

---

## 5. ❓ Pregunta de `useEffect`

**¿Cuál es un caso de uso justificado y común para el hook `useEffect` en una aplicación de React?**

* **Respuesta Correcta:** Para **sincronizar el estado de React con un sistema externo**, como guardar datos en `localStorage` o hacer una llamada a una API.
* **Explicación:** El propósito principal de `useEffect` es manejar "**efectos secundarios**", que son operaciones que interactúan con el mundo exterior al componente, fuera del flujo de renderizado de React. Un ejemplo perfecto es guardar el estado de los favoritos en `localStorage` cada vez que este cambia.

---

## 6. ❓ Pregunta de Context API y Encapsulamiento

**¿Por qué, al crear un `Context.Provider`, es una práctica común encapsular toda la lógica de estado (`useState`) y las funciones que lo modifican dentro del propio componente proveedor?**

* **Respuesta Correcta:** Para **centralizar y encapsular la gestión del estado**, haciendo que el *Provider* sea la **única fuente de verdad** y el único responsable de la lógica de negocio de ese estado.
* **Explicación:** Al colocar la lógica (`useState`, `toggleFavorite`, etc.) dentro del `FavoriteHeroProvider`, este se convierte en un módulo **autónomo y cohesivo**. Cualquier componente que consuma el contexto obtiene tanto los datos como las funciones para manipularlos de una fuente única y predecible.

---

## 7. ❓ Pregunta de Shadcn/UI

**Verdadero o Falso: Al usar la librería Shadcn/UI, se añaden componentes que vienen con una funcionalidad y accesibilidad pre-construidas pero sin estilos definidos, lo que permite una personalización visual completa usando herramientas como Tailwind CSS.**

* **Respuesta Correcta:** **Verdadero**
* **Explicación:** Shadcn/UI se basa en "**headless components**". Esto significa que los componentes (como el *Accordion* o *Slider*) vienen con toda la lógica, manejo de estados y atributos de accesibilidad listos para usar, pero son **visualmente un lienzo en blanco** para que el desarrollador aplique sus propios estilos.

---

## 8. ❓ Pregunta de Componentes Controlados/No Controlados

**¿Cuál es la diferencia fundamental entre usar la propiedad `defaultValue` y la propiedad `value` en un elemento `<input>` en React?**

* **Respuesta Correcta:** `defaultValue` establece solo el valor inicial del *input* y permite que el DOM lo controle después (**no controlado**), mientras que `value` ata el *input* al estado de React, requiriendo una función `onChange` para cualquier cambio (**controlado**).
* **Explicación:** Esto es clave. `defaultValue` es para componentes "**no controlados**"; se renderiza una vez y luego el usuario puede escribir libremente. `value` crea un "**componente controlado**"; su valor está dictado por el estado de React y no cambiará a menos que el estado se actualice, usualmente a través de `onChange`.

---

## 9. ❓ Pregunta de `localStorage`

**Cuando se persiste un estado (como un arreglo de objetos) en `localStorage`, ¿por qué es necesario usar `JSON.stringify` al guardar y `JSON.parse` al leer?**

* **Respuesta Correcta:** Porque `localStorage` solo puede almacenar datos en **formato de texto** (`string`), no puede almacenar objetos o arreglos de JavaScript de forma nativa.
* **Explicación:** La API de `localStorage` está diseñada para guardar pares clave-valor donde los valores deben ser *strings*. `JSON.stringify` convierte el arreglo de favoritos en una cadena de texto para poder guardarlo, y `JSON.parse` hace el proceso inverso para reconstruir el arreglo al leerlo.

---

## 10. ❓ Pregunta de Arquitectura y Lógica de Fetching

**Al desacoplar la lógica de *fetching* en una función "action" separada (como `searchHeroesAction`), ¿qué beneficio principal se obtiene en la arquitectura de la aplicación?**

* **Respuesta Correcta:** El código se vuelve más **reutilizable y fácil de probar**, y los componentes se centran solo en la **presentación (UI)**, sin mezclarse con la lógica de obtención de datos.
* **Explicación:** Este es un principio de diseño de *software* conocido como "**Separación de Responsabilidades**". El componente se encarga de mostrar la UI y manejar la interacción, mientras que la acción se encarga exclusivamente de la comunicación con la API. Esto hace que cada parte sea más simple y fácil de mantener.

---
