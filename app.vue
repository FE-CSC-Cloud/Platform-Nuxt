<template>
    <NuxtLayout>
        <NuxtPage />
        
        <div class="fixed bottom-10 right-10 z-50">
            <Toast v-for="toast in toasts" :id="toast.id" :title="toast.title" />
        </div>
    </NuxtLayout>
</template>

<script setup>
    import { useToastStore } from '~/store/toasts';

    useSeoMeta({
        title: useRuntimeConfig().public.appName,
        description: 'Easily manage and create VM\'s with OICT!'
    })

    const toastStore = useToastStore();
    const { toasts } = storeToRefs(toastStore);
</script>