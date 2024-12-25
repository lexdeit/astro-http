import { getGreeting } from './greetings/get-greeting.action';
import { getPostLikes } from './posts/get-posts-likes.action';
import { updatePostLikes } from './posts/update-likes.action';

export const server = {
    getGreeting,

    // POSTS ACTIONS
    getPostLikes,
    updatePostLikes
};