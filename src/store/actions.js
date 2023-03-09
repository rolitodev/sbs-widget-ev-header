import DataDb from '../assets/db.json';
import { sortAlphabeticaly } from '../assets/helper';

export default {
  GET_AVAILABLE_APPLICATIONS(context, username) {
    return axios_api_sbs_apiweb.get(`/api/v1/modyo/adminUsers/applicationsByUser/${username}`)
      .then((response) => {
        const { applicationByUserDTO } = response.data;
        context.commit('SET_AVAILABLE_APPLICATIONS', applicationByUserDTO);
      })
      .catch((error) => {
        throw error;
      });
  },
  GET_ONLINE_PRODUCTS(context) {
    return axios_modyo_new
      .get('/posts.json?category=productos-en-linea&per_page=200')
      .then((response) => {
        context.commit('SET_ONLINE_PRODUCTS', response.data.posts.sort(sortAlphabeticaly));
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          context.commit(
            'SET_ONLINE_PRODUCTS',
            DataDb.productosEnlineaCategory.posts.sort(sortAlphabeticaly),
          );
        }
        throw error;
      });
  },
  GET_ALL_USERS_BY_CODE(context, intermediaryCode) {
    return axios_api_sbs_apiweb.get(`/api/v1/modyo/adminUsers/intermediary/${intermediaryCode}`)
      .then((response) => {
        const intermediateList = [];
        if (response.data.getUserDTO && response.data.getUserDTO.length > 0) {
          // Construimos el objeto para retornarlo a la lista de intermediarios
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < response.data.getUserDTO.length; index++) {
            intermediateList.push({
              $isDisabled: false,
              agentDocumentNumber: response.data.getUserDTO[index].documentNumber,
              agentDocumentType: null,
              agentType: response.data.getUserDTO[index].intermediaryCode,
              brokerData: `${response.data.getUserDTO[index].firstName} ${response.data.getUserDTO[index].lastName}`,
              code: response.data.getUserDTO[index].intermediaryCode,
              name: `${response.data.getUserDTO[index].firstName} ${response.data.getUserDTO[index].lastName}`,
              siseState: null,
            });
          }
        }
        return intermediateList;
      })
      .catch((error) => {
        throw error;
      });
  },
};
