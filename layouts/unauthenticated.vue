<template>
    <div class="flex flex-col h-full justify-between bg-gray-300">
        <div class="h-full">
            <div class="max-w-7xl pt-5 h-full">
                <slot/>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
useHead({
  bodyAttrs: {
    class: 'h-full'
  },
  htmlAttrs: {
    class: 'h-full'
  },
})
</script>

<style>
#__nuxt {
  height: 100%;
}
</style>