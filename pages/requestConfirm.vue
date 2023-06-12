<template>
    <h1 class="mt-5 font-bold text-2xl">Server wordt aangevraagd</h1>
    <p class="mt-8 text-gray-800 md:w-3/4 w-full text-md">
      Omdat je server buiten de normale limieten is moet deze eerst goed gekeurd worden. <br>
      Dit kan een paar dagen duren! <br><br>
      Zie de status op de server beheren pagina.
    </p>
    <div class="mt-8">
      <button v-on:click="navigateTo('/dashboard')" type="button" 
      class="cursor-pointer rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark">Servers beheren</button>
    </div>
</template>

<script>
definePageMeta({
  layout: "dashboard"
})
</script>