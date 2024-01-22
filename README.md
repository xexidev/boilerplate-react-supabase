# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



FIX:

- En recipe, y supongo en edit y create, mirar que cuando se extrae la ID del usuario, se haga desde el servidor y se haga en la lógica de useRecipes, no en el componente
- Una vez solucionados los errores que existen en Recipe.jsx, pasar las soluciones a Recipes y MyRecipes, y mirar por qué en editRecipe no pasa el error
- IsTheAuthor: Hacer que solo haya que pasarle la userID de la receta, la userId del usuario la puede coger directamente del hook
- Cambiar las llamadas a la base de datos en las que se declara primero la variable como null y devolverla directamente dentro del try, como en la de getSingleRecipe
- Una vez arreglado el useRecipes, miar por ejemplo, en la página de recipe, si se carga una receta que no existe, que se muestre en pantalla cuando la función devuelva false.
- Mirar de cambiar el código que setea las cookies de lugar que actualmente está en supabase.js