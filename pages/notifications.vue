<template>
    <h1 class="header">Notifications</h1>
    <div v-for="notification in notifications" class="notification">
        <h2 class="text-lg font-medium">{{ notification.title }}</h2>
        <div class="flex items-center gap-x-2 justify-between">
            {{ notification.message }}
            <div class="actions">
                <Tooltip position="right" v-if="!notification.read" tooltip="Mark read">
                    <button class="read" @click="markAs(notification.id)" />
                </Tooltip>
                <Tooltip position="right" v-if="notification.read" tooltip="Mark unread">
                    <button class="unread" @click="markAs(notification.id)" />
                </Tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: 'dashboard'
    })

    const session = useCookie("session");
    const notifications = ref([]);

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
    }

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
        } catch (error) {
            handleError(error);
            console.error(error);
        }
    };

    onMounted(async () => {
        await fetchNotifications();
    });
</script>


<style scoped>
.notification{
    @apply bg-secondary-700 px-5 py-4 border-b border-secondary-500;
}
.notification:first-of-type{
    @apply rounded-t-xl
}
.notification:last-of-type{
    @apply border-b-0 rounded-b-xl;
}
.notification .actions {
    @apply flex items-end justify-between text-sm text-secondary-300;
}
.notification .actions button {
    @apply w-2.5 h-2.5 rounded-full border border-primary-300;
}
.notification .actions button.unread {
    @apply bg-primary-300;
}
</style>