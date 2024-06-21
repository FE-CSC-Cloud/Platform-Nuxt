<template>
    <div :class="class" class="bg-secondary-700 rounded-lg px-5 py-4">
        <h2 v-if="title" class="text-sm text-secondary-300 font-medium mb-2">
            {{ title }}
        </h2>
        <slot />
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        class: String
    })
</script>