export default defineNuxtRouteMiddleware(async (to, from) => {
    const session = useCookie("session");

    if(session.value){
        return navigateTo('/');
    }
})