import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { Posts, eq, db } from "astro:db";


export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    try {

        const Id = params.id || "";

        if (!Id || Id === "") {
            return new Response(JSON.stringify({ message: "Id is required" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        let post = await db.select().from(Posts).where(eq(Posts.id, Id));


        if (post.length === 0) {
            const postById = await getEntry("blog", Id);

            if (!postById) {
                return new Response(JSON.stringify({ message: "Post not found" }), {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            await db.insert(Posts).values([
                {
                    id: postById.id,
                    title: postById.data.title,
                    likes: 0,
                },
            ]);
            post.shift();
            post.push({
                id: postById.id,
                title: postById.data.title,
                likes: 0,
            });
        }


        return new Response(JSON.stringify({ data: post }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};


export const PUT: APIRoute = async ({ params, request }) => {

    try {

        const Id = params.id || "";

        if (!Id || Id === "") {
            return new Response(JSON.stringify({ message: "Id is required" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const body = await request.json();
        const likes = body.likes || 0;

        const posts = await db.select().from(Posts).where(eq(Posts.id, Id));

        if (posts.length === 0) {
            return new Response(JSON.stringify({ message: "Post not found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const res = await db.update(Posts).set({
            likes: posts[0].likes + likes,
        }).where(eq(Posts.id, Id));

        if (res.rowsAffected === 0) {
            return new Response(JSON.stringify({ message: "Post not found" }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify({ message: "Likes updated" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

};