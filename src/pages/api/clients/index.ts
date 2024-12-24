import type { APIRoute } from 'astro';
import { Clients, db } from 'astro:db';
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {


    const users = await db.select().from(Clients);

    return new Response(JSON.stringify({ message: "Hola mundo", method: "GET", data: users }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const POST: APIRoute = async ({ params, request }) => {
    try {

        const body = await request.json();

        const res = await db.insert(Clients).values([
            { ...body }
        ]);

        return new Response(JSON.stringify({ message: "Hola mundo", method: "POST", data: body }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error: any) {

        return new Response(JSON.stringify({ message: error.message, method: "POST" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }
};