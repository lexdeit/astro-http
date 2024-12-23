import type { APIRoute } from "astro";
import { getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const slug = params.slug;

    if (!slug) {
        return new Response(JSON.stringify({ message: "Slug not found " + slug }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const post = await getEntry('blog', slug);

    if (!post) {
        return new Response(JSON.stringify({ message: "Post not found " + slug }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const POST: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(JSON.stringify({ ...body, method: "POST" }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const PUT: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(JSON.stringify({ ...body, method: "PUT" }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const PATCH: APIRoute = async ({ params, request }) => {

    const body = await request.json();

    return new Response(JSON.stringify({ ...body, method: "PATCH" }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const DELETE: APIRoute = async ({ params, request }) => {

    const slug = params.slug;

    return new Response(JSON.stringify({ slug: slug, method: "DELETE" }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};