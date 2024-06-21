<template>
    <NuxtLayout>
        <NuxtPage />
        <Toast />
    </NuxtLayout>
</template>

<script setup>
    useSeoMeta({
        title: useRuntimeConfig().public.appName,
        description: 'Easily manage and create VM\'s with OICT!'
    })
</script>