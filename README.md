# DBaN

**DBaN** is a modern React application built with **TypeScript** and styled with **Tailwind CSS**.
The project is built on **Next.js** for server-side rendering (SSR) and uses **Yarn** as a package manager.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn

### Installing

1. Clone the repository:

```sh
git clone https://github.com/late-exairu/DBaN.git
```

2. Install the dependencies:

```sh
yarn install
```

2. Copy the .env.example file to a new file named .env and fill in the necessary environment variables.

3. Start the development server:

```sh
yarn dev
```

The application should now be running at http://localhost:3000.

## Project Structure

- `src/`: TypeScript and React code.
  - `_components/`: React components.
  - `app/`: Main application logic.
  - `lib/`: Utility functions and helper code.
  - `state/`: State management code.
  - `styles/`: Styles for the application.
  - `types.ts`: TypeScript type definitions.
  - `utils/`: Utility functions and helper code.
- `public/`: Static files like images.
- `README.md`: Information about the project and how to use it.
- `package.json`: List of project dependencies and scripts.
- `tsconfig.json`: TypeScript compiler options.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Next.js](https://nextjs.org/) - A React framework for production.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [Yarn](https://yarnpkg.com/) - A fast, reliable, and secure dependency management tool.
