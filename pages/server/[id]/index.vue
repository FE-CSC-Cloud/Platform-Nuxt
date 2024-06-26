<template>
    {{ server.ID }}
    {{ server.IP }}
    {{ server.endDate }}
    {{ server.VcenterId }}
    {{ server.memory }}GB
    {{ server.storage }}GB
</template>

<script setup>
    import { useServerStore } from '~/store/server';
    
    definePageMeta({
        layout: 'server'
    });

    const server = useServerStore();
</script>