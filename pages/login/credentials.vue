<template>
    <div class="w-full vertical-center">
        <div class="bg-white w-fit py-4 px-5 mx-auto">
          <button v-on:click="navigateTo('/login')" class="flex flex-row text-secondary hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-sm">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

            <p class="text-sm ml-1">Terug</p>
          </button>
            <div class="text-center py-3">
                <h1 class="font-bold text-2xl">Inloggen</h1>
                <p class="mt-2 text-gray-800 w-auto text-md w-2/3 mx-auto">Log in met jouw schoolmail of platform geregistreerde mail.</p>
            </div>
            <div class="w-3/4 mx-auto mt-6">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email<span class="text-red-500">*</span></label>
                    <div class="mt-1">
                        <input type="email" email="email" id="email" disabled :value="email" class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900 mt-3">Wachtwoord<span class="text-red-500">*</span></label>
                    <div class="mt-1">
                        <input type="password" password="password" id="password" v-model="state.password" @blur="v$.password.$touch" :class="[v$.password.$errors.length ? inputClasses.Errors : inputClasses.Default]" class="block w-full border-0 py-1.5 rounded-md pl-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " />
                    </div>
                    <div class="text-xs text-red-500 mt-1" v-for="error of v$.password.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="rounded-md bg-red-50 p-4 my-5" v-if="incorrectResponse">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-red-800">Email of wachtwoord is niet juist</h3>
                    </div>
                  </div>
                </div>
                <div class="my-5">
                    <button v-on:click="submit" type="button" class="cursor-pointer rounded-md bg-primary px-3.5 py-2.5 w-full text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark">Volgende</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
definePageMeta({
  layout: "unauthenticated"
})

import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@/utils/i18n-validators'
import { XCircleIcon } from '@heroicons/vue/24/outline'

export default {
  setup() {
    let route = useRoute()
    const email = route.query.email

    const state = reactive({
        email: email,
        password: '',
      })

    const rules = {
      password: {required},
      email: {}
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$, email }
  },
  data() {
    return {
        inputClasses: getInputClasses(),
        incorrectResponse: false,
        key: 1
    }
  },
  methods: {
    async submit() {
      this.incorrectResponse = false
      let formCorrect = await this.v$.$validate()

      if (formCorrect) {
        let response = await useMyFetch('/auth/login', {
          method: 'POST',
          body: {...this.state}
        })
        let responseData = response?.data.value || {}

        if (responseData.token) {
          await setAuthToken(responseData.token)
          await setAuthUser(responseData.user)

          navigateTo('/dashboard')
        } else {
          this.incorrectResponse = true
        }
      }
    }
  },
  components: { XCircleIcon }
}
</script>

<style>
    .vertical-center {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>