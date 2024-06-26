<template>
    <h1 class="header">Requests</h1>
    <div class="table">
        <div class="table-header">
            <h2 class="header !text-secondary-50">Requests</h2>
            <Modal
                title="New request"
                action-button-type="primary"
                action-label="Create"
                :action="createRequest"
                :cancel="true"
            >
                <template #button>
                    <button class="button button-primary">New request</button>
                </template>
                <template #modal>
                    <div class="flex flex-col gap-2 mt-1">
                        <p class="text-sm">
                            Want more server resources, an additional server slot, a port open in the firewall or any other request for the CSC Guild? Then make a request here!
                        </p>
                        <InputWrapper label="Request title" id="title">
                            <input v-model="title" id="title" placeholder="Request title">
                        </InputWrapper>
                        <InputWrapper label="Request message" id="message">
                            <textarea placeholder="Request message" v-model="message" id="message" rows="4"></textarea>
                        </InputWrapper>
                    </div>
                </template>
            </Modal>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Creator</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in tickets" :key="ticket.id">
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.creatorName }}</td>
                    <td>
                        <span :class="['badge badge-variant-secondary', statusClass(ticket.status)]">
                            {{ ticket.status }}
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
                                <button class="button button-secondary w-full text-left">View</button>
                            </template>
                            <template #modal>
                                <div class="flex items-center gap-2 flex-wrap">
                                    <button 
                                        @click="toggleStatus(ticket.id, ticket.status)" 
                                        :class="['badge badge-variant-secondary', statusClass(ticket.status)]"
                                    >
                                        {{ ticket.status }}
                                    </button>
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
                                <div class="mt-4 border-2 border-secondary-500 bg-secondary-600 px-3 py-2 rounded-md">
                                    <span class="block text-sm font-medium text-secondary-400 mb-1">Request:</span>
                                    <p v-html="ticket.message.replace(/\n/g, '<br>')" /> 
                                </div>
                            </template>
                        </Modal>
                    </td>
                </tr>
            </tbody>
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

const title = ref('');
const message = ref('')

const addToast = useToast();

const apiFetch = (url, method, body) => {
    return $fetch(url, {
        method: method,
        baseURL: useRuntimeConfig().public.baseUrlApi,
        headers: {
            'Authorization': `Bearer ${session.value}`
        },
        body: body
    });
};

const createRequest = async () => {
    try {
        await apiFetch('/tickets', 'POST', { title: title.value, message: message.value });
        title.value = '';
        message.value = '';
        fetchRequests();
        addToast({ title: `Your request ${title.value} has been created!`});
    } catch (error) {
        handleError(error);
        console.error(error);
    }
};

const deleteTicket = async (id) => {
    try {
        await apiFetch(`/tickets/${id}`, 'DELETE');
        fetchRequests();
        addToast({ title: `The request has been deleted!`});
    } catch (error) {
        handleError(error);
        console.error(error);
    }
};

const toggleStatus = async (id, status) => {
    const newStatus = {
        'Pending': 'accepted',
        'Accepted': 'rejected',
        'Rejected': 'pending'
    }[status] || '';

    try {
        await apiFetch(`/tickets/${id}`, 'PATCH', { status: newStatus });
        addToast({ title: `The request status got updated to ${newStatus}`});
        fetchRequests();
    } catch (error) {
        console.error(error);
    }
};

const fetchRequests = async () => { 
    try {
        tickets.value = await apiFetch('/tickets', 'GET');
    } catch (error) {
        handleError(error);
        console.error(error);
    }
};

const statusClass = (status) => {
    return {
        'Pending': 'badge-warning',
        'Accepted': 'badge-success',
        'Rejected': 'badge-danger'
    }[status];
};

const TooltipItem = defineComponent({
    props: {
        icon: String,
        tooltip: String,
        text: String
    },
    template: `
        <Tooltip :position="'top'" :tooltip="tooltip">
            <span class="badge badge-secondary">
                <Icon :name="icon" />
                {{ text }}
            </span>
        </Tooltip>
    `
});

fetchRequests();
</script>