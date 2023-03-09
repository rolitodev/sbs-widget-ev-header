/* Config file for i18n plugin */

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import es from 'vee-validate/dist/locale/es.json';
import en from 'vee-validate/dist/locale/en.json';

import esLocales from './locales/es.json';
import enLocales from './locales/en.json';

Vue.use(VueI18n);

// Get page language from modyo, change to your needs
const LANG = window?.liquid?.lang ?? 'es-CL';

export const i18n = new VueI18n({
  locale: LANG || 'es',
  fallbackLocale: LANG || 'es',
  // eslint-disable-next-line no-use-before-define
  messages: loadLocaleMessages(),
});

function loadLocaleMessages() {
  const messages = {};
  messages.es = {
    ...es.messages,
    ...esLocales,
  };
  messages.en = {
    ...en.message,
    ...enLocales,
  };
  return messages;
}
export default { i18n };
