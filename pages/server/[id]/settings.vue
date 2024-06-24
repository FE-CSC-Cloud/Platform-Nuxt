<template>
    Hey
</template>

<script setup>
    definePageMeta({
        layout: 'server'
    });
    
    import { useServerStore } from '~/store/server';
    
    const server = useServerStore();
</script>