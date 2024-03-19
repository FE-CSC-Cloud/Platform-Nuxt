<template>
    <div>
        <h1>Login</h1>
        <form class="flex gap-1 flex-col max-w-[200px]" @submit.prevent="login()">
            <input type="text" placeholder="Username" v-model="username" class="border">
            <input type="password" placeholder="Password" v-model="password" class="border">
            <button class="bg-sky-300">Login</button>
        </form>
    </div>
</template>

<script setup>
    const username= ''
    const password= ''

    async function login() {
        const loginRes = await $fetch('/auth/login', {
            method: 'POST',
            baseURL: useRuntimeConfig().public.laravelApiBase,
            headers: {
                'Content-Type': 'application/json'
            },
            query: {
                email: this.username,
                password: this.password
            }
        })

        // If the login was successful, save the token to a cookie
        if (loginRes.token) {
            document.cookie = `token=${loginRes.token}`
            navigateTo({
                path: '/dashboard',
            })
        }
        else {
            alert('Invalid username or password')
        }
    }
</script>