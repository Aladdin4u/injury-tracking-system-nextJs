# Injury Tracker

A web application to record and track the injuries reported by a person

This aplication shows how to implement a **fullstack app in TypeScript with :
- [**Next.js**](https://nextjs.org/)**: A [React](https://reactjs.org/) framework
- [**Apollo Client**](https://www.apollographql.com/docs/react/) (frontend), 
- [**GraphQL Yoga**](https://the-guild.dev/graphql/yoga-server): GraphQL server
- [**Pothos**](https://pothos-graphql.dev/): Code-first GraphQL schema definition library
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**postgres-prisma**](https://vercel.com/docs/storage/vercel-postgres): Vercel Postgres is a serverless SQL database
- [**Ant Design**](https://ant.design): Ant Design is an enterprise-class UI design language and React UI library

## Getting started

### Clone the entire repo and install dependencies

Clone the entire repo:

```
git clone https://github.com/Aladdin4u/injury-tracking-system-nextJs.git
```

Install npm dependencies:

```
cd injury-tracking-system-nextJs
yarn install
```

## Setting up environment variables

Once that's done, copy the .env.example file in this directory to .env (which will be ignored by Git):

```
cp .env.example .env
```

### Obtain OAuth 2.0 credentials from the Google API Console

Visit the [Google API Console](https://developers.google.com/identity/protocols/oauth2) to obtain OAuth 2.0 credentials such as a client ID and client secret that are known to both Google and your application.

The "Authorized redirect URIs" used when creating the credentials must include your full domain and end in the callback path. For example;

- For production: https://{YOUR_DOMAIN}/api/auth/callback/google
- For development: http://localhost:3000/api/auth/callback/google

### Obtain postgres-prisma database URL

Visit the [Vercel Dashboard](https://vercel.com/dashboard) 
- Select the Storage tab
- Click Create Database and enter your details
- Once that's done, Select the .env.local tab
- Copy **POSTGRES_PRISMA_URL** and **POSTGRES_URL_NON_POOLING** secret

### Create and seed the database

Run the following command to create your PostreSQL database file. This also creates the `User`, `Report` and `BodyMap` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

**Note:**
To use SQLite or other Postgres Database check out [Prisma docs](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

### Start the app
Once the environment variables is set

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.