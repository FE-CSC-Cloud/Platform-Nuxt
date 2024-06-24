<template>
    <div class="relative lg:flex-none flex-1" @mouseenter="notificationsOpen=true" @mouseleave="notificationsOpen=false">
        <button class="navicon w-full" :class="hasUnreadNotifications && 'has-notification'" @click="notificationsOpen=!notificationsOpen">
            <Icon name="heroicons:bell-16-solid" /> 
        </button>
        <div v-if="notificationsOpen" class="notifications-modal">
            <div class="notification" v-for="notification in notifications.slice(0, 3)" :key="notification.id">
                <p>{{ notification.title }}</p>
                <div>
                    <span>{{ notification.message }}</span>
                    <Tooltip position="right" v-if="!notification.read" tooltip="Mark read">
                        <button class="read" @click="markAs(notification.id)" />
                    </Tooltip>
                    <Tooltip position="right" v-if="notification.read" tooltip="Mark unread">
                        <button class="unread" @click="markAs(notification.id)" />
                    </Tooltip>
                </div>
            </div>
            <div class="actions">
                <a href="/notifications">Show all</a>
            </div>
        </div>
    </div>
</template>

<script setup>
const session = useCookie("session");
const notificationsOpen = ref(false);
const notifications = ref([]);
const hasUnreadNotifications = ref(false);

function updateHasUnRead(){
    hasUnreadNotifications.value = notifications.value.some(notification => notification.read === false);
}

const fetchNotifications = async () => {
    try {
        const response = await $fetch('/notifications', {
            method: 'GET',
            baseURL: useRuntimeConfig().public.baseUrlApi,
            headers: {
                'Authorization': `Bearer ${session.value}`
            }
        });

        notifications.value = response.reverse();
    } catch (error) {
        handleError(error);
        console.error(error);
    }
};

const markAs = async (id) => {
    try {
        await $fetch('/notifications/' + id, {
            method: 'PATCH',
            baseURL: useRuntimeConfig().public.baseUrlApi,
            headers: {
                'Authorization': `Bearer ${session.value}`
            }
        });
        
        await fetchNotifications();
        updateHasUnRead();
    } catch (error) {
        handleError(error);
        console.error(error);
    }
};

onMounted(async () => {
    await fetchNotifications();
    updateHasUnRead();
});
</script>

<style>
.has-notification {
    @apply relative;
}
.has-notification::after {
    @apply content-[''] w-2 h-2 absolute bg-danger-300 left-1/2 top-3 rounded-full;
}
.notifications-modal {
    @apply bg-secondary-600 absolute z-10 top-full -translate-x-1/2 lg:translate-x-0 right-auto left-1/2 w-[350px] max-w-[100vw] px-5 py-4 rounded-lg lg:-right-5 lg:left-auto;
}
.notifications-modal .actions {
    @apply flex items-center gap-x-2 border-t-2 border-secondary-500 pt-2;
}
.notifications-modal .actions > * {
    @apply text-sm text-primary-300 underline hover:text-primary-200 duration-300;
}
.notifications-modal .notification:not(:first-of-type) {
    @apply py-2 border-t-2 border-secondary-500;
}
.notifications-modal .notification:first-of-type {
    @apply pb-2;
}
.notifications-modal .notification > div {
    @apply flex items-end justify-between text-sm text-secondary-300;
}
.notifications-modal .notification > div button {
    @apply w-2.5 h-2.5 rounded-full border border-primary-300;
}
.notifications-modal .notification > div button.unread {
    @apply bg-primary-300;
}
</style>