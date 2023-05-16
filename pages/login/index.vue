<template>
    <div class="w-full vertical-center">
        <div class="bg-white w-fit py-10 px-5 mx-auto">
            <div class="text-center">
                <h1 class="font-bold text-2xl">Inloggen</h1>
                <p class="mt-2 text-gray-800 w-auto text-md w-2/3 mx-auto">Log in met jouw schoolmail of platform geregistreerde mail.</p>
            </div>
            <div class="w-3/4 mx-auto mt-5">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email<span class="text-red-500">*</span></label>
                    <div class="mt-1">
                        <input type="email" email="email" id="email" v-model="state.email" @blur="v$.email.$touch" :class="[v$.email.$errors.length ? inputClasses.Errors : inputClasses.Default]" class="block w-full border-0 py-1.5 rounded-md pl-4 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " />
                    </div>
                    <div class="text-xs text-red-500 mt-1" v-for="error of v$.email.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="mt-5">
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

export default {
    setup() {
        const state = reactive({
            email: "",
        })
        const rules = {
            email: { required, email },
        }
        const v$ = useVuelidate(rules, state)
        return { state, v$ }
    },
    data() {
        return {
            inputClasses: getInputClasses(),
            email: ''
        };
    },
    methods: {
        async submit() {
            let formCorrect = await this.v$.$validate()
            if (formCorrect) {
              redirectUser(this.state.email)
              this.v$.$reset()
            }
        }
    },
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