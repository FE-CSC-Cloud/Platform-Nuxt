export default defineNuxtRouteMiddleware(async (to, from) => {
    const session = useCookie("session");

    if(
        !session.value && 
        !to.path.startsWith('/knowledgebase') &&
        (!to.path.startsWith('/auth') || !to.name)
    ){
        return navigateTo('/auth/login');
    }
})