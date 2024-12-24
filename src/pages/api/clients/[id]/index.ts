import type { APIRoute } from 'astro';
import { db, Clients, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    try {

        const id = params.id ?? "";

        if (!id) {
            return new Response(JSON.stringify({ message: "Id is required " + id }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const client = await db.select().from(Clients).where(eq(Clients.id, +id));

        if (client.length === 0) {
            return new Response(JSON.stringify({ message: "User not found with id " + id }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify({ message: "Hola mundo", method: "GET", data: client }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error: any) {

        return new Response(JSON.stringify({ message: error.message, method: "GET" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }

};


export const PUT: APIRoute = async ({ params, request }) => {
    try {

        const body = await request.json();
        const id = params.id ?? "";

        const res = await db.update(Clients).set(body).where(eq(Clients.id, +id));

        return new Response(JSON.stringify({ message: "Hola mundo", method: "PUT", data: body }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error: any) {

        return new Response(JSON.stringify({ message: error.message, method: "PUT" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }
};

export const DELETE: APIRoute = async ({ params, request }) => {

    try {
        const id = params.id ?? "";

        if (!id) {
            return new Response(JSON.stringify({ message: "Id is required " + id }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const res = await db.delete(Clients).where(eq(Clients.id, +id));

        return new Response(JSON.stringify({ message: "Hola mundo", method: "DELETE", data: res }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message, method: "DELETE" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};