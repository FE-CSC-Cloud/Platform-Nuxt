import { useServersStore } from '~/store/servers';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const servers = useServersStore();
    const session = useCookie("session");

    if(
        !session.value && 
        !to.path.startsWith('/knowledgebase') &&
        (!to.path.startsWith('/auth') || !to.name)
    ){
        return navigateTo('/auth/login');
    } else {
        if(!to.path.startsWith('/auth') && servers.servers && (servers.servers.length < 1 || to.path === '/')){
            await servers.fetchServers();
        }
    }
})