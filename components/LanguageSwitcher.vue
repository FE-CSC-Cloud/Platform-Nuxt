<script setup>
const { locale, locales, setLocale } = useI18n();
</script>

<template>
    <div v-for="local in locales">
        <button @click="setLocale(local.code)" :class="local.code === locale && 'bg-primary-200'">
            {{ local.code }}
        </button>
    </div>
</template>