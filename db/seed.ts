import { getCollection } from 'astro:content';
import { Clients, db, } from 'astro:db';
import { Posts } from 'astro:db';



// https://astro.build/db/seed
export default async function seed() {



	await db.insert(Clients).values([
		{ name: 'Alice', age: 28, isActive: true },
		{ name: 'Jose', age: 24, isActive: true },
		{ name: 'Andres', age: 28, isActive: true },
		{ name: 'Perez', age: 31, isActive: true },
		{ name: 'Gonzales', age: 30, isActive: false },
	]);

	const posts = await getCollection('blog');


	await db.insert(Posts).values(posts.map(post => {
		return {
			id: post.id,
			title: post.data.title,
			likes: Math.random() * 100,
		};
	}));



	console.log('Seeded database successfully');
};
seed();