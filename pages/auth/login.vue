<template>
    <div class="grid lg:grid-cols-2 gap-5 items-center min-h-screen">
        <div class="w-full max-w-md mx-auto">

            <div class="flex text-2xl font-semibold text-secondary-50 items-center gap-x-2">
                <img src="/logo.png" width="25px" height="25px" alt="Logo" />
                {{ useRuntimeConfig().public.appName }}
            </div>

            <h1 class="text-lg font-medium my-3">Inloggen</h1>

            <form @submit.prevent="login()">
                <label for="email">E-mailadres</label>
                <input
                    placeholder="E-mailadres"
                    type="email"
                    id="email"
                    v-model="email"
                    autofocus
                >

                <div class="flex justify-between">
                    <label for="password">Wachtwoord</label>
                    <NuxtLink to="/forgot-password" class="text-sm text-secondary-400 underline">
                        Wachtwoord vergeten?
                    </NuxtLink>
                </div>
                <input
                    placeholder="Wachtwoord"
                    type="password"
                    id="password"
                    v-model="password"
                >

                <button class="btn btn-primary w-full mt-3">Login</button>

            </form>
        </div>
        <div class="w-full h-full p-5">
            <div class="bg-[url(/LoginBanner.png)] w-full h-full rounded-xl" />
        </div>
    </div>
</template>

<script setup>

    useSeoMeta({
        title: 'Login | ' + useRuntimeConfig().public.appName,
        description: 'Beheer gemakkelijk je servers',
    })

    const email= ''
    const password= ''

    async function login() {

        if(!this.email){
            const error = 'Email is not entered';
            return;
        }
        
        const loginRes = await $fetch('/auth/login', {
            method: 'POST',
            baseURL: useRuntimeConfig().public.laravelApiBase,
            query: {
                email: this.email,
                password: this.password
            }
        })

        console.log(loginRes.status)

        if (loginRes.token) {
            document.cookie = `token=${loginRes.token}`
            navigateTo({
                path: '/dashboard',
            })
        }
        else {
            console.log('Invalid username or password')
        }
    }

    
</script>