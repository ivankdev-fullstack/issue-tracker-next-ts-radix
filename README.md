# Description

Issue tracker that helps you to track your personal tasks and inspect the other ones. It deals with filtering by status and sorting by issue name, description and date they were created.

## Techonologies used

- **Next.js:** A React-based framework for building server-rendered and statically generated web applications, API integration, and performance optimizations.

- **React 18:** The latest major release of the popular JavaScript library for building user interfaces.

- **Typescript:** A superset of JavaScript that adds static typing, allowing for improved code quality.

- **Prisma:** A modern ORM that simplifies database access by providing an intuitive query builder and type-safe data models for TypeScript/JavaScript.

- **Tailwind CSS:** A utility-first CSS framework that allows for rapid styling by composing pre-defined classes directly in HTML or JSX.

- **Recharts:** A declarative charting library for React that simplifies the process of creating interactive data visualizations.

## Installation

Project is using `npm` as a main package manager.

```bash
$ npm install
```

Fill up these variables in your `.env` file:

- `DATABASE_URL` - for a local or external MySQL database
- `NEXTAUTH_URL` - your application path it working on
- `NEXTAUTH_SECRET` - generate your own secret
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - get from Google Cloud Console service

## Running the app

```bash
$ npm run dev
```
