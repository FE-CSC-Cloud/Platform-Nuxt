export default defineNuxtRouteMiddleware((to, from) => {
    const allowedUnauthorizedRouteNames = [
        'login',
        'login-credentials',
        'index'
    ]

    const access_token = useCookie('access_token')
    if (to.name == 'index') {
        useRouter().push({
            path: '/login',
        })
    }

    if (allowedUnauthorizedRouteNames.includes(to.name)) {
        // Redirect from unauthorized routes if logged in
        if (access_token.value != undefined) {
            useRouter().push({
                path: '/dashboard',
            })
        }
    } else {
        // Redirect from authorized routes if not logged in or page does not exist
        if (access_token.value == undefined || to.name == undefined) {
            useRouter().push({
                path: '/login',
            })
        }
    }
})