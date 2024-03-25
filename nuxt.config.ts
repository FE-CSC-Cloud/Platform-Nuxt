// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    runtimeConfig: {
        public: {
            laravelApiBase: '',
            appName: ''
        }
    },
    
    modules: [
        '@nuxtjs/tailwindcss', 
        '@nuxtjs/i18n'
    ],


    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'english.json'
            },
            {
                code: 'nl',
                name: 'Dutch',
                file: 'dutch.json'
            }
        ],
        strategy: 'no_prefix',
        langDir: 'lang',
        defaultLocale: 'nl'
    },

    tailwindcss: {
        cssPath: '~/assets/css/global.style.css',
    }
})
