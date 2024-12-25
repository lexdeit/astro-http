<template>


    <button v-if="likeCount === 0" @click="likePost">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19px" height="19px" color="#fff" fill="none">
            <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        Like this post
    </button>


    <button v-else @click="likePost">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19px" height="19px" color="#fff" fill="none">
            <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        Like
        <span>{{ likeCount }}</span>
    </button>

</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';
import { actions } from 'astro:actions';



interface Props {
    postId: string;
}

const props = defineProps<Props>();

let likeCount = ref(0);
let likeClicks = ref(0);
let isLoading = ref(true);
const { postId } = props;


watch( likeCount, debounce( async () => {

    const { data, error } = await actions.updatePostLikes({
        postId,
        likes: likeClicks.value
    });

    if(error){
        console.error(error.message);
    }

    likeClicks.value = 0;

}, 500));

const getCurrentLikes = async () => {
    try {

        const { data, error } = await actions.getPostLikes(postId);

        if(error){
            throw new Error(error);
        }

        likeCount.value = data.likes;
        isLoading = false;

    } catch(error: any) {
        console.error(error.message);
    }
};

getCurrentLikes()

const likePost = async () => {

    likeCount.value++;
    likeClicks.value++;

    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: Math.random(),
            y: Math.random() - 0.2
        }
    });

};


</script>

<style scoped>
button {
    background-color: #ff4081;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;
    display: flex;
    gap: 0.25em;
    justify: center;
    align-items: center;
}

button:hover {
    background-color: #e73370;
}

button:active {
    background-color: #c0275a;
}
</style>