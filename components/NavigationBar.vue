<template>
    <div class="bg-secondary-700">
        <div class="wrapper flex lg:flex-row flex-col lg:items-center justify-between">
            <div class="flex lg:flex-row flex-col lg:items-center gap-x-10">
                <NuxtLink href="/" class="py-2">
                    <div class="flex items-center gap-x-1 text-lg font-medium text-secondary-50">
                        <img src="/logo.png" width="25px" height="25px" alt="Logo" />
                        {{ appName }}
                    </div>
                </NuxtLink>
                <NuxtLink to="/" class="navlink">
                    <Icon name="heroicons:squares-plus-16-solid" />
                    Overview
                </NuxtLink>
                <NuxtLink to="/requests" class="navlink">
                    <Icon name="heroicons:document-text-16-solid" />
                    Requests
                </NuxtLink>
                <InputWrapper>
                    <select v-model="selectedServer" @change="selectServer" class="min-w-56">
                        <option value="" class="hidden">Select a server</option>
                        <option value="1">Server #1</option>
                        <option value="2">Server #2</option>
                    </select>
                </InputWrapper>
            </div>
            <div class="flex lg:flex-none flex-wrap items-center gap-x-4">
                <NuxtLink to="/knowledgebase" class="navicon">
                    <Icon name="heroicons:book-open-16-solid" />
                </NuxtLink>
                <div class="relative lg:flex-none flex-1" @mouseenter="notifactionsOpen=true" @mouseleave="notifactionsOpen=false">
                    <button class="navicon w-full has-notification" @click="notifactionsOpen=!notifactionsOpen">
                        <Icon name="heroicons:bell-16-solid" />
                    </button>
                    <div v-if="notifactionsOpen" class="notifications-modal">
                        <div class="notification">
                            <p>Server #2 has been deleted</p>
                            <div>
                                <span>Yesterday at 20:50</span>
                                <Tooltip position="right" tooltip="Mark read">
                                    <button class="unread" />
                                </Tooltip>
                            </div>
                        </div>
                        <div class="notification">
                            <p>Server #2 has been created</p>
                            <div>
                                <span>12 Jun at 12:50</span>
                                <Tooltip position="right" tooltip="Mark unread">
                                    <button class="read" />
                                </Tooltip>
                            </div>
                        </div>
                        <div class="actions">
                            <a href="/notifications">Show all</a>
                            <span class="!text-secondary-300 !no-underline">-</span>
                            <button>Mark as read</button>
                        </div>
                    </div>
                </div>
                <NuxtLink to="/account" class="navicon">
                    <Icon name="heroicons:user-circle-16-solid" />
                </NuxtLink>
                <NuxtLink to="/create-server" class="button button-primary flex items-center gap-x-1 lg:w-auto w-full justify-center">
                    <Icon name="heroicons:plus-circle-16-solid" />
                    Create server
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    const appName = useRuntimeConfig().public.appName;
    const notifactionsOpen = ref(false);
    
    const route = useRoute();
    const router = useRouter();
    
    const selectedServer = ref(route.path.split('/')[2] || '');
    
    watch(
        () => route.path,
        (newPath) => {
            selectedServer.value = newPath.split('/')[2] || '';
        }
    );
    
    const selectServer = (event) => {
        router.push(`/server/${event.target.value}`);
    };
</script>
  
<style>
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
    .has-notification{
        @apply relative;
    }
    .has-notification::after{
        @apply content-[''] w-2 h-2 absolute bg-danger-300 left-1/2 top-3 rounded-full;
    }
    .notifications-modal{
        @apply bg-secondary-600 absolute top-full -translate-x-1/2 lg:translate-x-0 right-auto left-1/2 w-[350px] max-w-[100vw] px-5 py-4 rounded-lg lg:-right-5 lg:left-auto;
    }
    .notifications-modal .actions{
        @apply flex items-center gap-x-2 border-t-2 border-secondary-500 pt-2;
    }
    .notifications-modal .actions > *{
        @apply text-sm text-primary-300 underline hover:text-primary-200 duration-300;
    }
    .notifications-modal .notification:not(:first-of-type){
        @apply py-2 border-t-2 border-secondary-500;
    }
    .notifications-modal .notification:first-of-type{
        @apply pb-2;
    }
    .notifications-modal .notification > div{
        @apply flex items-center justify-between text-sm text-secondary-300;
    }
    .notifications-modal .notification > div button{
        @apply w-2 h-2 rounded-full border border-primary-300;
    }
    .notifications-modal .notification > div button.unread{
        @apply bg-primary-300;
    }
</style>