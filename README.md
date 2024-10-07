# Hachium Frontend Coding Test

## Project Setup

This project uses [Nx](https://nx.dev/) for managing multiple applications and libraries within a monorepo. The main application is a Task Management app built with Vite and React. Additionally, it includes Storybook for UI component development, Jest for testing, and a mock server using Express.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (optional but recommended)
- [Nx CLI](https://nx.dev/cli/tao) (optional but recommended)

## Installation and Running the Project Locally

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/Hachium-Frontend-Coding-Test.git
cd Hachium-Frontend-Coding-Test
```

2. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

```bash
# Using npm
npm install

# Using Yarn
yarn install
```

## Running the Project

To run the Task Management app:

```bash
# Using npm
npm run start:tm

# Using Yarn
yarn start:tm
```

To run Storybook:

```bash
# Using npm
npm run storybook:tm

# Using Tarn
yarn storybook:tm
```

To run tests:

```bash
# Using npm
npm run test:tm

# Using Tarn
yarn test:tm
```

To run the mock server:

```bash
# Using npm
npm run start:mock

# Using Tarn
yarn start:mock
```

The Task Management app should now be running on `http://localhost:3456` and the mock server on `http://localhost:3333`.

Feel free to explore the code and modify it as needed. If you encounter any issues, please open an issue on the repository.
