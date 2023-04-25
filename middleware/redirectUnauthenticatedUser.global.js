export default defineNuxtRouteMiddleware((to, from) => {
    const allowedUnauthorizedRouteNames = [
        'login',
        'login-credentials'
    ]

    if (!allowedUnauthorizedRouteNames.includes(to.name)) {
        const access_token = useCookie('access_token')
        if (access_token.value == undefined) {
            useRouter().push({
                path: '/login',
            })
        }
    }
})