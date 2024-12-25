import { boolean, int, mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core';

export const Clients = mysqlTable('clients', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    age: int().notNull(),
    isActive: boolean().notNull().default(true),
});


// export const Posts = mysqlTable('posts', {
//     id: varchar({ length: 255 }).primaryKey(),
//     title: varchar({ length: 255 }),
//     likes: int().default(0),
// });