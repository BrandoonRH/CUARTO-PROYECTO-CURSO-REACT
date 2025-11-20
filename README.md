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
