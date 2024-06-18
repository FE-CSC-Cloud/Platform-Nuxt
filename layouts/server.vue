<template>  
    <NavigationBar />
    <div class="bg-secondary-700 border-t-2 border-secondary-500">
        <div class="wrapper py-5">
            [Server name {{ id }}]
        </div>
    </div>
    
    <div class="wrapper mt-14">
        <slot />
    </div>
    <Copyright />
</template>

<script setup>
    const route = useRoute();
    
    const id = ref(route.path.split('/')[2] || '');
    
    watch(
        () => route.path,
        (newPath) => {
            id.value = newPath.split('/')[2] || '';
        }
    );
</script>
  