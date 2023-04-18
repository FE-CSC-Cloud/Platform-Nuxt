<template>
    <footer class="bg-gray-300">
        <div class="py-3">
            <p class="text-center text-xs leading-5 text-gray-500">&copy; 2023 <span v-if="currentYear != 2023"> - {{ currentYear }} </span> <a href="https://www.hu.nl/" target="_blank" class="text-primary">Hogeschool <span class="text-secondary">Utrecht</span></a> - Frontend CSC Cloud. All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
export default {
    setup() {
        let currentYear = new Date().getFullYear()

        return {currentYear}
    }
}
</script>