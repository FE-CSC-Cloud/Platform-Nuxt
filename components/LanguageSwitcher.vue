<script setup>
    const { locale, locales, setLocale } = useI18n();
</script>

<template>
    <Dropdown>
        <template #button>
            <button 
                v-for="local in locales.filter(local => local.code === locale)" 
                :key="local.code"
                class="flex items-center gap-x-1"
            >
                <Icon name="tabler:language" />
                {{ local.name }}
            </button>
        </template>
        <template #dropdown>
            <button
                v-for="local in locales"
                @click="setLocale(local.code)"
                class="button button-secondary"
            >
                {{ local.name }}
            </button>
        </template>
    </Dropdown>
</template>