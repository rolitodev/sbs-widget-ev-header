export default {
  SET_CODE(state, value) {
    state.code = value;
  },
  SET_AVAILABLE_APPLICATIONS(state, applications) {
    state.availableApplications = [];
    state.availableApplications = applications;
  },
  SET_INTERMEDIARIES(state, value) {
    state.intermediaries = value;
  },
  SET_ONLINE_PRODUCTS(state, products) {
    state.onlineProducts = products;
  },
  SET_USER_ID(state, value) {
    state.userId = value;
  },
};
