<template>  
    <NavigationBar />
    <div class="bg-secondary-700 border-t-2 border-secondary-500">
        <div class="wrapper pt-5">
            <div class="flex items-start justify-between">
                <div>
                    <div class="mb-1 flex items-center gap-x-2">
                        <h1 class="text-xl font-medium text-secondary-100">
                            {{ server.name }}
                        </h1>
                        <span :class="server.powerStatus === 'POWERED_ON' ? 'bg-success-300/20' : 'bg-danger-300/20'">
                            {{ server.powerStatus === 'POWERED_ON' ? 'Online' : 'Offline' }}
                        </span>
                    </div>
                    <p>{{ server.description }}</p>
                    <div class="flex items-center gap-x-8 mt-4">
                        <div class="flex items-center gap-x-1">
                            <Icon name="heroicons:globe-alt-solid" />
                            {{ server.IP }}
                        </div>
                        <Tooltip position="bottom" :tooltip="`De server verloopt op ${server.endDate}, vergeet hem niet te verlengen!`">
                            <div class="flex items-center gap-x-1">
                                <Icon name="tabler:alarm-filled" />
                                {{ dayjs(server.endDate).format('D MMMM YYYY') }}
                            </div>
                        </Tooltip>
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
            <div>
                <NuxtLink :to="`/server/${server.ID}`">
                    Overview
                </NuxtLink>
                <NuxtLink :to="`/server/${server.ID}/settings`">
                    Settings
                </NuxtLink>
            </div>
        </div>
    </div>
    
    <div class="wrapper mt-14">
        <slot />
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
  