<template>
    <div @click="openModal">
        <slot name="button" />
    </div>

    <div v-if="isOpen" class="fixed top-0 p-5 flex items-center justify-center z-40 inset-0 max-h-screen requires-no-scroll">

        <div class="fixed top-0 inset-0 bg-black/40 z-[-1]" @click="closeModal" />
        
        <div class="max-w-xl w-full bg-secondary-700 rounded-xl border-2 border-secondary-600">
            <div class="px-6 pt-5 text-xl font-medium text-secondary-100 flex items-center justify-between">
                {{ title }}
                <button class="button button-secondary !py-1 !px-2" @click="closeModal">
                    <Icon name="heroicons-solid:x" />
                </button>
            </div>
            <div class="max-h-[500px] overflow-auto px-6 pt-2 pb-5">
                <slot name="modal" />
            </div>
            <div class="bg-secondary-600 px-6 py-5 flex gap-x-3 items-center justify-end">
                <button 
                    class="button button-danger outlined"
                    @click="closeModal"
                    v-if="cancel"
                >
                    Cancel
                </button>
                <button @click="buttonAction" class="button" :class="'button-' + actionButtonType">
                    {{ actionLabel }}
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    const props = defineProps({
        title: String,
        cancel: Boolean,
        actionButtonType: String,
        actionLabel: String,
        action: Function
    });

    const isOpen = ref(false);

    function buttonAction(){
        props.action();
        closeModal();
    }

    const openModal = () => {
        isOpen.value = true;
    };

    const closeModal = () => {
        isOpen.value = false;
    };
</script>