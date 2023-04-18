<template>
    <p class="font-bold">Dashboard</p>
    <button v-on:click="navigateTo('request')" type="button" class="cursor-pointer rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark">Server aanvragen</button>
</template>

<script>
definePageMeta({
  layout: "dashboard"
})

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