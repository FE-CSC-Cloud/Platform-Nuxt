<template>
    <h1 class="header">Overview</h1>
    <NuxtLink
        v-for="server in servers.servers"
        :href="`/server/${server.ID}`"
        class="mb-1 flex justify-between bg-secondary-700 border border-transparent rounded-lg px-5 py-4
        hover:border-secondary-500 duration-300"
    >
        <div>
            <div class="flex items-center gap-x-2">
                <h2 class="text-lg font-medium text-secondary-100">{{ server.Name }}</h2>

                <span :class="server.PowerStatus === 'POWERED_ON' ? 'bg-success-300/20' : 'bg-danger-300/20'">
                    {{ server.PowerStatus === 'POWERED_ON' ? 'Online' : 'Offline' }}
                </span>
            </div>
            <span class="block text-sm w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{{ server.Description }}</span>
        </div>
        <div class="w-48">
            <span class="text-secondary-300 font-medium text-sm">Public IP</span>
            <p>{{ server.IP }}</p>
        </div>
        <div class="w-48">
            <span class="text-secondary-300 font-medium text-sm">Expire date</span>
            <p>{{ dayjs(server.EndDate).format('D MMMM YYYY') }}</p>
        </div>
        <div class="w-48">
            <span class="text-secondary-300 font-medium text-sm">Operation System</span>
            <p>{{ server.OperatingSystem }}</p>
        </div>  
    </NuxtLink>
</template>

<script setup>
    import { useServersStore } from '~/store/servers';
    import dayjs from 'dayjs';

    definePageMeta({
        layout: 'dashboard'
    })
    useSeoMeta({
        title: 'Overview' + ' - ' + useRuntimeConfig().public.appName,
    });

    const servers = useServersStore();
</script>