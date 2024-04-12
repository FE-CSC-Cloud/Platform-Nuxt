<template>
    <div class="bg-secondary-700 py-3 px-4 flex items-center justify-between">
        <div class="flex items-center gap-x-6">
            <NuxtLink href="/" class="flex text-2xl ml-2 font-semibold text-secondary-50 items-center gap-x-2">
                <img src="/logo.png" width="25px" height="25px" alt="Logo" />
                {{ useRuntimeConfig().public.appName }}
            </NuxtLink>
            <NuxtLink href="/" class="group py-2 px-2 flex items-center gap-x-1 hover:text-secondary-100 duration-300">
                <Icon name="heroicons-solid:view-grid" class="group-hover:text-white duration-300" />
                Overview
            </NuxtLink>
            <NuxtLink href="/" class="group py-2 px-2 flex items-center gap-x-1 hover:text-secondary-100 duration-300">
                <Icon name="heroicons-solid:users" class="group-hover:text-white duration-300" />
                Teams
            </NuxtLink>
            <NuxtLink href="/" class="group py-2 px-2 flex items-center gap-x-1 hover:text-secondary-100 duration-300">
                <Icon name="heroicons-solid:document-text" class="group-hover:text-white duration-300" />
                Requests
            </NuxtLink>
        </div>
        <div class="flex items-center gap-x-1">
            <NuxtLink href="/" class="px-3 py-2 text-xl hover:bg-secondary-600 rounded-md duration-300">
                <Icon name="heroicons-solid:book-open" />
            </NuxtLink>
            <NuxtLink href="/" class="px-3 py-2 text-xl hover:bg-secondary-600 rounded-md duration-300">
                <Icon name="heroicons-solid:bell" />
            </NuxtLink>
            <NuxtLink href="/" class="px-3 py-2 text-xl hover:bg-secondary-600 rounded-md duration-300">
                <Icon name="heroicons-solid:user-circle" />
            </NuxtLink>
            <NuxtLink href="/" class="button button-primary flex items-center gap-x-1 ml-2">
                <Icon name="heroicons-solid:plus" />
                Create server
            </NuxtLink>
        </div>
    </div>

    <div class="wrapper">
        <h1>Dashboard</h1>
        <p v-if="pending">Loading...</p>
        <p v-else-if="error">Error: {{error}}</p>
        <p v-else-if="data">Servers: {{data}}</p>

        <button class="button button-primary p-3 rounded" @click="popUpOpen = true; getTemplates();">Maak server</button>

        <div v-if="popUpOpen" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
             @click="checkIfShouldClose($event)" ref="popUpBackground">
            <div class="bg-white p-4">
                <h2>Maak server</h2>
                <form class="flex flex-col gap-2"
                    @submit.prevent="makeServerRequest()">
                    <input type="text" placeholder="Server naam" v-model="naam" class="border" required>
                    <input type="text" placeholder="Server beschrijving" v-model="beschrijving" class="border" required>
                    <input type="date" class="border" v-model="end_date" required>
                    <select class="border" v-model="selectedTemplate" required>
                        <option v-for="(template, index) in templates" :value="index">
                            {{index}}
                        </option>
                    </select>
                    <button class="button button-primary">Maak server</button>
                </form>
            </div>
        </div>

        <div v-if="requestSent" class="flex flex-col max-w-[200px]">
            JE SERVER WORDT AANGEMAAKT
            <button @click="requestSent = !requestSent" class="bg-red-500">Sluit</button>
        </div>
    </div>
</template>

<script setup>
const {data, pending, error, refresh} = await useFetch('/servers', {
    method: 'GET',
    baseURL: useRuntimeConfig().public.laravelApiBase,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`
    }
})

const {data: templates} = await useLazyFetch('/templates', {
    method: 'GET',
    baseURL: useRuntimeConfig().public.laravelApiBase,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`
    }
})


let popUpOpen = false
let requestSent = false

let naam = ''
let beschrijving = ''
let end_date = ''
let selectedTemplate = null

function checkIfShouldClose(event){
    if (event.target === this.$refs.popUpBackground) {
        this.popUpOpen = false
    }
}

async function makeServerRequest() {
    this.popUpOpen = false
    this.requestSent = true
    await useFetch('/servers', {
        method: 'POST',
        baseURL: useRuntimeConfig().public.laravelApiBase,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useCookie('token').value}`
        },
        body: JSON.stringify({
            name: this.naam,
            description: this.beschrijving,
            end_date: this.end_date,
            operating_system: this.selectedTemplate
        })
    })
}

</script>