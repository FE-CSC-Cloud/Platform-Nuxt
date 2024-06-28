<template>
    <div class="bg-secondary-700">
        <div class="wrapper flex lg:flex-row flex-col lg:items-center justify-between">
            <div class="flex lg:flex-row flex-col lg:items-center gap-x-10">
                <NuxtLink href="/" class="py-2 flex items-center gap-x-1 text-xl font-medium text-secondary-50">
                    <img src="/logo.png" width="25px" height="25px" alt="Logo" />
                    {{ appName }}
                </NuxtLink>
                <NuxtLink to="/" class="navlink">
                    <Icon name="heroicons:squares-plus-16-solid" />
                    Overview
                </NuxtLink>
                <NuxtLink to="/requests" class="navlink">
                    <Icon name="heroicons:document-text-16-solid" />
                    Requests
                </NuxtLink>
                <ServerSelector />
            </div>
            <div class="flex lg:flex-none flex-wrap items-center gap-x-4">
                <Tooltip position="bottom" tooltip="Knowledgebase">
                <NuxtLink to="/knowledgebase" class="navicon">
                    <Icon name="heroicons:book-open-16-solid" />
                </NuxtLink>
                </Tooltip>
                <Notifications />
                <Tooltip position="bottom" tooltip="Account">
                    <NuxtLink to="/account" class="navicon">
                        <Icon name="heroicons:user-circle-16-solid" />
                    </NuxtLink>
                </Tooltip>
                <NuxtLink v-if="servers.servers.length < 2" to="/create-server" class="button button-primary flex items-center gap-x-1 lg:w-auto w-full justify-center">
                    <Icon name="heroicons:plus-circle-16-solid" />
                    Create server
                </NuxtLink>
                <Tooltip v-if="servers.servers.length > 1" position="bottom left" tooltip="You've reached your the server limit">
                    <NuxtLink class="button button-primary flex items-center gap-x-1 lg:w-auto w-full justify-center" disabled>
                        <Icon name="heroicons:plus-circle-16-solid" />
                        Create server
                    </NuxtLink>
                </Tooltip>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { useServersStore } from '~/store/servers';

    const servers = useServersStore();
    const appName = useRuntimeConfig().public.appName;
</script>
  
<style scoped>
    .navlink {
        @apply flex items-center gap-x-1 border-b-2 border-transparent py-4 duration-300;
    }
    .navlink:hover {
        @apply text-secondary-100;
    }
    .navlink.router-link-active,
    .navlink:focus,
    .navlink:active {
        @apply border-primary-300 text-secondary-100;
    }
    .navicon{
        @apply text-xl py-2 px-3 rounded-md lg:flex-none flex-1 text-center duration-300;
    }
    .navicon:hover{
        @apply text-secondary-100;
    }
    .navicon.router-link-active,
    .navicon:focus,
    .navicon:active{
        @apply text-secondary-100 bg-secondary-600;
    }
</style>