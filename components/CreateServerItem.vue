<template>
    <div class="flex gap-5 first-of-type:pt-0 pt-3">
        <div :class="pipelineClass">
            <span class="item">
                <Icon name="tabler:circle-check-filled" />
            </span>
        </div>
        <div :class="contentClass">
            <h2 class="text-xl font-medium text-secondary-100">{{ title }}</h2>
            <p v-if="description" class="text-sm max-w-sm mb-5">{{ description }}</p>
            <slot />
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        description: String,
        target: String,
        disablePipeline: Boolean
    });

    const pipelineClass = computed(() => ({
        pipeline: true,
        active: props.target,
        disablePiple: props.disablePipeline
    }));

    const contentClass = computed(() => ({
        'flex-1': true,
        'pb-0': props.disablePipeline,
        'pb-6': !props.disablePipeline
    }));
</script>

<style>
    .pipeline {
        @apply relative flex flex-col pt-1 items-center overflow-hidden;
    }
    .pipeline::after,
    .pipeline::before {
        @apply content-[''] h-full absolute border border-dashed border-secondary-500 mt-8 duration-300;
    }
    .pipeline.active::after {
        @apply border-transparent;
    }
    .pipeline::before {
        @apply border-primary-300 top-1 h-0;
    }
    .pipeline.active::before {
        @apply h-full border-primary-300;
    }
    .disablePiple.pipeline::after,
    .disablePiple.pipeline::before {
        @apply hidden;
    }
    .pipeline .item {
        @apply flex items-center justify-center w-5 h-5 rounded-full text-2xl bg-secondary-600 border-2 border-secondary-500 text-primary-300;
    }
    .pipeline .item > svg {
        @apply absolute w-6 h-6 opacity-0 duration-300;
    }
    .pipeline.active .item > svg {
        @apply opacity-100;
    }
</style>