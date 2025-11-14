# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 🎨 Definición de Variables Globales

En `index.css`, `App.css` o `styles/variables.css`, define:

```css
@import url("https://fonts.googleapis.com/css2?family=Lemon:wght@400;700&display=swap");

:root {
  --bg-color: #ffffff;
  --text-color: #222;
  --input-bg: #f5f5f5;
  --input-border: #ccc;
  --accent-color: #4caf50;
  --accent-gradient: linear-gradient(to right, #f0f0f0, #e8e8e8);
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  --card-bg: #f3f6f9;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --button-bg: #0077cc;
  --button-hover: #005fa3;

  --navbar-bg: #a6c1ee;
  --navbar-border: #8fb3e0;
  --navbar-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  --navbar-title: #ffffff;

  --focus-border: #a6c1ee;
  --cancel-bg: #ccc;
  --cancel-text: #333;
  --cancel-hover-bg: #bbb;

  --empty-bg: #f9f9f9;
  --empty-text: #888;
  --empty-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.dark-mode {
  --bg-color: #121212;
  --text-color: #e0e0e0;
  --input-bg: #1e1e1e;
  --input-border: #444;
  --accent-color: #81c784;
  --accent-gradient: linear-gradient(to right, #2a2a2a, #1e1e1e);
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  --card-bg: #1e1e2e;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  --button-bg: #4a90e2;
  --button-hover: #357ab8;

  --navbar-bg: #2a3550;
  --navbar-border: #4a5e8a;
  --navbar-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  --navbar-title: #f0f0f0;

  --focus-border: #6f9dd9;
  --cancel-bg: #444;
  --cancel-text: #ddd;
  --cancel-hover-bg: #555;

  --empty-bg: #2a2a3a;
  --empty-text: #aaa;
  --empty-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
---
activa el cambio de modo en app.jsx

useEffect(() => {
  document.body.classList.toggle("dark-mode", isDarkMode);
}, [isDarkMode]);

---

en cada archivo css ejemplo , llama ambas variables del app.css
para el cambio de modo

.container {
  background-color: var(--card-bg);
  color: var(--text-color);
  box-shadow: var(--card-shadow);
}

```
