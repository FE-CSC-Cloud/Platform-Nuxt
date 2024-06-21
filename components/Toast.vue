<template>
    <div class="toast-container">
        <div
            v-for="toast in toasts"
            :key="toast.id"
            class="toast"
        >
            <p>{{ toast.title }}</p>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { useToastStore } from '~/store/toasts';
    
    const { toasts } = useToastStore();
</script>
  
<style scoped>
    .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
    }
    .toast {
        background-color: #333;
        color: white;
        padding: 10px 20px;
        margin-bottom: 10px;
        border-radius: 4px;
    }
</style>