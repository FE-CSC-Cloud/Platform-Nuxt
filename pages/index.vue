<template>
    <NuxtLink 
        v-for="server in servers.servers"
        :href="`/server/${server.ID}`"
        class="bg-secondary-700 mb-1 flex justify-between"
    >
        <span>
            {{ server.Name }}
            {{ server.PowerStatus }}
        </span>
        <span>
            {{ server.IP }}
            {{ server.EndDate }}
            {{ server.OperatingSystem }}
        </span>
    </NuxtLink>
</template>

<script setup>
    import { useServersStore } from '~/store/servers';

    definePageMeta({
        layout: 'dashboard'
    })
    useSeoMeta({
        title: 'Overview' + ' - ' + useRuntimeConfig().public.appName,
    });

    const servers = useServersStore();
</script>