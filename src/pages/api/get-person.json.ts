import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
    const user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com'
    };

    return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};