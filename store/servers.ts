import { handleError } from "vue";

export const useServersStore = defineStore('serversStore', () => {
    const servers = ref([]);

    const fetchServers = async () => {
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
            // handleError(error);
            console.error(error);
        }
    };

    return { servers, fetchServers }; 
});