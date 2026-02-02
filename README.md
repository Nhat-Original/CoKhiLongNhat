# CoKhiLongNhat

## Requirements

- node
- npm
- A PostgreSQL database

## Intall dependencies

```bash
npm install
```

## Create .env.local file

Copy the example env file to .env.local and fill in the required environment variables.

```bash
cp .env.example .env.local
```

## Set up the database

Generate the Prisma client to set up the database connection.

```bash
npm run db:generate
```

Run the database migrations to create the necessary tables.

```bash
npm run db:migrate
```

## Seed the database (optional)

Run the seed script to populate the database with initial data. The seed script can be defined in the `prisma/seed.ts` file.

```bash
npm run db:seed
```

## Open Prisma Studio (optional)

Prisma Studio is a web-based GUI to view and edit data in your database.

```bash
npm run db:studio
```

## Start the development server

```bash
npm run dev
```

