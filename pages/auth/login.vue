<template>
    <div class="grid lg:grid-cols-2 gap-5 items-center min-h-screen">
        <div class="w-full max-w-md mx-auto">

            <div class="flex text-2xl font-semibold text-secondary-50 items-center gap-x-2">
                <img src="/logo.png" width="25px" height="25px" alt="Logo" />
                {{ useRuntimeConfig().public.appName }}
            </div>

            <h1 class="text-lg font-medium my-3 text-secondary-100">Inloggen</h1>

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
                <inputValidation
                    :value="password"
                    message="Your password needs to be atleast 8 characters long"
                    format="^(?=.*\\d).{8,}$"
                >
                    <input
                        class="mb-0"
                        placeholder="Wachtwoord"
                        type="password"
                        id="password"
                        v-model="password"
                    >
                </inputValidation>


                <button class="btn btn-primary w-full mt-3">Login</button>
            </form>
            <copyright />
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
    const password= ref();

    async function login() {
        
        const { data: loginRes, error } = await $fetch('/auth/login', {
            method: 'POST',
            baseURL: useRuntimeConfig().public.laravelApiBase,
            query: {
                email: this.email,
                password: this.password
            }
        }).catch((err) => {
            console.log('error', err.status)
        })

        if (loginRes.token) {
            document.cookie = `token=${loginRes.token}`
            navigateTo({
                path: '/dashboard',
            })
        } else {
            console.log('Invalid username or password');
        }
    }

</script>