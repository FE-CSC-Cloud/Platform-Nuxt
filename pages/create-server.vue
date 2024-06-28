<template>
    <h1 class="header">Create server</h1>
    <div class="alert alert-danger mb-4" v-if="isError">
        <div class="alert-body">
            <Icon name="tabler:alert-triangle-filled" />
            <b>Warning</b>
            {{ isError }}
        </div>
    </div>

    <form @submit.prevent="CreateServer()" class="grid lg:grid-cols-3 gap-5">
        <TitleGreyBox class="lg:col-span-2">
            <CreateServerItem
                title="Server plan"
                description="Select the server plan you need, we apply fair-use principles"
                :target="(memory && disk)"
            >
                <label for="memory" class="label">Memory</label>
                <div class="slider">
                    <input name="memory" type="range" v-model="memory" min="1" max="2" />
                    <span class="indicator" :style="`left: ${memory * 100 - 100}%;`" />
                    <span :style="`width: ${memory * 100 - 100}%;`" />
                </div>
                <div class="flex items-start justify-between mb-5">
                    <span class="text-sm text-secondary-300">1GB</span>
                    <span class="text-sm text-secondary-300">2GB</span>
                </div>

                <label for="memory" class="label">Disk</label>
                <div class="slider">
                    <input name="memory" type="range" v-model="disk" min="0" max="10" />
                    <span class="indicator" :style="`left: ${disk * 10}%;`" />
                    <span :style="`width: ${disk * 10}%;`" />
                </div>
                <div class="flex items-start justify-between">
                    <span class="text-sm text-secondary-300">10GB</span>
                    <span class="text-sm text-secondary-300">20GB</span>
                </div>
            </CreateServerItem>
            <CreateServerItem
                title="Server OS"
                description="Server OS is the operating system you want installed you your server."
                :target="operationSystem"
            >
                <div class="grid lg:grid-cols-3 gap-2">
                    <label class="radio-input" v-for="template in templates">
                        <input type="radio" name="os" v-model="operationSystem" :value="template" class="peer">
                        <div class="peer-checked:border-primary-300">
                            <p>{{ template }}</p>
                        </div>
                    </label>
                </div>
            </CreateServerItem>
            <CreateServerItem
                title="Domain"
                description="Every server gets it's own subdomain."
                :target="subdomain"
            >
                <div class="flex items-center gap-x-4">
                    <InputWrapper
                        class="flex-1"
                        id="subdomain"
                        label="Subdomain"
                        :value="subdomain"
                        :regex="/^[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*$/"
                        error="Domain contain can only letters, dashes and numbers (a-z, 0-9,    -)."
                    >
                        <input
                            type="text"
                            id="subdomain"
                            placeholder="Subdomain"
                            v-model="subdomain"
                        />
                    </InputWrapper>
                    <p class="mt-6">.projects.open-ict.hu</p>
                </div>
            </CreateServerItem>
            <CreateServerItem
                title="Name & description"
                :target="name"
                disable-pipeline
            >
                    <InputWrapper
                        id="name"
                        label="Server name*"
                    >
                        <input
                            type="text"
                            id="name"
                            placeholder="Server name*"
                            v-model="name"
                        />
                    </InputWrapper>
                    <InputWrapper
                        class="mt-3"
                        id="description"
                        label="Server description"
                    >
                        <textarea
                            id="description"
                            placeholder="Server description"
                            v-model="description"
                        />
                    </InputWrapper>
            </CreateServerItem>
        </TitleGreyBox>
        <div>
            <TitleGreyBox class="sticky top-10 flex flex-col gap-4">
                <h2 class="text-xl font-medium text-secondary-100">Server details</h2>
                <div class="flex gap-x-3">
                    <span class="prop" :class="(memory && disk) && 'active'">
                        <Icon name="tabler:circle-check-filled" />
                    </span>
                    <div>
                        <span class="text-sm text-secondary-300">Server plan</span>
                        <p>Memory: {{ memory }}GB</p>
                        <p>storage: {{ Number(disk) + 10 }}GB</p>
                    </div>
                </div>
                <div class="flex gap-x-3">
                    <span class="prop" :class="operationSystem && 'active'">
                        <Icon name="tabler:circle-check-filled" />
                    </span>
                    <div>
                        <span class="text-sm text-secondary-300">Server OS</span>
                        <p>{{ operationSystem || 'Undefined' }}</p>
                    </div>
                </div>
                <div class="flex gap-x-3">
                    <span class="prop" :class="subdomain && 'active'">
                        <Icon name="tabler:circle-check-filled" />
                    </span>
                    <div>
                        <span class="text-sm text-secondary-300">Subdomain</span>
                        <p class="flex items-center">
                            {{ subdomain || 'Undefined' }}
                            <span v-if="subdomain" class="text-sm text-secondary-300">
                                .projects.open-ict.hu
                            </span>
                        </p>
                    </div>
                </div>
                <div class="flex gap-x-3">
                    <span class="prop" :class="name && 'active'">
                        <Icon name="tabler:circle-check-filled" />
                    </span>
                    <div>
                        <span class="text-sm text-secondary-300">Server name</span>
                        <p>{{ name || 'Undefined' }}</p>
                        <p class="text-sm">{{ description }}</p>
                    </div>
                </div>
                <div class="mt-2">
                    <NuxtLink href="#" target="_blank" class="block mb-2 text-sm text-secondary-300 hover:underline">
                        Our terms and conditions apply.
                    </NuxtLink>
                    <button 
                        class="button button-primary w-full text-center" 
                        :disabled="!subdomain || !operationSystem || !name || !disk || !memory"
                    >
                        <div class="absolute" v-if="isLoading">
                            <Icon name="svg-spinners:180-ring-with-bg" />
                        </div>
                        Create server
                    </button>
                </div>
            </TitleGreyBox>
        </div>
    </form>
</template>

<script setup>
    import dayjs from 'dayjs';
    import { useServersStore } from '~/store/servers';

    definePageMeta({
        layout: 'dashboard'
    })
    useSeoMeta({
        title: 'Create server' + ' - ' + useRuntimeConfig().public.appName,
    });

    const servers = useServersStore();
    const addToast = useToast();
    const session = useCookie("session");
    const templates = ref([]);
    const isLoading = ref(false);
    const isError = ref(undefined);

    const memory = ref('1');
    const disk = ref('5');
    const operationSystem = ref(undefined);
    const subdomain = ref(undefined);
    const name = ref(undefined);
    const description = ref(undefined);

    if(servers.servers.length > 1){
        isError.value = 'You\'ve reached the server limit of 2 servers';
    }

    try {
        const response = await $fetch('/templates', {
            method: 'GET',
            baseURL: useRuntimeConfig().public.baseUrlApi,
            headers: {
                'Authorization': `Bearer ${session.value}`
            }
        });

        templates.value = response;
    } catch (error) {
        handleError(error);
        console.error(error);
    }

    async function CreateServer(){
        isLoading.value = true;

        const now = dayjs();
        const futureDate = now.add(3, 'month');
        const expireDate = futureDate.format('YYYY-MM-DD');

            try{
                await $fetch('/servers', {
                    method: 'POST',
                    baseURL: useRuntimeConfig().public.baseUrlApi,
                    headers: {
                        'Authorization': `Bearer ${session.value}`
                    },
                    body: {
                        name: name.value,
                        description: description.value,
                        operating_system: operationSystem.value,
                        end_date: expireDate,
                        memory: Number(memory.value),
                        storage: (Number(disk.value) + 10)
                    }
                });

                addToast({ title: `Server succesfully created` });
                navigateTo('/');
            } catch (error) {
                handleError(error);
                isError.value = error.response._data;
                console.error(error);
            } finally {
                isLoading.value = false;
            }
    }
</script>

<style>
    .prop {
        @apply mt-1.5 flex items-center justify-center w-4 h-4 rounded-full text-2xl bg-secondary-600 border-2 border-secondary-500 text-primary-300;
    }
    .prop > svg {
        @apply absolute w-5 h-5 opacity-0 duration-300;
    }
    .prop.active > svg {
        @apply opacity-100;
    }
    .radio-input{
        @apply relative;
    }
    .radio-input > input{
        @apply hidden;
    }
    .radio-input > div{
        @apply px-4 py-3 bg-secondary-600 rounded-lg w-full border-2 border-transparent flex gap-x-2 flex-col;
    }
    .radio-input > div > span{
        @apply text-xs text-secondary-300;
    }

    .slider{
        @apply relative w-full bg-secondary-600 h-2 my-2 z-10 rounded-full;
    }
    .slider > input{
        @apply absolute w-full opacity-0 h-4 -top-1;
    }
    .slider > .indicator{
        @apply absolute -top-1 -translate-x-1.5 h-4 w-4 bg-white rounded-full pointer-events-none cursor-pointer;
    }
    .slider > span ~ span{
        @apply absolute h-2 bg-secondary-400 top-0 left-0 rounded-l-full z-[-1];
    }
</style>