<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="pending">Loading...</p>
        <p v-else-if="error">Error: {{error}}</p>
        <p v-else-if="data">Servers: {{data}}</p>

        <button class="bg-sky-500 p-3 rounded" @click="popUpOpen = true; getTemplates();">Maak server</button>

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
                    <button class="bg-sky-300">Maak server</button>
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