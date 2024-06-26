<template>
    <h1 class="header">Requests</h1>
    <div class="table">
        <div class="table-header">
            <h2 class="header !text-secondary-50">Requests</h2>
        </div>
        <table>
            <tr>
                <th>Title</th>
                <th>Creator</th>
                <th>Status</th>
                <th></th>
            </tr>
            <tr v-for="ticket in tickets">
                <td>{{ ticket.title }}</td>
                <td>{{ ticket.creatorName }}</td>
                <td>
                    <span 
                        class="badge badge-variant-secondary"
                        :class="ticket.status === 'Pending' 
                        ? 'badge-warning' 
                        : ticket.status === 'Accepted'
                        ? 'badge-success'
                        : 'badge-warning'"
                    >
                        {{ ticket.status}}
                    </span>
                </td>
                <td class="flex justify-end">
                    <Modal
                        :title="ticket.title"
                        action-button-type="danger"
                        action-label="Delete request"
                        :action="() => deleteTicket(ticket.id)"
                        :cancel="true"
                    >
                        <template #button>
                            <button class="button button-secondary w-full text-left">
                                View
                            </button>
                        </template>
                        <template #modal>
                            <div class="flex items-center gap-2">
                                <span 
                                    class="badge badge-variant-secondary"
                                    :class="ticket.status === 'Pending' 
                                    ? 'badge-warning' 
                                    : ticket.status === 'Accepted'
                                    ? 'badge-success'
                                    : 'badge-warning'"
                                >
                                    {{ ticket.status}}
                                </span>
                                <Tooltip position="top" tooltip="Creation date">
                                    <span class="badge badge-secondary">
                                        <Icon name="tabler:calendar-filled" />
                                        {{ ticket.createdAt }}
                                    </span>
                                </Tooltip>
                                <Tooltip position="top" tooltip="Creator name">
                                    <span class="badge badge-secondary">
                                        <Icon name="heroicons-solid:user-circle" />
                                        {{ ticket.creatorName }}
                                    </span>
                                </Tooltip>
                                <Tooltip position="top" tooltip="Request ID">
                                    <span class="badge badge-secondary">
                                        <Icon name="tabler:hash" />
                                        {{ ticket.id }}
                                    </span>
                                </Tooltip>
                            </div>
                            <p class="mt-4 border-2 border-secondary-500 bg-secondary-600 px-3 py-2 rounded-md">
                                <span class="block text-sm font-medium text-secondary-400 mb-1">Request:</span>
                                {{ ticket.message }}
                            </p>
                        </template>
                    </Modal>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: 'dashboard'
    })
    useSeoMeta({
        title: 'Requests' + ' - ' + useRuntimeConfig().public.appName,
    })

    const session = useCookie("session");
    const tickets = ref([]);

    const deleteTicket = (id) => {
        try {
            $fetch('/tickets/' + id, {
                method: 'DELETE',
                baseURL: useRuntimeConfig().public.baseUrlApi,
                headers: {
                    'Authorization': `Bearer ${session.value}`
                }
            });

            tickets.value = tickets.value.filter(ticket => ticket.id !== id);
        } catch (error) {
            handleError(error);
            console.error(error);
        }
    }

    try {
        const response = await $fetch('/tickets', {
            method: 'GET',
            baseURL: useRuntimeConfig().public.baseUrlApi,
            headers: {
                'Authorization': `Bearer ${session.value}`
            }
        });
        tickets.value = response;
    } catch (error) {
        handleError(error);
        console.error(error);
    }
</script>