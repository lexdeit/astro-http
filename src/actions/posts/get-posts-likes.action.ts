import { defineAction } from "astro:actions";
import { getEntry } from "astro:content";
import { db, eq, Posts } from "astro:db";
import { z } from 'astro:schema';

export const getPostLikes = defineAction({
    input: z.string().nonempty(),
    handler: async postId => {

        const post = await db.select().from(Posts).where(eq(Posts.id, postId));

        if (post.length === 0) {
            const Id = postId;
            const postByCollection = await getEntry("blog", Id);

            if (!postByCollection) {
                throw new Error("Post not found");
            }

            await db.insert(Posts).values([
                {
                    id: postByCollection.id,
                    title: postByCollection.data.title,
                    likes: 0,
                },
            ]);

            return {
                id: postByCollection.id,
                title: postByCollection.data.title,
                likes: 0,
            };
        }

        return post.at(0)!;
    }
});