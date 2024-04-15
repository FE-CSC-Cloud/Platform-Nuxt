<template>
    <div class="bg-secondary-700 py-3 px-4 flex items-center justify-between">
        <div class="flex items-center gap-x-6">
            <NuxtLink href="/" class="flex text-2xl ml-2 font-semibold text-secondary-50 items-center gap-x-2">
                <img src="/logo.png" width="25px" height="25px" alt="Logo" />
                {{ useRuntimeConfig().public.appName }}
            </NuxtLink>
            <NuxtLink :class="isActive('/dashboard') && 'text-secondary-100'" href="/dashboard" class="group py-2 px-2 flex items-center gap-x-1 hover:text-secondary-100 duration-300">
                <Icon name="heroicons-solid:view-grid" class="group-hover:text-white duration-300" :class="isActive('/dashboard') && '!text-primary'" />
                Overview
            </NuxtLink>
            <NuxtLink :class="isActive('/dashboard/teams') && 'text-secondary-100'" href="/dashboard/teams" class="group py-2 px-2 flex items-center gap-x-1 hover:text-secondary-100 duration-300">
                <Icon name="heroicons-solid:users" class="group-hover:text-white duration-300" :class="isActive('/dashboard/teams') && '!text-primary'" />
                Teams
            </NuxtLink>
            <NuxtLink :class="isActive('/dashboard/request') && 'text-secondary-100'" href="/dashboard/request" class="group py-2 px-2 flex items-center gap-x-1 hover:text-secondary-100 duration-300">
                <Icon name="heroicons-solid:document-text" class="group-hover:text-white duration-300" :class="isActive('/dashboard/request') && '!text-primary'" />
                Requests
            </NuxtLink>
        </div>
        <div class="flex items-center gap-x-1">
            <NuxtLink href="/" class="px-3 py-2 text-xl hover:bg-secondary-600 rounded-md duration-300">
                <Icon name="heroicons-solid:book-open" />
            </NuxtLink>
            <NuxtLink href="/" class="px-3 py-2 text-xl hover:bg-secondary-600 rounded-md duration-300">
                <Icon name="heroicons-solid:bell" />
            </NuxtLink>
            <NuxtLink href="/" class="px-3 py-2 text-xl hover:bg-secondary-600 rounded-md duration-300">
                <Icon name="heroicons-solid:user-circle" />
            </NuxtLink>
            <NuxtLink href="/" class="button button-primary flex items-center gap-x-1 ml-2">
                <Icon name="heroicons-solid:plus" />
                Create server
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const route = useRoute();

    const isActive = (path) => {
        return path === route.path;
    }
</script>