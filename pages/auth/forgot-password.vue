<template>
    <h1 class="text-xl font-medium text-secondary-50 mt-8 mb-5">Forgot password</h1>
</template>

<script setup>
    definePageMeta({
        middleware: ["auth-redirect"],
        layout: 'auth'
    })
</script>