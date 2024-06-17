<template>
    <div class="flex items-center gap-x-1">
        <label :for="id" class="label">{{ left }}</label>
        <div class="toggler">
            <slot />
            <div class="slider">
                <span class="indicator"/>
            </div>
        </div>
        <label :for="id" class="label">{{ right }}</label>
    </div>
</template>

<script setup>
const props = defineProps({
    left: String,
    right: String,
    id: String
})
</script>