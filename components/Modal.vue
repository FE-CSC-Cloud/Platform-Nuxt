<template>
    <div class="fixed top-0 p-5 flex items-center justify-center z-40 inset-0 max-h-screen requires-no-scroll">

        <div class="fixed top-0 inset-0 bg-black/40 z-[-1]" @click="close" />
        
        <div class="max-w-xl w-full bg-secondary-700 rounded-xl border-2 border-secondary-600">
            <div class="px-6 pt-5 text-xl font-medium text-secondary-100 flex items-center justify-between">
                {{ title }}
                <button class="button button-secondary !py-1 !px-2" @click="close">
                    <Icon name="heroicons-solid:x" />
                </button>
            </div>
            <div class="max-h-[500px] overflow-auto px-6 pt-2 pb-5">
                <slot />
            </div>
            <div class="bg-secondary-600 px-6 py-5 flex gap-x-3 items-center justify-end">
                <button 
                    class="button button-danger outlined"
                    @click="close"
                    v-if="cancel"
                >
                    Cancel
                </button>
                <button @click="action" class="button" :class="'button-' + actionButtonType">
                    {{ actionLabel }}
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    cancel: Boolean,
    close: Function,
    actionButtonType: String,
    actionLabel: String,
    action: Function
});
  </script>