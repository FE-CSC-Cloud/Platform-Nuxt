import { useServerStore } from '~/store/server';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const server = useServerStore();
    const fromId = ref(from.path.split('/')[2] || '');
    const id = ref(to.path.split('/')[2] || '');

    if(to.path.includes('/server/')){
        await server.fetchServer(id.value);
    }
})