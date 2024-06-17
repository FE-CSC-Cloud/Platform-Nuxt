<template>
    <div>
        <label class="label" :for="id">
            {{ label }}
        </label>

        <div class="input-wrapper my-1" :class="isValid ? '' : 'input-error'">
            <slot />
        </div>
        <span v-if="!isValid" class="text-danger-300 text-sm">
            {{ error ? error : 'Value does not match the required pattern.' }}
        </span>
        <span v-if="isValid" class="text-sm text-secondary-400">
            {{ description }}
        </span>
    </div>
</template>

<script setup>

const props = defineProps({
    id: String,
    label: String,
    description: String,
    value: String,
    regex: RegExp,
    error: String,
});

const isValid = computed(() => {
    if (!props.value || props.value.length < 3 || !props.regex) {
        return true; 
    }
    const pattern = typeof props.regex === 'string' ? new RegExp(props.regex) : props.regex;
    return pattern.test(props.value);
});

</script>