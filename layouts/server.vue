<template>  
    <NavigationBar />
    <div class="bg-secondary-700 border-t-2 border-secondary-500">
        <div class="wrapper py-5">
            <div class="flex items-start justify-between">
                <div>
                    <div class="mb-1">
                        <h1 class="text-xl font-medium text-secondary-100">
                            {{ server.name }}</h1>
                        <span>{{ server.powerStatus }}</span>
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
                        class="button button-success"
                        :disabled="server.powerStatus === 'POWERED_ON'"
                        @click="powerAction('on')"
                    >
                        Start
                    </button>
                    <button 
                        class="button button-danger"
                        :disabled="server.powerStatus === 'SUSPENDED'"
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
                                :disabled="server.powerStatus === 'SUSPENDED'"
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

    const session = useCookie("session");
    const server = useServerStore();
    const addToast = useToast();

    const powerAction = async (action) => {
        try {
            addToast({ title: `Server marked as ${action}` });

            await $fetch(`/servers/power/${server.ID}/${action}`, {
                method: 'POST',
                baseURL: useRuntimeConfig().public.baseUrlApi,
                headers: {
                    'Authorization': `Bearer ${session.value}`
                }
            });
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
</script>
  