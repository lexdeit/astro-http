import { boolean, int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const Clients = mysqlTable('clients', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    age: int().notNull(),
    isActive: boolean().notNull().default(true),
});
