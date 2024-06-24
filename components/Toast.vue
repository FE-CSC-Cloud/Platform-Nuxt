<template>
    <div class="toast">
        <p>{{ props.title }}</p> 
    </div>
</template>
  
<script setup>
    import { useToastStore } from '~/store/toasts';

    const props = defineProps({
        id: String,
        title: String
    });

    const toastStore = useToastStore();

    setTimeout(() => {
        toastStore.removeToast(props.id);
    }, 5000);
</script>

<style>
    .toast{
        @apply relative bg-secondary-600 mt-2 w-[350px] px-4 py-3 rounded-lg overflow-hidden;
    }
    .toast::after{
        @apply absolute content-[''] w-full h-1 bg-primary-300 bottom-0 left-0; 
        animation: toast 5s linear;
    }
    @keyframes toast {
        0%{
            left: 0;
        }
        100%{
            left: -100%;
        }
    }
</style>