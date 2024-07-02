<template>  
    <NavigationBar />
    <div v-if="!server.VcenterId" class="wrapper text-center py-10">
        <p class="text-2xl pb-2">
            <Icon name="svg-spinners:blocks-shuffle-2" />
            Creating server...
        </p>
        <span class="text-secondary-400">Server ID: {{ server.ID }}</span>
    </div>
    <div v-if="server.VcenterId" >
        <div class="bg-secondary-700 border-t-2 border-secondary-500">
            <div class="wrapper pt-5">
                <div class="flex items-start justify-between">
                    <div>
                        <div class="mb-1 flex items-center gap-x-2">
                            <h1 class="text-xl font-medium text-secondary-100">
                                {{ server.name }}
                            </h1>
                            <span 
                                class="badge badge-variant-secondary" 
                                :class="server.powerStatus === 'POWERED_ON' ? 'badge-success' : 'badge-danger'"
                            >
                                {{ server.powerStatus === 'POWERED_ON' ? 'Online' : 'Offline' }}
                            </span>
                        </div>
                        <p>{{ server.description }}</p>
                        <div class="flex items-center gap-x-8 mt-4">
                            <CopyText :text="server.IP">
                                <div class="flex items-center gap-x-1">
                                    <Icon name="heroicons:globe-alt-solid" />
                                    {{ server.IP }}
                                </div>
                            </CopyText>
                            <Tooltip position="bottom" :tooltip="`De server verloopt op ${server.endDate}, vergeet hem niet te verlengen!`">
                                <div class="flex items-center gap-x-1">
                                    <Icon name="tabler:alarm-filled" />
                                    {{ dayjs(server.endDate).format('D MMMM YYYY') }}
                                </div>
                            </Tooltip>
                            <div class="flex items-center gap-x-1">
                                <Icon name="tabler:photo-filled" />
                                {{ server.operatingSystem }}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <button 
                            class="button button-secondary"
                            @click="OpenWindow"
                            :disabled="server.powerStatus !== 'POWERED_ON'"
                        >
                            <Icon name="heroicons:command-line-16-solid" />
                        </button>
                        <button
                            class="button button-success"
                            :disabled="server.powerStatus === 'POWERED_ON'"
                            @click="powerAction('on')"
                        >
                            Start
                        </button>
                        <button 
                            class="button button-danger"
                            :disabled="server.powerStatus === 'SUSPENDED' || server.powerStatus === 'POWERED_OFF'"
                            @click="powerAction('off')"
                        >
                            Stop
                        </button>

                        <Modal
                            title="Forcibly Stop Process"
                            action-label="Kill server"
                            action-button-type="danger"
                            :action="() => powerAction('force_off')"
                            :cancel="true"
                        >
                            <template #button>
                                <button
                                    :disabled="server.powerStatus === 'SUSPENDED' || server.powerStatus === 'POWERED_OFF'"
                                    class="button button-danger"
                                >
                                    Kill
                                </button>
                            </template>
                            <template #modal>
                                Forcibly stopping a server can lead to data corruption.
                            </template>
                        </Modal>
                    </div>
                </div>
                <div class="flex items-center gap-x-8 mt-4">
                    <NuxtLink :to="`/server/${server.ID}`" class="navlink">
                        Overview
                    </NuxtLink>
                    <NuxtLink :to="`/server/${server.ID}/firewall`" class="navlink">
                        Firewall
                    </NuxtLink>
                    <NuxtLink :to="`/server/${server.ID}/settings`" class="navlink">
                        Settings
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="wrapper mt-14">
            <slot />
        </div>
    </div>
    
    <Copyright />
</template>

<script setup>
    import dayjs from 'dayjs';
    import { useServerStore } from '~/store/server';

    const addToast = useToast();
    const session = useCookie("session");
    const server = useServerStore();

    const powerAction = async (action) => {
        try {
            addToast({ title: `${server.name} marked as ${action}` });

            await $fetch(`/servers/power/${server.ID}/${action}`, {
                method: 'POST',
                baseURL: useRuntimeConfig().public.baseUrlApi,
                headers: {
                    'Authorization': `Bearer ${session.value}`
                }
            });

            server.fetchServer(server.ID);

        } catch (error) {
            handleError(error);
            console.error(error);
        }
    };

    onMounted(() => {
        const intervalId = window.setInterval(() => {
            server.fetchServer(server.ID);
        }, (useRuntimeConfig().public.refreshInterval) * 1000);

        onUnmounted(() => {
            clearInterval(intervalId);
        })
    });

    async function OpenWindow(){
        const url = `/server/${server.ID}/terminal`;
        const windowName = 'floatingWindow';
        const features = `
            width=800,
            height=600,
            top=${window.screenY + 50},
            left=${window.screenX + 50}
        `;
        
        const floatingWindow = window.open(url, windowName, features);

        if (!floatingWindow) {
            addToast({ title: 'Popup blocked! Please allow popups for this website.' });
        }
    }
</script>

<style scoped>
    .navlink {
        @apply flex items-center gap-x-1 border-b-2 border-transparent py-2 duration-300;
    }
    .navlink:hover {
        @apply text-secondary-100;
    }
    .navlink.router-link-active,
    .navlink:focus,
    .navlink:active {
        @apply border-primary-300 text-secondary-100;
    }
</style>