# GJS TypeScript Template

A modern template for building GTK applications using GJS (GNOME JavaScript) and TypeScript.

## Features

- **TypeScript Support**: Full type safety with `@girs` type definitions.
- **Modern GJS**: Uses ESM modules (`import`/`export`) and `gi://` imports.
- **GObject Inheritance**: Clean class-based component structure.
- **GTK 4**: Set up for GTK 4 development.

## Prerequisites

- `gjs` (1.70+ recommended)
- `npm` or `yarn`

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Compile TypeScript:**
    ```bash
    npm run build
    # OR manually:
    npx tsc
    ```

3.  **Run the application:**
    ```bash
    npm start
    # OR manually:
    ./dist/app.js
    ```

## Packaging

To create a distribution build with a self-installing runner:

```bash
npm run package
```

This creates a `release/` directory containing the compiled application and a `start.sh` script. The script checks for GJS and attempts to install it if missing.

## Project Structure

- `app.ts`: Main application entry point (TypeScript).
- `dist/`: Compiled JavaScript output.
- `ambient.d.ts`: Ambient type declarations for GJS environments.
- `tsconfig.json`: TypeScript configuration.

## License

MIT
