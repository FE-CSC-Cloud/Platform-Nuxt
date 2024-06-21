<template>
    <InputWrapper>
        <select v-model="selectedServer" @change="selectServer" class="min-w-56">
            <option value="" class="hidden">Select a server</option>
            <option v-for="server in servers" :key="server.ID" :value="server.ID">
                {{ server.Name }}
            </option>
        </select>
    </InputWrapper>
</template>

<script setup>
    const route = useRoute();

    const selectedServer = ref(route.path.split('/')[2] || '');

    watch(
        () => route.path,
        (newPath) => {
            selectedServer.value = newPath.split('/')[2] || '';
        }
    );

    const selectServer = (event) => {
        navigateTo(`/server/${event.target.value}`);
    };

    const servers = ref([]);

    try {
        const session = useCookie("session");

        const serverRes = await $fetch('/servers', {
            method: 'GET',
            baseURL: useRuntimeConfig().public.baseUrlApi,
            headers: {
                'Authorization': `Bearer ${session.value}`
            }
        });
        
        servers.value = serverRes;
    } catch (error) {
        handleError(error);
        console.error(error);
    }
</script>