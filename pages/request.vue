<template>
    <h1 class="font-bold text-2xl">Aanvraag maken</h1>
    <p class="mt-2 text-gray-800 w-1/2 text-sm">Stel hier in welke instellingen je wilt voor op je server. Als je over een limiet gaat wordt bij het insturen
      van de aanvraag de server wel aangemaakt, maar wordt er bij de beheerders een aanvraag ingediend. De beheerders bekijken dan of zij de wijzigingen toestaan.
    </p>
    <div class="mt-5">
      <div class="w-1/3 flex flex-col gap-3">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Project naam<span class="text-red-500">*</span></label>
          <div class="mt-1">
            <input type="text" name="name" id="name" v-model="request.name" class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Project beschrijving<span class="text-red-500">*</span></label>
          <div class="mt-1">
            <textarea rows="3" name="description" id="description" v-model="request.description" class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="os" class="block text-sm font-medium leading-6 text-gray-900">Besturingssysteem<span class="text-red-500">*</span></label>
          <select id="os" name="os" v-model="request.os" class="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
            <option selected disabled value="null">Maak een selectie</option>
            <option v-for="option in os_options" :key="option.id" :value="option.id">{{ option.name }}</option>
          </select>
        </div>
      </div>
      <div class="mt-5">
        <button v-on:click="submit" type="button" class="cursor-pointer rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark">Aanvraag indienen</button>
      </div>
    </div>
</template>

<script>
definePageMeta({
  layout: "dashboard"
})

export default {
  data() {
    return {
      request: {
        name: '',
        description: '',
        os: null
      },
      os_options: [
        {id: 1, name: 'Ubuntu'},
        {id: 2, name: 'Windows'}
      ]
    }
  },
  methods: {
    submit() {
      alert(this.request.name)
    }
  }
}
</script>