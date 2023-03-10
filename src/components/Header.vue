<!-- eslint-disable array-callback-return -->
<!-- eslint-disable no-param-reassign -->
<!-- eslint-disable array-callback-return -->
<!-- eslint-disable no-param-reassign -->
<template>
  <div class="header-inner container">
    <m-loading
      type="full"
      icon="loader-brand"
      :show="showLoader" />
    <div class="logo">
      <template v-if="logo">
        <img
          :src="logo"
          alt="Logo SBS intermediarios">
      </template>
      <template v-else>
        <img
          src="https://sbs.modyocdn.com/uploads/1ad8ec88-30b8-48ac-98fc-5ed436024147/original/logo-sbs.svg"
          alt="Logo SBS intermediarios">
      </template>
      <h1 class="sr-only">
        {{ sitename }}
      </h1>
    </div>
    <div class="btn-brokers">
      ESCRITORIO VIRTUAL
    </div>
    <div class="m-multiselect mr-4">
      <label class="typo__label">Nombre intermediario</label>
      <multiselect
        v-if="hasAgentGroups"
        v-model="agentName"
        :options="intermediateList"
        :show-labels="false"
        :allow-empty="false"
        track-by="brokerData"
        label="brokerData"
        placeholder="Buscar"
        @input="changeBroker" />
      <div
        v-else
        :title="agentName.brokerData"
        class="broker-name">
        {{ agentName.brokerData }}
      </div>
    </div>
    <div v-if="agentStatus">
      <div class="broker-status">
        {{ agentStatus }}
      </div>
    </div>
    <nav
      class="navbar navbar-expand-md m-0"
      role="navigation">
      <h2 class="sr-only">
        Menu
      </h2>
      <div
        id="navbar-menu"
        class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li
            id="my-account"
            class="nav-item-mi-cuenta dropdown menu-item">
            <a
              class="dropdown-toggle"
              href="#"
              @click.prevent="dropdown = !dropdown">
              <span>Mi cuenta</span>
              <i class="fas fa-chevron-down" />
            </a>
            <div
              v-if="dropdown"
              class="clickoutside"
              @click="hideDropdown" />
            <ul
              v-show="dropdown"
              class="submenu-0 dropdown-menu">
              <li
                v-if="agentName.brokerCode === 'SU0'"
                id="change-password"
                class="submenu-item submenu-item-cambiar-clave">
                <!-- <a>
                  <div
                    class="d-flex justify-content-center align-items-center px-lg-2"
                    @click="('/admin-permisses')">
                    Administrar Permisos
                  </div>
                </a> -->
              </li>
              <li
                id="change-password"
                class="submenu-item submenu-item-cambiar-clave">
                <a
                  :href="
                    ssoUrl +
                      '/auth/realms/escritorio-virtual/account/password?referrer=modyo&referrer_uri=' +
                      siteUrl
                  ">
                  <span>Cambiar contraseña</span>
                </a>
              </li>
              <li
                id="sing-out"
                class="submenu-item submenu-item-cerrar-sesion">
                <a :href="accountUrl + '/logout?site=9170d622-0bf9-45b7-b1a1-c62a6ef40c4d'">
                  <span>Cerrar sesión</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
// import { mapState } from 'vuex';
/* eslint-disable no-undef */
/* eslint-disable vue/valid-v-bind */
// import DataDb from '../../__mocks__/ws/db.json';

export default {
  name: 'HeaderHome',
  components: { Multiselect },
  data() {
    return {
      dropdown: false,
      agentName: {},
      intermediateList: [],
      intermediariesArray: [],
      agentStatus: '',
      eventBus: 'vueBus',
      siseState: '',
      logo: '',
      sitename: '',
      showLoader: true,
      accountUrl: '',
      siteUrl: '',
      ssoUrl: '',
      codeAgentParameter: '',
    };
  },
  computed: {
    hasAgentGroups() {
      return this.intermediateList.length > 1;
    },
  },
  watch: {
    codeAgentSelected(value) {
      this.$root.$emit('codeSelected', value);
    },
    siseState(value) {
      if (value === 'I') {
        this.agentStatus = 'Usuario Inactivo';
      } else {
        this.agentStatus = null;
      }
    },
  },
  created() {
    const vm = this;
    vm.codeAgentParameter = this.getParameterByName('codeAgent');
    vm.logo = liquid_tags.logo;
    vm.sitename = liquid_tags.sitename;
    vm.accountUrl = liquid_tags.accountUrl;
    vm.siteUrl = liquid_tags.siteUrl;
    vm.ssoUrl = liquid_tags.ssoUrl;
    vm.hideDropdown();
    axios_api_new
      .get('/agente')
      .then((response) => {
        vm.codeAgentSelected = response.data.data.agent.code;
        vm.currentUser = response.data.data.user;
        vm.$store.dispatch('GET_ONLINE_PRODUCTS');
        if (vm.codeAgentSelected === 'SU0') {
          vm.parentAgent = {
            brokerData: `${response.data.data.agent.name}`,
            brokerCode: vm.codeAgentSelected,
          };
          vm.agentName = {
            brokerData: `${response.data.data.agent.name}`,
            brokerCode: vm.codeAgentSelected,
          };
        } else {
          vm.parentAgent = {
            brokerData: `${response.data.data.agent.name} ${vm.codeAgentSelected}`,
            brokerCode: vm.codeAgentSelected,
          };
        }

        // Se usa en los widget de consultas prod, y demás migrados
        localStorage.setItem('intermediaryCode', JSON.stringify({
          code: vm.parentAgent.brokerCode,
          name: vm.parentAgent.brokerData,
        }));
        window.dispatchEvent(new CustomEvent('local-storage-changed', {
          detail: {
            storage: localStorage.getItem('intermediaryCode'),
          },
        }));
        this.$store.commit('SET_USER_ID', response.data.data.user);
        this.$store.dispatch('GET_AVAILABLE_APPLICATIONS', response.data.data.user);

        if (vm.codeAgentParameter === null || vm.codeAgentSelected === vm.codeAgentParameter) {
          vm.agentName = {
            brokerData: `${response.data.data.agent.name} ${vm.codeAgentSelected}`,
            brokerCode: vm.codeAgentSelected,
          };
        } else if (response.data.data.agent.agentsGrouped) {
          // eslint-disable-next-line array-callback-return
          response.data.data.agent.agentsGrouped.map((broker) => {
            if (broker.code === vm.codeAgentParameter) {
              vm.agentName = {
                brokerData: `${broker.name} ${broker.code}`,
                brokerCode: broker.code,
              };
            }
          });
        }

        vm.siseState = response.data.data.agent.siseState;

        sessionStorage.setItem(
          'brokerSelected',
          JSON.stringify({ code: vm.agentName.brokerCode, name: vm.agentName.brokerData }),
        );
        vm.$store.commit('SET_CODE', vm.agentName.brokerCode);
        if (response.data.data.agent.agentsGrouped) {
          // Mapeo de datos de brokers asociados
          const myData = response.data.data.agent.agentsGrouped.map((broker) => {
            // eslint-disable-next-line no-param-reassign
            broker.$isDisabled = broker.siseState === 'C';
            if (!broker.brokerData && broker.siseState === 'A') {
              // eslint-disable-next-line no-param-reassign
              broker.brokerData = `${broker.name} ${broker.code}`;
            } else if (!broker.brokerData && broker.siseState === 'I') {
              // eslint-disable-next-line no-param-reassign
              broker.brokerData = `${broker.name} ${broker.code} (Inactivo)`;
            } else if (!broker.brokerData && broker.siseState === 'C') {
              // eslint-disable-next-line no-param-reassign
              broker.brokerData = `${broker.name} ${broker.code} (Cancelado)`;
            } else {
              // eslint-disable-next-line no-param-reassign
              broker.brokerData = `${broker.name} ${broker.code} (Inactivo)`;
            }
            return broker;
          });
          myData.unshift(vm.parentAgent);
          vm.intermediateList = myData;
          vm.$store.commit('SET_INTERMEDIARIES', myData);
        }
        vm.showLoader = false;
      })
      .catch(() => {
        /** *
         * ! comentar
         */
        // if (process.env.NODE_ENV === 'development') {
        //   vm.$store.dispatch('GET_ONLINE_PRODUCTS');
        //   vm.codeAgentSelected = DataDb.agente.data.agent.code;

        //   if (vm.codeAgentSelected === 'SU0') {
        //     vm.parentAgent = {
        //       brokerData: `${DataDb.agente.data.agent.name}`,
        //       brokerCode: vm.codeAgentSelected,
        //     };
        //     vm.agentName = {
        //       brokerData: `${DataDb.agente.data.agent.name}`,
        //       brokerCode: vm.codeAgentSelected,
        //     };
        //   } else {
        //     vm.parentAgent = {
        //       brokerData: `${DataDb.agente.data.agent.name} ${vm.codeAgentSelected}`,
        //       brokerCode: vm.codeAgentSelected,
        //     };
        //   }

        //   this.$store.dispatch('GET_AVAILABLE_APPLICATIONS', DataDb.agente.data.user).then(() => {
        //     // vm.$store.dispatch('GET_ONLINE_PRODUCTS');
        //   });

        //   if (vm.codeAgentParameter === null || vm.codeAgentSelected === vm.codeAgentParameter) {
        //     vm.agentName = {
        //       brokerData: `${DataDb.agente.data.agent.name} ${vm.codeAgentSelected}`,
        //       brokerCode: vm.codeAgentSelected,
        //     };
        //   } else if (DataDb.agente.data.agent.agentsGrouped) {
        //     // eslint-disable-next-line array-callback-return
        //     DataDb.agente.data.agent.agentsGrouped.map((broker) => {
        //       if (broker.code === vm.codeAgentParameter) {
        //         vm.agentName = {
        //           brokerData: `${broker.name} ${broker.code}`,
        //           brokerCode: broker.code,
        //         };
        //       }
        //     });
        //   }

        //   vm.siseState = DataDb.agente.data.agent.siseState;

        //   sessionStorage.setItem(
        //     'brokerSelected',
        //     JSON.stringify({ code: vm.agentName.brokerCode, name: vm.agentName.brokerData }),
        //   );
        //   vm.$store.commit('SET_CODE', vm.agentName.brokerCode);
        //   if (DataDb.agente.data.agent.agentsGrouped) {
        //     // Mapeo de datos de brokers asociados
        //     const myData = DataDb.agente.data.agent.agentsGrouped.map((broker) => {
        //       // esli nt-disable-next-line no-param-reassign
        //       // eslint-disable-next-line no-param-reassign
        //       broker.$isDisabled = broker.siseState === 'C';
        //       if (!broker.brokerData && broker.siseState === 'A') {
        //         // eslint-disable-next-line no-param-reassign
        //         broker.brokerData = `${broker.name} ${broker.code}`;
        //       } else if (!broker.brokerData && broker.siseState === 'I') {
        //         // eslint-disable-next-line no-param-reassign
        //         broker.brokerData = `${broker.name} ${broker.code} (Inactivo)`;
        //       } else if (!broker.brokerData && broker.siseState === 'C') {
        //         // eslint-disable-next-line no-param-reassign
        //         broker.brokerData = `${broker.name} ${broker.code} (Cancelado)`;
        //       } else {
        //         // eslint-disable-next-line no-param-reassign
        //         broker.brokerData = `${broker.name} ${broker.code} (Inactivo)`;
        //       }
        //       return broker;
        //     });
        //     myData.unshift(vm.parentAgent);
        //     vm.intermediateList = myData;
        //     vm.$store.commit('SET_INTERMEDIARIES', myData);
        //   }

        //   vm.showLoader = false;
        // } else {
        //   throw err;
        // }
      });
  },
  methods: {
    hideDropdown() {
      this.dropdown = false;
    },
    getParameterByName(sParametroNombre) {
      const sPaginaURL = window.location.search.substring(1);
      const sURLVariables = sPaginaURL.split('&');
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < sURLVariables.length; i++) {
        const sParametro = sURLVariables[i].split('=');
        if (sParametro[0] === sParametroNombre) {
          return sParametro[1];
        }
      }
      return null;
    },
    changeBroker(value) {
      const vm = this;
      vm.siseState = value.siseState;
      vm.showLoader = true;
      this.$store.commit('SET_AVAILABLE_APPLICATIONS', []);

      if (value.code) {
        vm.codeAgentSelected = value.code;
        sessionStorage.setItem(
          'brokerSelected',
          JSON.stringify({ code: value.code, name: value.name }),
        );
        // Se usa en los widget de consultas prod, y demás migrados
        localStorage.setItem('intermediaryCode', JSON.stringify({
          code: value.code,
          name: value.name,
        }));
        // window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('local-storage-changed', {
          detail: {
            storage: localStorage.getItem('intermediaryCode'),
          },
        }));
      } else {
        vm.codeAgentSelected = value.brokerCode;
        sessionStorage.setItem(
          'brokerSelected',
          JSON.stringify({ code: value.brokerCode, name: value.brokerData }),
        );
        // Se usa en los widget de consultas prod, y demás migrados
        localStorage.setItem('intermediaryCode', JSON.stringify({
          code: value.brokerCode,
          name: value.brokerData,
        }));
        window.dispatchEvent(new CustomEvent('local-storage-changed', {
          detail: {
            storage: localStorage.getItem('intermediaryCode'),
          },
        }));
      }

      vm.$store.commit('SET_CODE', vm.codeAgentSelected);

      if (value.agentDocumentNumber) {
        let item = {};
        this.$store.dispatch('GET_AVAILABLE_APPLICATIONS', value.agentDocumentNumber).then(() => {
          // vm.$store.dispatch('GET_ONLINE_PRODUCTS');
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < this.intermediariesArray.length; index++) {
            // Recorremos el arreglo de intermediarios
            if (this.intermediariesArray[index]) {
              // Validamos que el item no esté vacio
              if (this.intermediariesArray[index].agentDocumentNumber === value.agentDocumentNumber) {
                // Validamos si el número de documento del arreglo sea igual al que seleccionó el usuario.
                // this.intermediariesArray[index].$isDisabled = true;
                // Deshabilitamos el item seleccionado en el desplegable.
                item = this.intermediariesArray[index];
                // Guardamos el objeto seleccionado en la variable item para posteriormente
                // mover ese objeto a la posición 2.
                delete this.intermediateList[index];
                // Eliminamos el item seleccionado.
              }
            }
          }
          // Movemos a la posición 2 del array el ítem que seleccionamos antes.
          this.intermediariesArray.splice(2, 0, item);
          this.intermediateList = this.intermediariesArray;
          vm.showLoader = false;
        });
      } else if (value.brokerCode === 'SU0') {
        this.$store.dispatch('GET_AVAILABLE_APPLICATIONS', this.$store.state.userId);
        // Si el usuario selecciona SUPER USUARIO dejamos el array en el estado de defecto que es 'intermediaries'.
        this.intermediateList = this.$store.state.intermediaries;
        this.intermediariesArray = [];
        vm.showLoader = false;
      } else {
        this.intermediariesArray.push({ brokerCode: 'SU0', brokerData: 'SUPER USUARIO' });
        this.intermediariesArray.push({ ...value });

        this.$store.dispatch('GET_ALL_USERS_BY_CODE', value.code).then((response) => {
          this.intermediariesArray.push(...response);
          vm.showLoader = false;
        });

        this.intermediateList = this.intermediariesArray;
      }
    },
  },
};
</script>
