<template>
    <h1 class="header">Settings</h1>
    <div class="grid lg:grid-cols-3">
        <TitleGreyBox title="Delete server">
            <p class="mb-2">Delete this VM, note that <b>this action can not be reversed</b>!</p>
            <Modal
                title="Delete server"
                action-button-type="danger"
                action-label="Delete server"
                :action="deleteServer"
                :cancel="true"
            >
                <template #button>
                    <button class="button button-danger flex items-center gap-x-1">
                        <div v-if="isDeleting">
                            <Icon name="svg-spinners:180-ring-with-bg" />
                        </div>
                        Delete server
                    </button>
                </template>
                <template #modal>
                    Are you sure you want to delete your server? <b>This action can not be reversed!</b>
                </template>
            </Modal>
        </TitleGreyBox>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: 'server'
    });
    
    import { useServerStore } from '~/store/server';
    
    const server = useServerStore();
    const session = useCookie("session");
    const addToast = useToast();

    const isDeleting = ref(false);

    const deleteServer = async () => {
        isDeleting.value = true;

        try {
            await $fetch('/servers/' + server.ID, {
                method: 'DELETE',
                baseURL: useRuntimeConfig().public.baseUrlApi,
                headers: {
                    'Authorization': `Bearer ${session.value}`
                }
            });
            
            addToast({ title: `${server.name} has been deleted!`});
            navigateTo('/');
        } catch (error) {
            handleError(error);
            console.error(error);
        } finally {
            isDeleting.value = false;
        }
    } 
</script>