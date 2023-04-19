<template>
    <h1 class="font-bold text-2xl">Aanvraag maken</h1>
    <p class="mt-2 text-gray-800 md:w-3/4 w-full text-md">Stel hier in welke instellingen je wilt voor op je server. Als je over een limiet gaat wordt bij het insturen
      van de aanvraag de server wel aangemaakt, maar wordt er bij de beheerders een aanvraag ingediend. De beheerders bekijken dan of zij de wijzigingen toestaan.
    </p>
    <div class="mt-5">
      <div class="md:w-1/3 w-full flex flex-col gap-3">
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Project naam<span class="text-red-500">*</span></label>
          <div class="mt-1">
            <input type="text" name="name" id="name" v-model="state.name" @blur="v$.name.$touch" :class="[v$.name.$errors.length ? inputClasses.Errors : inputClasses.Default]" class="block w-full border-0 py-1.5 rounded-md pl-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " />
          </div>
          <div class="text-xs text-red-500 mt-1" v-for="error of v$.name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Project beschrijving<span class="text-red-500">*</span></label>
          <div class="mt-1">
            <textarea rows="3" name="description" id="description" v-model="state.description" @blur="v$.description.$touch" :class="[v$.description.$errors.length ? inputClasses.Errors : inputClasses.Default]" class="block w-full border-0 py-1.5 rounded-md pl-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " />
          </div>
          <div class="text-xs text-red-500 mt-1" v-for="error of v$.description.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <label for="os" class="block text-sm font-medium leading-6 text-gray-900">Besturingssysteem<span class="text-red-500">*</span></label>
          <select id="os" name="os" v-model="state.os" @blur="v$.os.$touch" :class="[v$.os.$errors.length ? inputClasses.Errors : inputClasses.Default]" class="block w-full border-0 py-1.5 rounded-md pl-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ">
            <option selected disabled value="null">Maak een selectie</option>
            <option v-for="option in os_options" :key="option.id" :value="option.id">{{ option.name }}</option>
          </select>
          <div class="text-xs text-red-500 mt-1" v-for="error of v$.os.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
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

import { useVuelidate } from '@vuelidate/core'
import { required } from '@/utils/i18n-validators'


export default {
  setup() {
    const state = reactive({
        name: '',
        description: '',
        os: ''
      })

    const rules = {
      name: {required},
      description: {required},
      os: {required},
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data() {
    return {
      os_options: [
        {id: 1, name: 'Ubuntu'},
        {id: 2, name: 'Windows'}
      ],
      inputClasses: getInputClasses()
    }
  },
  methods: {
    async submit() {
      let formCorrect = await this.v$.$validate()

      if (formCorrect) {
        let data = await useMyFetch('/request', {
          method: 'POST',
          body: this.state
        })
        console.log(data)
      }
    }
  }
}
</script>