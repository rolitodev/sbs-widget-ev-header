/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import axios from 'axios';
import {
  MButton,
  MIconBase,
  MLoading,
  MState,
  MProfileDropdown,
  MDatepicker,
  MSelect,
  MInput,
  MToast,
} from '@modyo/sbs-widget-commons';
import App from './App.vue';
import store from './store';
import { i18n } from './i18n';
import './vee-validate-config';
import './vue-fontawesome-config';
import './scss/custom.scss';

Vue.config.productionTip = false;

Vue.component('mButton', MButton);
Vue.component('mProfileDropdown', MProfileDropdown);
Vue.component('mIcon', MIconBase);
Vue.component('mLoading', MLoading);
Vue.component('mState', MState);
Vue.component('mSelect', MSelect);
Vue.component('MInput', MInput);
Vue.component('MDatepicker', MDatepicker);
Vue.use(MToast, {
  defaultTime: 6000,
});

// allow dev mode
if (process.env.NODE_ENV === 'development') {
  localStorage.setItem('intermediaryCode', '{ "code": 1000, "name" :"OFICINA BOGOTÁ" }');
  window.liquid_tags = {
    logo: 'https://sbs.modyocdn.com/uploads/0be755e9-8522-46f6-a520-7379e176eb9f/R360x50/logo-sbs.png',
    sitename: 'Escritorio virtual',
    accountUrl: 'https://sbs.modyo.build',
    siteUrl: 'https://sbs.modyo.build/escritorio-virtual',
    ssoUrl: 'https://sbs-sso.modyo.build',
  };
  window.axios_api_new = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      accept: 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });
  window.axios_modyo_new = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      accept: 'application/json',
    },
  });
  window.axios_api_SBS_web = axios.create({
    baseURL: 'https://localhost:3000',
    headers: {
      accept: 'application/json',
    },
  });
  window.axios_api_sbs_apiweb = axios.create({
    baseURL: 'https://devsyli.sbseguros.co',
    headers: {
      accept: 'application/json',
    },
  });
}

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
