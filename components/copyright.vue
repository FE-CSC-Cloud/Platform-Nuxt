<template>
    <div class="text-center text-sm text-gray-500 font-light mt-4">
        Gemaakt door
        <button @click="toggleModal()" class="font-medium hover:text-gray-200 hover:bg-white/30 px-1 rounded-sm z-10 duration-300">
            Team Bolderkar
        </button>
    </div>

    <div v-if="isOpen" class="fixed w-full h-screen top-0 left-0 flex items-center justify-center">
        <div class="absolute w-full h-full bg-black/20 backdrop-blur-sm duration-300 cursor-pointer" @click="toggleModal()"/>
        <div class="bg-secondary-600 border-2 border-secondary-500 z-10 px-10 py-8 rounded-lg max-w-2xl max-h-[550px] overflow-y-auto w-full">

            <h2 class="text-xl font-medium mb-2 text-secondary-50">Wij zijn team Bolderkar</h2>
            <p>Wij zijn het geweldige team dat samen met de CSC Gilde dit mooie platform hebben ontwikkelt, 
                <span class="text-lg text-transparent hover:text-secondary-100 duration-200 cursor-none">
                    Jens was wel altijd te laat!
                </span>
            </p>

            <div class="grid lg:grid-cols-2 mt-4 gap-4">
                <NuxtLink to="https://www.linkedin.com/in/chiel-suttorp/" target="_blank" class="group bg-secondary-500 border-2 border-transparent hover:border-secondary-400/20 py-4 px-5 rounded-lg flex justify-between gap-x-3 duration-300">
                    <div>
                        <p class="text-lg font-medium">Chiel Suttorp</p>
                        <span class="block text-base text-secondary-200">Mijn Linkedin</span>
                    </div>
                    <div class="group-hover:bg-secondary-400/50 aspect-square rounded-md text-3xl flex items-center justify-center duration-300">
                        <Icon name="heroicons:arrow-up-right-solid" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.linkedin.com/in/pepijn-weijers/" target="_blank" class="group bg-secondary-500 border-2 border-transparent hover:border-secondary-400/20 py-4 px-5 rounded-lg flex justify-between gap-x-3 duration-300">
                    <div>
                        <p class="text-lg font-medium">Pepijn Weijers</p>
                        <span class="block text-base text-secondary-200">Mijn Linkedin</span>
                    </div>
                    <div class="group-hover:bg-secondary-400/50 aspect-square rounded-md text-3xl flex items-center justify-center duration-300">
                        <Icon name="heroicons:arrow-up-right-solid" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.linkedin.com/in/bavo/" target="_blank" class="group bg-secondary-500 border-2 border-transparent hover:border-secondary-400/20 py-4 px-5 rounded-lg flex justify-between gap-x-3 duration-300">
                    <div>
                        <p class="text-lg font-medium">Bavo Knol</p>
                        <span class="block text-base text-secondary-200">Mijn Linkedin</span>
                    </div>
                    <div class="group-hover:bg-secondary-400/50 aspect-square rounded-md text-3xl flex items-center justify-center duration-300">
                        <Icon name="heroicons:arrow-up-right-solid" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.linkedin.com/in/lilyleewis/" target="_blank" class="group bg-secondary-500 border-2 border-transparent hover:border-secondary-400/20 py-4 px-5 rounded-lg flex justify-between gap-x-3 duration-300">
                    <div>
                        <p class="text-lg font-medium">Lily Leewis</p>
                        <span class="block text-base text-secondary-200">Mijn Linkedin</span>
                    </div>
                    <div class="group-hover:bg-secondary-400/50 aspect-square rounded-md text-3xl flex items-center justify-center duration-300">
                        <Icon name="heroicons:arrow-up-right-solid" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.linkedin.com/in/jens-duijm-2a1662262/" target="_blank" class="group bg-secondary-500 border-2 border-transparent hover:border-secondary-400/20 py-4 px-5 rounded-lg flex justify-between gap-x-3 duration-300">
                    <div>
                        <p class="text-lg font-medium">Jens Duijm</p>
                        <span class="block text-base text-secondary-200">Mijn Linkedin</span>
                    </div>
                    <div class="group-hover:bg-secondary-400/50 aspect-square rounded-md text-3xl flex items-center justify-center duration-300">
                        <Icon name="heroicons:arrow-up-right-solid" />
                    </div>
                </NuxtLink>
                <NuxtLink to="https://www.linkedin.com/in/thomas-boots-447077252/" target="_blank" class="group bg-secondary-500 border-2 border-transparent hover:border-secondary-400/20 py-4 px-5 rounded-lg flex justify-between gap-x-3 duration-300">
                    <div>
                        <p class="text-lg font-medium">Thomas Boots</p>
                        <span class="block text-base text-secondary-200">Mijn Linkedin</span>
                    </div>
                    <div class="group-hover:bg-secondary-400/50 aspect-square rounded-md text-3xl flex items-center justify-center duration-300">
                        <Icon name="heroicons:arrow-up-right-solid" />
                    </div>
                </NuxtLink>
            </div>

            <span class="text-center mt-4 block text-secondary-300">
                Interface made by
                <NuxtLink to="https://weijers.one">
                    Weijers.one
                </NuxtLink>
            </span>
        </div>
    </div>
</template>

<script setup>
    let isOpen = ref(false);

    function toggleModal(){
        isOpen.value = !isOpen.value;
    }
</script>