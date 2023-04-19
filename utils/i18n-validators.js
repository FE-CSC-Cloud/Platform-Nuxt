import * as validators from '@vuelidate/validators'
import { createI18n } from 'vue-i18n'

import { messages } from '@/translations'
const i18n = createI18n({
    locale: 'nl',
    messages,
})
const { createI18nMessage } = validators

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

export const required = withI18nMessage(validators.required)
