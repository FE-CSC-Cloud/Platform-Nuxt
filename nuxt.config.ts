// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    runtimeConfig: {
        public: {
            baseUrlApi: process.env.NUXT_PUBLIC_BASE_URL_API,
            appName: process.env.NUXT_PUBLIC_APP_NAME
        }
    },

    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss', 
        '@nuxtjs/i18n',
        'nuxt-icon'
    ],

    tailwindcss: {
        cssPath: '~/assets/css/global.style.css',
    },

    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'English.json'
            },
            {
                code: 'nl',
                name: 'Dutch',
                file: 'Dutch.json'
            }
        ],
        strategy: 'no_prefix',
        langDir: 'lang',
        defaultLocale: 'nl'
    },
})