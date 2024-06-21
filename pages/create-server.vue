<template>
    <h1 class="header">Create server</h1>
    <div class="grid lg:grid-cols-3 gap-5">
        <TitleGreyBox class="lg:col-span-2">
            <CreateServerItem
                title="Server OS"
                description="Server OS is the operating system you want installed you your server."
                :target="operationSystem"
            >
                <div class="grid lg:grid-cols-3 gap-x-4">
                    <label class="relative">
                        <input type="radio" name="os" v-model="operationSystem" value="Ubuntu" class="peer hidden">
                        <div class="px-4 py-3 bg-secondary-600 rounded-lg
                                border-2 border-transparent peer-checked:border-primary-300
                                flex gap-x-2">
                            <div>
                                <p>Ubuntu</p>
                                <span class="text-xs text-secondary-300">6.0</span>
                            </div>
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
                        class="flex-1"
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
            </CreateServerItem>
        </TitleGreyBox>
        <div>
            <TitleGreyBox class="sticky top-10 flex flex-col gap-4">
                <h2 class="text-xl font-medium text-secondary-100">Server details</h2>
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
                    </div>
                </div>
                <div class="mt-2">
                    <NuxtLink href="#" target="_blank" class="block mb-2 text-sm text-secondary-300 hover:underline">
                        Our terms and conditions apply.
                    </NuxtLink>
                    <button 
                        class="button button-primary w-full text-center" 
                        :disabled="!subdomain || !operationSystem || !name"
                    >
                        Create server
                    </button>
                </div>
            </TitleGreyBox>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: 'dashboard'
    })
    useSeoMeta({
        title: 'Create server' + ' - ' + useRuntimeConfig().public.appName,
    })

    const operationSystem = ref('Ubuntu');
    const subdomain = ref(undefined);
    const name = ref(undefined);
    const description = ref(undefined);
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
</style>