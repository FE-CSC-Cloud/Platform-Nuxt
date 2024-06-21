<template>
    {{ server.endDate }}
    {{ server.IP }}
</template>

<script setup>
    import { useServerStore } from '~/store/server';
    
    definePageMeta({
        layout: 'server'
    });

    const server = useServerStore();
</script>