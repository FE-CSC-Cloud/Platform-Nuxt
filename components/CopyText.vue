<template>
    <button @click="copyText">
    <slot />
    </button>
</template>

<script setup>
    const props = defineProps({
        text: String
    })

    const addToast = useToast();

    const copyText = () => {
        addToast({ title: `${props.text} copied to clipboard!`})
        navigator.clipboard.writeText(props.text)
    }
</script>