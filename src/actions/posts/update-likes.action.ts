import { defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from 'astro:schema';

export const updatePostLikes = defineAction({
    input: z.object({
        postId: z.string(),
        likes: z.number()
    }),
    handler: async ({ postId, likes }) => {

        const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));

        if (!post) {
            throw new Error("Post not found");
        }

        const res = await db.update(Posts).set({ likes: post.likes + likes }).where(eq(Posts.id, postId));

        if (res.rowsAffected === 0) {
            throw new Error("Post not found");
        }

        return {
            postId: postId,
            likes: post.likes + likes
        };
    }
});